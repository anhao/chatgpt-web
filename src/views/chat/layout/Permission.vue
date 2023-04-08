<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NButton, NInput, NModal, useMessage } from 'naive-ui'
import { useAuthStore } from '@/store'
import Icon403 from '@/icons/403.vue'

interface Props {
  visible: boolean
}

defineProps<Props>()

const authStore = useAuthStore()

const ms = useMessage()

const loading = ref(false)
const token = ref('')

const disabled = computed(() => !token.value.trim() || loading.value)

async function handleVerify() {
  const secretKey = token.value.trim()

  if (!secretKey)
    return

  try {
    loading.value = true
    authStore.setToken(secretKey)
    ms.success('success')
    window.location.reload()
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
    authStore.removeToken()
    token.value = ''
  }
  finally {
    loading.value = false
  }
}

function handlePress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleVerify()
  }
}
</script>

<template>
  <NModal :show="visible" style="width: 90%; max-width: 640px">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="space-y-4">
        <header class="space-y-2">
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            请先设置 token 再使用
          </h2>
          <div class="text-base text-center text-slate-500 dark:text-slate-500">
            <div>未绑定 token ，请在 ALAPI 注册登录后获取 token</div>
            <div>注册登录地址: <a href=" https://admin.alapi.cn" target="_blank"> https://admin.alapi.cn</a></div>
          </div>
          <Icon403 class="w-[200px] m-auto" />
        </header>
        <NInput v-model:value="token" type="text" placeholder="请输入 ALAPI 的 token" @keypress="handlePress" />
        <div>
          <div>token 申请地址: <a href="https://admin.alapi.cn" target="_blank" style="color: red">https://admin.alapi.cn</a></div><div>申请教程：<a style="color: red" href="https://alone88.cn/archives/970.html" target="_blank">https://alone88.cn/archives/970.html</a></div>
        </div>
        <NButton
          block
          type="primary"
          :disabled="disabled"
          :loading="loading"
          @click="handleVerify"
        >
          {{ $t('common.verify') }}
        </NButton>
      </div>
    </div>
  </NModal>
</template>
