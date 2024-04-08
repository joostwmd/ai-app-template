import React, { useRef, useEffect, useState } from "react"
import { ScrollView, ScrollViewProps, Dimensions } from "react-native"

type ScrollDirection = "left" | "right"

interface CustomScrollViewProps extends ScrollViewProps {
  children: React.ReactNode[]
  scrollDirection: ScrollDirection
  autoScrollToEnd: boolean
}

export const CustomScrollView: React.FC<CustomScrollViewProps> = ({
  children,
  scrollDirection,
  autoScrollToEnd,
  ...scrollViewProps
}) => {
  const scrollViewRef = useRef<ScrollView>(null)
  const [contentWidth, setContentWidth] = useState(0)

  const { width } = Dimensions.get("window")

  return (
    <ScrollView
      style={{ width: width }}
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onContentSizeChange={(contentWidth) => setContentWidth(contentWidth)}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  )
}
