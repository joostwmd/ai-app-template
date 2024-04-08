export interface UserContextValue {
  user: UserRecord
  userContextLoaded: boolean
  createNewJobs: (props: { userId: string; images: string[] }) => Promise<void>
  getJobsUploadedImage: (jobId: string) => GetJobsUploadedImage
  getJobImages: (jobId: string) => GetJobImages
}

export interface JobRecord {
  id: string
  finished: boolean
}

export interface UserRecord {
  id: string | null
  tokens: number | null
  jobs: JobRecord[] | null
}

export type GetJobImages = Promise<{ uploaded: string; generated: string }>

export type GetJobsUploadedImage = Promise<{ uploaded: string }>
