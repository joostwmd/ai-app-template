import * as FileSystem from "expo-file-system"

interface Params {
  jobId: string
  isFinished: boolean
}

export function generateLocalImagePath({ jobId, isFinished }: Params): string {
  const folder = isFinished ? "generated" : "uploaded"
  const localImagePath = `${FileSystem.documentDirectory}${jobId}/${folder}`
  return localImagePath
}
