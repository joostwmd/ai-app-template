import * as FileSystem from "expo-file-system"

interface Params {
  imageUrl: string
  localPath: string
}

export async function downloadToFileSystem({ imageUrl, localPath }: Params) {
  try {
    const { uri } = await FileSystem.downloadAsync(imageUrl, localPath)
    console.log("Finished downloading to ", uri)
    return uri
  } catch (e) {
    console.error(e)
    return null
  }
}
