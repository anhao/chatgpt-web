import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { useAuthStore } from '@/store'

export function fetchChatAPIProcess<T = any>(
  params: {
    message: any[]
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  const authStore = useAuthStore()

  const data: Record<string, any> = {
    message: params.message,
    token: authStore.token,
  }

  return post<T>({
    url: 'https://v2.alapi.cn/api/chatgpt/stream',
    data,
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}
