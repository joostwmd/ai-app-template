import React, { FC } from "react"
import { Button, ScrollView } from "react-native"
import { GoodFotosExample } from "../organisms/uploadFotoPage/fotoExamples/GoodFotos"
import { BadFotosExample } from "../organisms/uploadFotoPage/fotoExamples/BadFotos"
import { UploadFotos } from "../organisms/uploadFotoPage/UploadFotos"
import { styleSheet } from "lib/styles"

interface UploadFotosPageProps {
  usableImages: string[]
  pickImage: () => void
  removeImage: (index: number) => void
  generateImages: () => void
}

export const UploadFotosPage: FC<UploadFotosPageProps> = ({
  usableImages,
  pickImage,
  removeImage,
  generateImages,
}) => {
  return (
    <ScrollView contentContainerStyle={styleSheet.screenContainer}>
      <GoodFotosExample />
      <BadFotosExample />
      <UploadFotos
        usableImages={usableImages}
        pickImage={pickImage}
        removeImage={removeImage}
      />
      <Button onPress={generateImages} title="generate" />
    </ScrollView>
  )
}
