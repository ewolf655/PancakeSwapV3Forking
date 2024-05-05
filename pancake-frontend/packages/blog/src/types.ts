export interface CategoriesType {
  id: number
  attributes: {
    name: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface ArticleImageType {
  id: number
  attributes: {
    url: string
    formats: {
      medium: {
        url: string
      }
      small: {
        url: string
      }
      thumbnail: {
        url: string
      }
    }
  }
}

export interface ResponseArticleDataType {
  id: number
  attributes: {
    title: string
    slug: string
    description: string
    createAt: string
    publishedAt: string
    content: string
    locale?: string
    categories: {
      data: CategoriesType[]
    }
    image: {
      data: ArticleImageType[]
    }
    newsOutBoundLink: string
    newsFromPlatform: string
    'games-categories': {
      data: CategoriesType[]
    }
  }
}

export interface PaginationType {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface ResponseArticleType {
  data: ResponseArticleDataType[]
  meta: {
    pagination: PaginationType
  }
}

export interface ResponseCategoriesType {
  id: number
  attributes: {
    name: string
    articles: {
      data: []
    }
  }
}

export interface Categories {
  id: number
  name: string
}

export interface ArticleDataType {
  id: number
  slug: string
  title: string
  locale: string
  imgUrl: string
  content: string
  createAt: string
  publishedAt: string
  description: string
  categories: Array<string>
  newsOutBoundLink: string
  newsFromPlatform: string
  gamesCategories: Array<string>
}

export interface ArticleType {
  data: ArticleDataType[]
  pagination: PaginationType
}

export interface AllArticleType {
  isFetching: boolean
  articlesData: ArticleType
}
