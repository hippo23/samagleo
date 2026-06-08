export interface Post {
  slug?: string
  title: string
  summary: string
  thumbnail: string
  date: string
  content: string
}

export interface Reading {
  slug?: string
  title: string
  thumbnail: string
  status: boolean
  last_updated: string
}
