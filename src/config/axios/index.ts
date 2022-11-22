import { service } from './service'
import { config } from './config'
const { default_headers } = config
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const request = (option: any) => {
  const { url, method, params, data, headersType, responseType } = option
  return service({
    url: url,
    method,
    params,
    data,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || default_headers,
      Authorization: `Bearer ${appStore.getAuthToken}` //  如果JWT存在则携带JWT令牌
    }
  })
}
export default {
  get: <T = any>(option: any) => {
    return request({ method: 'GET', ...option }) as unknown as T
  },
  post: <T = any>(option: any) => {
    return request({ method: 'POST', ...option }) as unknown as T
  },
  put: <T = any>(option: any) => {
    return request({ method: 'PUT', ...option }) as unknown as T
  },
  patch: <T = any>(option: any) => {
    return request({ method: 'PATCH', ...option }) as unknown as T
  },
  delete: <T = any>(option: any) => {
    return request({ method: 'DELETE', ...option }) as unknown as T
  }
}
