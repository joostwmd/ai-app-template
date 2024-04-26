import React from "react"
import { Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { BottomGradient } from "lib/components/molecules/BottomGradient"
import { styleSheet } from "lib/styles"

const StartButton: React.FC = () => {
  const router = useRouter()

  return (
    <BottomGradient>
      <TouchableOpacity
        onPress={() => router.replace("/jobs/")}
        style={{
          position: "absolute",
          bottom: 44,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={[styleSheet.headingLg, { fontSize: 28, color: "white" }]}>
          press to play
        </Text>
      </TouchableOpacity>
    </BottomGradient>
  )
}

export default StartButton
