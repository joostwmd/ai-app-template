import React from "react"
import { BeforeAndAfterSlider } from "lib/components/molecules/BeforeAndAfterSlider"
import { View, Image, Dimensions } from "react-native"

const BeforeAndAfter = () => {
  const { width, height } = Dimensions.get("window")

  return (
    <View style={{ flex: 1 }}>
      <BeforeAndAfterSlider
        before={
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/milanlaser-fcb24.appspot.com/o/omaha_bw.jpg?alt=media&token=9864378d-74d9-4579-830d-a56e50dc017d",
            }}
            style={{ width, height }}
          />
        }
        after={
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/milanlaser-fcb24.appspot.com/o/omaha_color.jpg?alt=media&token=7b3c5be6-ee90-40ec-9f1c-4b52ce655322",
            }}
            style={{ width, height }}
          />
        }
        width={width}
        height={height}
      />
    </View>
  )
}

export default BeforeAndAfter
