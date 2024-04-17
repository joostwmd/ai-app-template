export interface JobRecordTest {
  id: string
  uploaded: boolean
  finished: boolean
  coverImage: string | null
  createdAt: { nanoseconds: number; seconds: number }
}
