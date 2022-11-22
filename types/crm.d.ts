interface SystemUser {
  readonly _id?: string
  username: string
  nickname: string
  name: string
  first_name: string
  last_name: string
  avatar: string
}

interface CRMTag {
  readonly _id?: string
  slug?: string
  name?: string
  icon?: string
  cover?: string
  visible?: boolean
}

interface CRMArticle {
  readonly _id?: string
  slug?: string
  cover?: string
  title?: string
  subtitle?: string
  editor_type?: string
  content?: string
  excerpt?: string
  tags?: CRMTag[]
  roles?: any[]
  published_at?: Date | string
  author?: SystemUser
  updator?: SystemUser
  creator?: SystemUser
}
