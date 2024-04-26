import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"

export const download = async ({
  url,
  jobId,
}: {
  url: string
  jobId: string
}) => {
  const localPath = `${FileSystem.documentDirectory}${jobId}.jpeg`
  console.log("localPath", localPath)
  try {
    const dir = localPath.substring(0, localPath.lastIndexOf("/"))

    const dirInfo = await FileSystem.getInfoAsync(dir)
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true })
    }

    const { uri } = await FileSystem.downloadAsync(url, localPath)
    MediaLibrary.saveToLibraryAsync(uri)
  } catch (e) {
    console.error(e)
  }
}
