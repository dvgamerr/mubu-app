import { initilizeApp } from '../../user-config'
import settings from 'electron-settings'
import log from 'electron-log/renderer'

import { reqOAuth } from './anypoint'
import { getCurrentUser } from './gocd'

export interface AnypointToken {
  grant_type: String
  client_id: String
  client_secret: String
}

export interface GoCDToken {
  domain: String
  token: String
}

export default {
  'INIT-CONFIG': initilizeApp,
  'APP-OPEN-MENU': () => {
    log.log('backend')
  },
  'MUBU-TOKEN-GET': () => settings.getSync('mubu-token') as any,
  'MUBU-TOKEN-VERIFY': async (e: Electron.IpcMainInvokeEvent, data: any) => {
    const checkError = { anypoint: false, gocd: false }
    const { anypoint, gocd } = JSON.parse(data)

    await settings.set('mubu-token', {
      gocd,
      anypoint: {
        grant_type: 'client_credentials',
        client_id: anypoint.clientId,
        client_secret: anypoint.clientSecret
      }
    })

    const oauth = await reqOAuth()
    log.verbose({ 'anypoint-oauth': oauth })
    if (oauth.statusText !== 'OK') {
      await settings.unset('mubu-token')
      checkError.anypoint = true
    }

    if (gocd.token) {
      const user = await getCurrentUser()
      log.verbose({ 'gocd-user': user })

      if (user.statusText !== 'OK') {
        await settings.unset('mubu-token.gocd.domain')
        await settings.unset('mubu-token.gocd.token')
        checkError.gocd = true
      }
    }

    return checkError
  },
  'CHECK-GOCD_HEATH': async (e: Electron.IpcMainInvokeEvent, gocdDomain: string) => {
    try {
      const res = await fetch(`https://${(new URL(gocdDomain)).hostname}/go/api/v1/health`, {
        headers: { 'Content-Type': 'application/vnd.go.cd.v1+json; charset=utf-8' }
      })
      return res.status === 200
    } catch (ex) {
      return false
    }
  },
  'MUBU-DOWNLOAD-ALL': async () => {
    const oauth = await reqOAuth()
    // access_token: '9582b0d5-a2b7-45bb-adb7-32b2d488a39f',
    // expires_in: 2703,
    // token_type: 'bearer'

  }
}
