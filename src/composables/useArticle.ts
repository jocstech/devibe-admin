export const useArticle = () => {
  const router = useRouter()

  const onCreate = () => {
    router.push('/cms/articles/create')
  }
  const onEdit = (id: Nullable<string>) => {
    if (id)
      router.push(`/cms/articles/${id}`)
  }
  const onUnpublish = (id: Nullable<string>) => {
    console.log(id)
  }
  const onDelete = (id: Nullable<string>) => {
    console.log(id)
  }
  return {
    onCreate,
    onEdit,
    onUnpublish,
    onDelete,
  }
}
