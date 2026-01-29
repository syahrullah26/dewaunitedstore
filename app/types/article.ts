export interface Article {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  banner_image: string | null
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string[] | null
  view_count: number
  created_at: string
  updated_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  prev_page_url: string | null
  next_page_url: string | null
}