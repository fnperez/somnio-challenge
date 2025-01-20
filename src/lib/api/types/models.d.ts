interface BaseEntity {
  id: string
}

export interface IPost extends BaseEntity {
  userId: string
  title: string
  body: string
}
