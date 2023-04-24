import { request } from 'gaxios'
import settings from 'electron-settings'
const validateStatus = () => true
const endpointAnypoint = 'https://anypoint.mulesoft.com'

export const reqOAuth = async () => {
  const auth = await settings.get('mubu-token.anypoint.auth')
  if (auth) {

    return { data: auth, statusText: 'OK' }
  }

  const anypoint = await settings.get('mubu-token.anypoint')
  const { data, statusText } = await request({
    validateStatus,
    method: 'POST',
    url: `${endpointAnypoint}/accounts/api/v2/oauth2/token`,
    headers: { 'Content-Type': 'application/json' },
    data: anypoint
  })
  if (statusText === 'OK') await settings.set('mubu-token.anypoint.auth', data as any)
  return { data, statusText }
}
