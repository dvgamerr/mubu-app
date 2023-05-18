import { request } from 'gaxios'
import settings from 'electron-settings'
import dayjs from 'dayjs'
const validateStatus = () => true
const endpointAnypoint = 'https://anypoint.mulesoft.com'

export interface OAuthData {
  access_token: string
  expires_in: number
  token_type: string
}

export const oAuth2 = async ():Promise<OAuthData> => {
  const anypoint = await settings.get('mubu-token.anypoint')
  const { data, statusText }:{data: OAuthData, statusText:string } = await request({
    validateStatus,
    method: 'POST',
    url: `${endpointAnypoint}/accounts/api/v2/oauth2/token`,
    headers: { 'Content-Type': 'application/json' },
    data: anypoint
  })
  data.expires_in = +new Date()+(data.expires_in as number * 1000)
  if (statusText === 'OK') await settings.set('mubu-token.anypoint.auth', data as any)
  return data
}
export const getOAuth2 = async (): Promise<string> => {
  let auth: OAuthData = await settings.get('mubu-token.anypoint.auth') as any
  if (dayjs().diff(dayjs(auth.expires_in), 'seconds') <= 0) {
    return `${auth.token_type} ${auth.access_token}`
  }
  auth = await oAuth2()
  return `${auth.token_type} ${auth.access_token}`
}

export const getAccountMe = async (): Promise<object> => {
  const { data, statusText } = await request({
    validateStatus,
    method: 'GET',
    url: `${endpointAnypoint}/accounts/api/me`,
    headers: { 'Content-Type': 'application/json', 'Authorization': await getOAuth2() },
  })

  return (statusText === 'OK')  ? data as object : null
}

  // /accounts/api/me
