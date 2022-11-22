const config: {
  base_url: {
    base: string
    dev: string
    pro: string
    test: string
  }
  result_code: number | string
  default_headers: AxiosHeaders
  request_timeout: number
} = {
  /**
   * api请求基础路径
   */
  base_url: {
    // 开发环境接口前缀
    base: 'http://localhost:4500/v1',
    // 打包开发环境接口前缀
    dev: 'http://localhost:4500/v1',
    // 打包生产环境接口前缀
    pro: 'https://api.devibe.cn/v1',
    // 打包测试环境接口前缀
    test: 'http://localhost:4500/v1'
  },

  /**
   * 接口成功返回状态码
   */
  result_code: 0,

  /**
   * 接口请求超时时间
   */
  request_timeout: 60000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}

export { config }
