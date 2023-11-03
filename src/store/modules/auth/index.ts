import { defineStore } from 'pinia'
import { getModel, getToken, removeToken, setModel, setToken } from './helper'
import { store } from '@/store'

export interface AuthState {
  token: string | undefined
  model: string
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    token: getToken(),
    model: getModel(),
  }),

  getters: {
  },

  actions: {
    setToken(token: string) {
      this.token = token
      setToken(token)
    },
    setModel(model: string) {
      this.model = model
      setModel(model)
    },

    removeToken() {
      this.token = undefined
      removeToken()
    },
  },
})

export function useAuthStoreWithout() {
  return useAuthStore(store)
}
