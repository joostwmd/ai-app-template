import React, { useEffect, useRef, useState } from "react"
import { View, Image, StyleProp, ViewStyle, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder"

interface ImageCardProps {
  width: number
  height: number
  borderRadius?: number
  imageLink?: string
  showPlaceholder?: boolean
  children?: React.ReactNode
  childrenStyle?: StyleProp<ViewStyle>
}

export const ImageCard: React.FC<ImageCardProps> = ({
  width,
  height,
  borderRadius = 12,
  imageLink,
  showPlaceholder = false,
  children,
  childrenStyle,
}) => {
  const [loading, setLoading] = useState(true)

  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!loading) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start()
    }
  }, [opacity, loading])

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

  if (showPlaceholder || !imageLink) {
    return (
      <View style={[{ width, height, borderRadius }]}>
        <LinearGradient
          colors={["#000", "#333"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width, height, borderRadius }}
        />
      </View>
    )
  }

  return (
    <View style={[{ width, height, borderRadius }]}>
      {loading && (
        <ShimmerPlaceholder
          width={width}
          height={height}
          style={{ borderRadius }}
        />
      )}
      {imageLink && (
        <Animated.View style={{ opacity }}>
          <Image
            source={{ uri: imageLink }}
            style={{
              width,
              height,
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius,
            }}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </Animated.View>
      )}

      {children && <View style={childrenStyle}>{children}</View>}
    </View>
  )
}
