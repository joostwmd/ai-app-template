import { faceDetection } from "@utils/uploadFoto/faceDetection"
import { pickImages } from "@utils/uploadFoto/pickImage"
import { processFaceDetectionResult } from "@utils/uploadFoto/processFaceDetectionResult"
import { useUser } from "@utils/user/UserContext"
import { BottomGradient } from "lib/components/molecules/BottomGradient"
import { CustomButton } from "lib/components/molecules/Button"
import { Header } from "lib/components/molecules/Header"
import { GenerateButton } from "lib/components/organisms/uploadFotoPage/GenerateButton"
import { UploadFotos } from "lib/components/organisms/uploadFotoPage/UploadFotos"
import { BadFotosExample } from "lib/components/organisms/uploadFotoPage/fotoExamples/BadFotos"
import { GoodFotosExample } from "lib/components/organisms/uploadFotoPage/fotoExamples/GoodFotos"
import { styleSheet } from "lib/styles"
import { useState } from "react"
import { ScrollView } from "react-native"

const Page: React.FC = () => {
  const { createNewJobs, user } = useUser()

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
    if (usableImages.length > 0 && user.tokens! - usableImages.length >= 0) {
      console.log("creating new jobs")
      await createNewJobs(usableImages)
    }
  }

  return (
    <>
      <Header text="Upload Images" />
      <ScrollView contentContainerStyle={styleSheet.screenContainer}>
        <GoodFotosExample />
        <BadFotosExample />
        <UploadFotos
          usableImages={usableImages}
          pickImage={handlePickImage}
          removeImage={handleRemoveImage}
        />
      </ScrollView>

      <BottomGradient>
        <CustomButton
          disabled={usableImages.length === 0}
          text="generate"
          handleOnPress={handleGenerateImages}
        />
      </BottomGradient>
    </>
  )
}

export default Page
