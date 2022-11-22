import request from '@/config/axios'

// 获取所有文章
export const getArticles = (): Promise<IResponse> => {
  return request.get({ url: '/articles' })
}

export const getArticleById = (id: string): Promise<IResponse> => {
  return request.get({ url: '/articles/' + id })
}

// 模拟获取全部文章标签
export const getTags = async (): Promise<IResponse<CRMArticle>> => {
  return request.get({ url: '/tags' })
}

// 更新文章
export const updateArticleById = (id: string, data: CRMArticle): Promise<IResponse> => {
  return request.patch({ url: '/articles/' + id, data })
}
