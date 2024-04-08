import { ref, listAll, getDownloadURL, FirebaseStorage } from "firebase/storage"

interface GetImageUrlProps {
  storage: FirebaseStorage
  userId: string
  jobId: string
  folder: "uploaded" | "generated"
}

export async function getImagesUrls({
  storage,
  userId,
  jobId,
  folder,
}: GetImageUrlProps) {
  const purchaseRef = ref(storage, `${userId}/${jobId}/${folder}`)
  try {
    const listResult = await listAll(purchaseRef)

    const urlPromises = listResult.items.map((item) => getDownloadURL(item))
    const urls = await Promise.all(urlPromises)

    return urls
  } catch (error) {
    console.error("Error getting image URLs:", error)
    throw error
  }
}
