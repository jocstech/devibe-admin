import { defineStore } from 'pinia'
import jwt_decode from 'jwt-decode'
import { store } from '../index'
import { APP } from '@/config'
import type { User } from '~/api/auth/types'
import { useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

interface AppState {
  authToken: Nullable<string>
  authUser: Nullable<User>
}

export const useAuthStore = defineStore('auth', {
  state: (): AppState => {
    return {
      authToken: wsCache.get(APP.AUTH_JWT_KEY) || null,
      authUser: wsCache.get(APP.USER_CACHE_KEY) || null,
    }
  },
  getters: {
    getAuthToken(): Nullable<string> {
      return this.authToken
    },
    getAuthUser(): Nullable<User> {
      return this.authUser
    },
  },
  actions: {
    setAuthToken(token: string) {
      if (!token)
        return
      wsCache.set(APP.AUTH_JWT_KEY, token)
      this.authToken = token
    },
    setAuthUser(user: User) {
      if (!user)
        return
      wsCache.set(APP.USER_CACHE_KEY, user)
      this.authUser = user
    },
    setAuthUserByJWT(token: string) {
      if (!token)
        return
      this.authUser = jwt_decode(token)
      wsCache.set(APP.USER_CACHE_KEY, this.authUser)
    },
    onLoginSuccess(token: string) {
      if (!token)
        return false
      this.setAuthToken(token)
      this.setAuthUserByJWT(token)
      return true
    },
    onLogoutSuccess() {
      wsCache.delete(APP.AUTH_JWT_KEY)
      wsCache.delete(APP.USER_CACHE_KEY)
      this.authToken = this.authUser = null
      return true
    },
  },
})

export const useAuthStoreWithOut = () => {
  return useAuthStore(store)
}
