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
  const { width } = Dimensions.get("window")
  const flatChildren = React.Children.toArray(children).flat().filter(Boolean)

  return (
    <ScrollView
      style={{ width: width }}
      ref={scrollViewRef}
      contentContainerStyle={{
        width: flatChildren.length === 1 ? "100%" : undefined,
        justifyContent: "center",
        alignItems: "center",
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  )
}
