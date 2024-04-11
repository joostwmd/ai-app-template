import React, { FC, useEffect } from "react"
import { View, Text, Dimensions, TouchableOpacity } from "react-native"
import { ImageCard } from "../../molecules/ImageCard"
import { styleSheet } from "lib/styles"
import { CustomScrollView } from "../../molecules/ScrollView"
import { UploadFotoCard } from "./UploadFotoCard"
import { SvgIcon } from "../../molecules/SvgIcon"
import Animated, { Easing, LinearTransition } from "react-native-reanimated"

interface UploadPhotosProps {
  usableImages: string[]
  pickImage: () => void
  removeImage: (index: number) => void
}

export const UploadFotos: FC<UploadPhotosProps> = ({
  usableImages,
  pickImage,
  removeImage,
}) => {
  const { width } = Dimensions.get("window")

  useEffect(() => {
    console.log("tesssstt", usableImages)
  }, [usableImages])

  return (
    <>
      <View style={{ width: "100%", marginTop: 12 }}>
        <Text style={[styleSheet.headingSm, { marginBottom: 8 }]}>
          Uploaded Photos
        </Text>
        <Text style={styleSheet.paragraphMd}>
          images that do not meet the requirements are automatically discarded
        </Text>
      </View>

      <View
        style={{
          flexDirection: "column",
          width: width,
          marginBottom: 172,
          marginTop: 32,
        }}
      >
        <CustomScrollView scrollDirection="left" autoScrollToEnd={true}>
          {usableImages.map((image, index) => {
            return (
              <Animated.View
                layout={LinearTransition.duration(500)}
                style={[
                  {
                    marginLeft: 20,
                    justifyContent: "center",
                  },
                ]}
                key={index}
              >
                <ImageCard
                  width={112 * 2}
                  height={164 * 2}
                  imageLink={`${image}`}
                  childrenStyle={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                  }}
                >
                  <TouchableOpacity onPress={() => removeImage(index)}>
                    <SvgIcon icon="closeCircle" />
                  </TouchableOpacity>
                </ImageCard>
              </Animated.View>
            )
          })}
          <Animated.View
            layout={LinearTransition.duration(500)}
            style={{ marginLeft: 20, justifyContent: "center" }}
          >
            <UploadFotoCard
              width={112 * 2}
              height={164 * 2}
              pickImage={pickImage}
            />
          </Animated.View>
        </CustomScrollView>
      </View>
    </>
  )
}
