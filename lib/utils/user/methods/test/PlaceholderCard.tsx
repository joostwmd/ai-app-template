import { Dimensions, View } from "react-native"
import { ImageCard } from "lib/components/molecules/ImageCard"

export function PlaceholderCard() {
  const { width } = Dimensions.get("window")
  const paddingHorizontal: number = 10
  const innerWidth: number = width - paddingHorizontal * 2

  return (
    <View style={{ margin: 10 }}>
      <ImageCard
        width={innerWidth / 2 - paddingHorizontal}
        height={(innerWidth / 2 - paddingHorizontal) * 1.75}
        showPlaceholder={true}
      />
    </View>
  )
}
