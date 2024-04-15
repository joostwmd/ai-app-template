import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { View } from "react-native"

interface BottomGradientProps {
  children: React.ReactNode
}

export const BottomGradient: React.FC<BottomGradientProps> = ({ children }) => {
  return (
    <LinearGradient
      colors={["transparent", "#000"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 180,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          alignItems: "center",
          position: "absolute",
          bottom: 44,
        }}
      >
        {children}
      </View>
    </LinearGradient>
  )
}
