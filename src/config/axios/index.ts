import { service } from './service'
import { config } from './config'
import { useAuthStore } from '@/store/modules/auth'
const { default_headers } = config

const authStore = useAuthStore()

const request = (option: any) => {
  const { url, method, params, data, headersType, responseType } = option
  return service({
    url,
    method,
    params,
    data,
    responseType,
    headers: {
      'Content-Type': headersType || default_headers,
      'Authorization': `Bearer ${authStore.getAuthToken}`, //  如果JWT存在则携带JWT令牌
    },
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
  },
}
