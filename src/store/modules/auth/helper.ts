import { ss } from '@/utils/storage'

const LOCAL_NAME = 'SECRET_TOKEN'

const LOCAL_MODEL = 'GPT_MODEL'

export function getToken() {
  return ss.get(LOCAL_NAME)
}

export function getModel() {
  return ss.get(LOCAL_MODEL) ?? 'GPT-3.5'
}

export function setToken(token: string) {
  return ss.set(LOCAL_NAME, token)
}

export function setModel(token: string) {
  return ss.set(LOCAL_MODEL, token)
}

export function removeToken() {
  return ss.remove(LOCAL_NAME)
}
