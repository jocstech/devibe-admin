import type { LoginParams, LoginResponse } from './types'
import request from '@/config/axios'

export const authLogin = (data: LoginParams): Promise<IResponse<LoginResponse>> => {
  return request.post({ url: '/auth/login', data })
}

export const authLogout = (): Promise<IResponse> => {
  return request.get({ url: '/auth/logout' })
}
