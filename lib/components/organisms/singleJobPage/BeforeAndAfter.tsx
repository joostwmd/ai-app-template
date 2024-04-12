import { BeforeAndAfterSlider } from "lib/components/molecules/BeforeAndAfterSlider"
import { CustomButton } from "lib/components/molecules/Button"
import { ImageCard } from "lib/components/molecules/ImageCard"
import { Dimensions } from "react-native"

interface BeforeAndAfterProps {
  images: {
    uploaded: string
    generated: string
  }
}

export const BeforeAndAfter: React.FC<BeforeAndAfterProps> = ({ images }) => {
  const { width, height } = Dimensions.get("window")
  return (
    <BeforeAndAfterSlider
      width={width}
      height={height}
      before={
        <ImageCard
          width={width}
          height={height}
          imageLink={images.uploaded}
          borderRadius={0}
        />
      }
      after={
        <ImageCard
          width={width}
          height={height}
          imageLink={images.generated}
          borderRadius={0}
        />
      }
    />
  )
}
