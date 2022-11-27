import request from '@/config/axios'

// Articles APIs =====================================================

// 获取所有文章
export const getArticles = (): Promise<IResponse<CMSArticle[]>> => {
  return request.get({ url: '/articles' })
}

// 通过ID获取文章
export const getArticleById = (id: string): Promise<IResponse<CMSArticle>> => {
  return request.get({ url: '/articles/' + id })
}

// 创建一篇新文章
export const createArticle = (data: CMSArticle): Promise<IResponse> => {
  return request.post({ url: '/articles/', data })
}

// 通过ID更新文章
export const updateArticleById = (id: string, data: CMSArticle): Promise<IResponse> => {
  return request.patch({ url: '/articles/' + id, data })
}

// Tags APIs =========================================================

// 模拟获取全部文章标签
export const getTags = async (): Promise<IResponse<CMSTag>> => {
  return request.get({ url: '/tags' })
}

export const getTagsList = async (): Promise<IResponse<CMSTag[]>> => {
  return request.get({ url: '/tags/list' })
}

// 通过ID获取文章标签
export const getTagById = (id: string): Promise<IResponse<CMSTag>> => {
  return request.get({ url: '/tags/' + id })
}

// 创建一个新文章标签
export const createTag = (data: CMSTag): Promise<IResponse<CMSTag>> => {
  return request.post({ url: '/tags/', data })
}

// 通过ID更新文章标签
export const updateTagById = (id: string | undefined, data: CMSTag): Promise<IResponse> => {
  return request.patch({ url: '/tags/' + id, data })
}
