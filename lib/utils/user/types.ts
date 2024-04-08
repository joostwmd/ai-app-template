export interface UserContextValue {
  user: UserRecord
  userContextLoaded: boolean
  createNewJobs: (images: string[]) => Promise<void>
  getJobsImageByFolder: (props: {
    jobId: string
    folder: "generated" | "uploaded"
  }) => GetJobsImageByFolder
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

export type GetJobsImageByFolder = Promise<{ path: string }>
