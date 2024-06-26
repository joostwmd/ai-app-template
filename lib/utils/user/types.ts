export interface UserContextValue {
  user: UserRecord
  userContextLoaded: boolean
  createNewJobs: (images: string[]) => Promise<void>
  getJobsImageByFolder: (props: {
    jobId: string
    folder: "generated" | "uploaded"
  }) => GetJobsImageByFolder
  getJobImages: (jobId: string) => GetJobImages
  getJobs: () => Promise<JobRecord[]>
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

export type GetJobsImageByFolder = Promise<{ path: string }>

export interface JobRecordTest {
  id: string
  uploaded: boolean
  finished: boolean
  coverImage: string | null
  createdAt: { nanoseconds: number; seconds: number }
}
