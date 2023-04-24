import { request } from 'gaxios'
import settings from 'electron-settings'
const validateStatus = () => true

export const getCurrentUser = async () => {
  const gocd: any = await settings.get('mubu-token.gocd')

  const { data, statusText } = await request({
    validateStatus,
    url: `${new URL(gocd.domain).origin}/go/api/current_user`,
    headers: {
      'Accept': 'application/vnd.go.cd.v1+json',
      'Authorization': `bearer ${gocd.token}`
    }
  })
  return { data, statusText }
}
