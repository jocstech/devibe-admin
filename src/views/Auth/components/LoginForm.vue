<script setup lang="ts">
// import { reactive, ref, unref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { Form } from '@/components/Form'
import { useI18n } from '@/hooks/web/useI18n'
import { useForm } from '@/hooks/web/useForm'
import { authLogin, getAdminRoleApi, getTestRoleApi } from '@/api/login'
import { useCache } from '@/hooks/web/useCache'
// import { useAppStore } from '@/store/modules/app'
// import { usePermissionStore } from '@/store/modules/permission'
import type { LoginParams, UserType } from '~/api/auth/types'
import { useValidator } from '@/hooks/web/useValidator'
import type { FormSchema } from '@/types/form'
import { useAuthStore } from '~/store/modules/auth'
import { usePermissionStore } from '~/store/modules/permission'
import { useAppStore } from '~/store/modules/app'

const emit = defineEmits(['toRegister'])
const { required } = useValidator()
const appStore = useAppStore()
const authStore = useAuthStore()
const permissionStore = usePermissionStore()
const { currentRoute, addRoute, push } = useRouter()
// const { wsCache } = useCache()
const { t } = useI18n()

const rules = {
  username: [required()],
  password: [required()],
}

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'username',
    label: t('login.username'),
    value: 'admin',
    component: 'Input',
    colProps: {
      span: 24,
    },
    componentProps: {
      placeholder: t('login.usernamePlaceholder'),
    },
  },
  {
    field: 'password',
    label: t('login.password'),
    value: '135246999',
    component: 'InputPassword',
    colProps: {
      span: 24,
    },
    componentProps: {
      style: {
        width: '100%',
      },
      placeholder: t('login.passwordPlaceholder'),
    },
  },
  {
    field: 'tool',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'login',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'other',
    component: 'Divider',
    label: t('login.otherLogin'),
    componentProps: {
      contentPosition: 'center',
    },
  },
  {
    field: 'otherIcon',
    colProps: {
      span: 24,
    },
  },
])

const iconSize = 30
const remember = ref(false)
const { register, elFormRef, methods } = useForm()
const loading = ref(false)
const iconColor = '#999'
const redirect = ref<string>('')

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true,
  },
)

// ??????
const signIn = async () => {
  const formRef = unref(elFormRef)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const { getFormData } = methods
      const formData = await getFormData<LoginParams>()

      try {
        const {
          data: { token },
        } = await authLogin(formData)
        ElMessage.success('????????????????????????????????????')
        if (token) {
          // 1)??????token?????????????????? 2)???????????????????????????
          authStore.onLoginSuccess(token)
          // ????????????????????????
          if (appStore.getDynamicRouter) {
            getRole()
          }

          else {
            await permissionStore.generateRoutes('none').catch(() => {})
            permissionStore.getAddRouters.forEach((route) => {
              addRoute(route as RouteRecordRaw) // ??????????????????????????????
            })
            permissionStore.setIsAddRouters(true)
            push({
              path: redirect.value || permissionStore.addRouters[0].path,
            })
          }
        }
      }
      finally {
        loading.value = false
      }
    }
  })
}

// ??????????????????
const getRole = async () => {
  const { getFormData } = methods
  const formData = await getFormData<UserType>()
  const params = {
    roleName: formData.username,
  }
  // admin - ????????????????????????
  // test - ????????????????????????
  const res
      = formData.username === 'admin' ? await getAdminRoleApi(params) : await getTestRoleApi(params)
  if (res) {
    const { wsCache } = useCache()
    const routers = res.data || []
    wsCache.set('roleRouters', routers)

    formData.username === 'admin'
      ? await permissionStore.generateRoutes('admin', routers).catch(() => {})
      : await permissionStore.generateRoutes('test', routers).catch(() => {})

    permissionStore.getAddRouters.forEach((route) => {
      addRoute(route as RouteRecordRaw) // ??????????????????????????????
    })
    permissionStore.setIsAddRouters(true)
    push({ path: redirect.value || permissionStore.addRouters[0].path })
  }
}

// ???????????????
const toRegister = () => {
  emit('toRegister')
}

const sendWIPMessage = () => {
  ElMessage.info('??????????????????????????????')
}
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="register"
  >
    <template #title>
      <h2 class="text-2xl font-bold text-center w-[100%]">
        {{ t('login.login') }}
      </h2>
    </template>

    <template #tool>
      <div class="flex justify-between items-center w-[100%]">
        <ElCheckbox v-model="remember" :label="t('login.remember')" size="small" />
        <ElLink type="primary" :underline="false">
          {{ t('login.forgetPassword') }}
        </ElLink>
      </div>
    </template>

    <template #login>
      <div class="w-[100%]">
        <ElButton :loading="loading" type="primary" class="w-[100%]" @click="signIn">
          {{ t('login.login') }}
        </ElButton>
      </div>
      <div class="w-[100%] mt-15px">
        <ElButton class="w-[100%]" @click="toRegister">
          {{ t('login.register') }}
        </ElButton>
      </div>
    </template>

    <template #otherIcon>
      <div class="flex justify-between w-[100%]">
        <Icon
          icon="ant-design:github-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
          @click="sendWIPMessage"
        />
        <Icon
          icon="ant-design:wechat-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
          @click="sendWIPMessage"
        />
        <Icon
          icon="ant-design:alipay-circle-filled"
          :size="iconSize"
          :color="iconColor"
          lass="cursor-pointer anticon"
          @click="sendWIPMessage"
        />
        <Icon
          icon="ant-design:weibo-circle-filled"
          :size="iconSize"
          :color="iconColor"
          class="cursor-pointer anticon"
          @click="sendWIPMessage"
        />
      </div>
    </template>
  </Form>
</template>

<style lang="less" scoped>
  :deep(.anticon) {
    &:hover {
      color: var(--el-color-primary) !important;
    }
  }
</style>
