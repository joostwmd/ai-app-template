import * as FileSystem from "expo-file-system"

interface Params {
  imageUrl: string
  localPath: string
}

export async function downloadToFileSystem({ imageUrl, localPath }: Params) {
  try {
    // Ensure the directory exists
    const dir = localPath.substring(0, localPath.lastIndexOf("/"))
    const dirInfo = await FileSystem.getInfoAsync(dir)
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true })
    }

    const { uri } = await FileSystem.downloadAsync(imageUrl, localPath)
    console.log("Finished downloading to ", uri)
    return uri
  } catch (e) {
    console.error(e)
    return null
  }
}
