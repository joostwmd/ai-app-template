export interface JobRecordTest {
  id: string
  uploaded: boolean
  finished: boolean
  uploadedImageLocalURL: string | null
  generatedImagLocalURL: string | null
  createdAt: { nanoseconds: number; seconds: number }
}
