import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"

const StartButton: React.FC = () => {
  const router = useRouter()

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "red",
        zIndex: 10,
      }}
    >
      <LinearGradient
        colors={["transparent", "#000"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 240,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/new-job/")}
          style={{
            position: "absolute",
            bottom: 44,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 28, color: "white" }}>press to play</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}

export default StartButton
