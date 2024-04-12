import React, { useState, useEffect, useRef } from "react"
import { View, Dimensions, Animated, Text } from "react-native"
import { useUser } from "@utils/user/UserContext"

import { useLocalSearchParams } from "expo-router"
import { ImageCard } from "lib/components/molecules/ImageCard"
import { BeforeAndAfterSlider } from "lib/components/molecules/BeforeAndAfterSlider"
import { BeforeAndAfter } from "lib/components/organisms/singleJobPage/BeforeAndAfter"
import { GenerateButton } from "lib/components/organisms/uploadFotoPage/GenerateButton"
import { BottomGradient } from "lib/components/molecules/BottomGradient"
import { DownloadButton } from "lib/components/organisms/singleJobPage/DowloadButton"
import { ShareButton } from "lib/components/organisms/singleJobPage/ShareButton"

const Page: React.FC = () => {
  const local = useLocalSearchParams()
  const id: string = local.id as unknown as string
  const [loading, setLoading] = useState<boolean>(true)
  const { getJobImages } = useUser()
  const [images, setImages] = useState<{
    uploaded: string
    generated: string
  } | null>(null)
  const { width, height } = Dimensions.get("window")

  useEffect(() => {
    async function getImages() {
      const images = await getJobImages(id)
      setImages(images)
      setLoading(false)
    }
    getImages()
  }, [])

  const opacity = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    if (!loading) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start()
    }
  }, [opacity, loading])

  if (!images) {
    return <View style={{ flex: 1, backgroundColor: "#000" }}></View>
  }

  return (
    <View
      style={{
        width: width,
        height: height,
        alignItems: "center",
      }}
    >
      <Animated.View
        style={{
          opacity,
          marginTop: 48,
        }}
      >
        <BeforeAndAfter images={images} />

        <BottomGradient>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 16,
            }}
          >
            <DownloadButton />
            <ShareButton />
          </View>
        </BottomGradient>
      </Animated.View>
    </View>
  )
}

export default Page
