import { faceDetection } from "@utils/uploadFoto/faceDetection"
import { pickImages } from "@utils/uploadFoto/pickImage"
import { processFaceDetectionResult } from "@utils/uploadFoto/processFaceDetectionResult"
import { useUser } from "@utils/user/UserContext"
import { UploadFotosPage } from "lib/components/pages/UploadFotosPage"
import { useState } from "react"

const Page: React.FC = () => {
  const { createNewJobs } = useUser()

  const [usableImages, setUsableImages] = useState<string[]>([])
  async function handlePickImage() {
    const pickedImages = await pickImages()

    if (pickedImages) {
      for (const image of pickedImages) {
        console.log(image)
        const faceDetectionResult = await faceDetection(image.uri)
        const { usable } = processFaceDetectionResult(faceDetectionResult)
        if (usable) {
          setUsableImages((prev) => [...prev, image.uri])
        }
      }
    }
  }

  async function handleRemoveImage(index: number) {
    setUsableImages((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleGenerateImages() {
    console.log("generate")
    if (usableImages.length > 0) {
      console.log("creating new jobs")
      await createNewJobs(usableImages)
    }
  }

  return (
    <UploadFotosPage
      usableImages={usableImages}
      pickImage={handlePickImage}
      removeImage={handleRemoveImage}
      generateImages={handleGenerateImages}
    />
  )
}

export default Page
