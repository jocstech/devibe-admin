import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'
import axios from 'axios'
import qs from 'qs'
import { ElLoading, ElMessage } from 'element-plus'
import { config } from './config'
// import { useAppStore } from '@/store/modules/app'
// import { useCache } from '@/hooks/web/useCache'
// import { APP } from '..'

// const { wsCache } = useCache()
const { result_code, base_url } = config
// const appStore = useAppStore()
let loading

export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]

// 创建axios实例
const service: AxiosInstance = axios.create({
  // 默认地址
  baseURL: PATH_URL,
  // 设置超时时间
  timeout: config.request_timeout,
  // 跨域时候允许携带凭证(有点问题，暂时屏蔽)
  // withCredentials: true
})

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求提示动画
    loading = ElLoading.service({
      lock: true,
      text: '服务器请求中',
      background: 'rgba(0, 0, 0, 0.5)',
    })

    if (
      config.method === 'post'
      && (config.headers as AxiosRequestHeaders)['Content-Type']
        === 'application/x-www-form-urlencoded'
    )
      config.data = qs.stringify(config.data)

    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== undefined && config.params[key] !== null)
          url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  },
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (loading)
      loading.close() // 关闭加载动画
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response
    }
    else if (response.data.code === result_code) {
      // 如果请求成功了，返回结果
      return response.data
    }
    else {
      console.log(response)
      // 如果请求失败了，弹出错误消息
      ElMessage.error(response.data.message ?? '发生了未知的错误')
    }
  },
  (error: AxiosError) => {
    if (loading)
      loading.close() // 关闭加载动画
    ElMessage.error(error.message ?? '发生了未知的错误')
    return Promise.reject(error)
  },
)

export { service }
