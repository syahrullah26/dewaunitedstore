import type { Article, PaginatedResponse } from '~/types/article'

export const useArticleApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiUrl || 'https://backend-dewaunited-production.up.railway.app/api/v2'

  const getPublishedArticles = async (params?: {
    search?: string
    page?: number
    per_page?: number
  }): Promise<PaginatedResponse<Article>> => {
    const response = await $fetch<PaginatedResponse<Article>>(`${baseURL}/articles/published`, {
      params
    })
    return response
  }

  const getPublishedArticle = async (slug: string): Promise<Article> => {
    const response = await $fetch<Article>(`${baseURL}/articles/published/${slug}`)
    return response
  }

  return {
    getPublishedArticles,
    getPublishedArticle
  }
}