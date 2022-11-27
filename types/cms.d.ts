interface SystemBasic {
  readonly _id?: string
  creator?: SystemUser | string
  updater?: SystemUser | string
  created_at?: Date | string
  updated_at?: Date | string
  deleted_at?: Date | string
}

interface SystemRole extends SystemBasic {
  name?: string
  value?: string
  description?: string
  icon?: string
  subset?: string[] | SystemRole[]
}

interface SystemUser extends SystemBasic {
  username: string
  nickname: string
  name: string
  first_name: string
  last_name: string
  avatar: string
}

interface CMSTag extends SystemBasic {
  slug?: string
  name?: string
  icon?: string
  cover?: string
  category?: string
  description?: string
  visible?: boolean
  count?: number
  roles?: string[] | SystemRole[]
}

interface CMSArticle extends SystemBasic {
  slug?: string
  cover?: string
  title?: string
  subtitle?: string
  editor_type?: string
  content?: string
  excerpt?: string
  tags?: CMSTag[]
  roles?: any[]
  published_at?: Date | string
  author?: SystemUser | string
}
