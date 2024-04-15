import { FirebaseStorage, ref, uploadBytes } from "firebase/storage"
import uuid from "react-native-uuid"

interface UploadImageProps {
  userId: string
  storage: FirebaseStorage
  jobId: string
  image: string
}

export async function uploadImage({
  userId,
  storage,
  jobId,
  image,
}: UploadImageProps) {
  const id = uuid.v4()
  const reference = ref(storage, `${userId}/${jobId}/uploaded/${id}`)

  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"))
    }
    xhr.responseType = "blob"
    xhr.open("GET", image, true)
    xhr.send(null)
  })

  uploadBytes(reference, blob).then(() => {
    console.log("Uploaded", image)
  })
}
