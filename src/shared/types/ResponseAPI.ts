import type { Article } from '@/shared/schemes/article-schema'
import type { Category } from '@/shared/schemes/category-schema'
import type { User } from '@/shared/schemes/user-schema'
import type { Slide } from '@/shared/schemes/slide-schema'

export interface CustomFetchOptions {
  url: string
  method?: 'POST' | 'GET'
  body?: object
  query?: object
}

export interface TokensResponse {
  accessToken: string
  refreshToken: string
}

export type CustomResponse<T> =
  | {
      status: 'success'
      data: T
    }
  | {
      status: 'fail' | 'error'
      message: string
      errors: object[]
    }

export declare namespace ResponseApi {
  type TokenCheck = { userId: string }
  type LoginData = { accessToken: string; user: User }
  type RegistrationData = { user: User }
  type ArticleList = { articles: Article[]; tags: string[] }
  type ArticleSingle = {
    article: Article
    tags: string[]
    categories: Category[]
  }
  type CategoryList = { categories: Category[] }
  type CategorySingle = { category: Category }
  type FileList = { files: string[] }
  type FileSingle = { path: string }
  // type ProgramList = { programs: Program[]; hosts: User[] }
  // type ProgramSngle = { program: Program }
  type UserList = { users: User[] }
  // type TrackList = { tracks: Track[] }
  type SlideList = { slides: Slide[] }
}
