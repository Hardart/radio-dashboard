import type { Article } from '@schema/article-schema'
import { PUBLISH_STATUSES } from '@/shared/enums/article-status'

export function setStatus(article: Article) {
  if (!article.isPublished) article.status = 'не опубликовано'
  else if (article.isPublished && new Date() > new Date(article.publishAt))
    article.status = 'опубликовано'
  else article.status = 'в ожидании'
  return article
}

export function getStatus(articleStatus: keyof typeof PUBLISH_STATUSES) {
  return PUBLISH_STATUSES[articleStatus]
}
