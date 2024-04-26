import { BlurView } from "expo-blur"
import { useRouter } from "expo-router"
import { CustomButton } from "lib/components/molecules/Button"
import { BLACK, WHITE, styleSheet } from "lib/styles"
import React from "react"
import { View, Text } from "react-native"

const Page: React.FC = () => {
  const router = useRouter()

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: BLACK }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "55%",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 88,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={[styleSheet.headingLg]}>welcome!</Text>
            <Text
              style={[
                styleSheet.paragraphSm,
                { color: WHITE, textAlign: "center", marginTop: 12 },
              ]}
            >
              we are very proud of our AI filter and are convinced that it
              generates the coolest images on the market. but see for yourself:
              we gift every new user 2 images for free
            </Text>
          </View>

          <Text
            style={[styleSheet.headingLg, { color: "green", fontSize: 88 }]}
          >
            +2$
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            alignItems: "center",
            position: "absolute",
            bottom: 40,
          }}
        >
          <CustomButton
            text={"aswesome! let's go"}
            handleOnPress={() => router.dismiss()}
          />
        </View>
      </View>
    </View>
  )
}

export default Page
