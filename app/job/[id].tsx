import React, { useState, useEffect, useRef } from "react"
import { View, Dimensions, Animated, Text } from "react-native"
import { useFirebase } from "@utils/firebase/FirebaseContext"
import { useUser } from "@utils/user/UserContext"

import { useLocalSearchParams } from "expo-router"
import { ImageCard } from "lib/components/molecules/ImageCard"

const Page: React.FC = () => {
  const local = useLocalSearchParams()
  const id: string = local.id as unknown as string
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
  const [loading, setLoading] = useState<boolean>(true)
  const [generatedImage, setGeneratedImage] = useState<string>()
  const { storage } = useFirebase()
  const { user } = useUser()

  // useEffect(() => {
  //   async function getImages() {
  //     const images = await getGeneratedImagesUrls({
  //       storage: storage,
  //       userId: user.id,
  //       purchaseId: id,
  //     })
  //     console.log(images)
  //     setGeneratedImage(images[0])
  //     setLoading(false)
  //   }

  //   getImages()
  // }, [])

  const opacity = useRef(new Animated.Value(0.5)).current

  useEffect(() => {
    if (!loading) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start()
    }
  }, [opacity, loading])

  //   if (!generatedImage) {
  //     return <View style={{ flex: 1, backgroundColor: "#000" }}></View>
  //   }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 20,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 24, marginTop: 48 }}>{id}</Text>
      <Text style={{ color: "white", fontSize: 24, marginTop: 48 }}>test</Text>
      {/* <Animated.View
        style={{
          opacity,
          marginTop: 48,
        }}
      >
        <ImageCard
          width={screenWidth - 20}
          height={screenWidth * 1.5}
          imageLink={generatedImage}
        />
      </Animated.View> */}

      {/* <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            bottom: 40,
          }}
        >
          <View style={{ width: "45%" }}>
            <CustomButton
              handleOnPress={() => downloadFileWithoutResumable(generatedImage)}
              text="download"
            />
          </View>
  
          <View style={{ width: "45%" }}>
            <CustomButton
              handleOnPress={() => shareToInstagramStory(generatedImage)}
              text="share"
            />
          </View>
        </View> */}
    </View>
  )
}

export default Page
