import { Canvas, ImageSVG, useSVG } from "@shopify/react-native-skia"

const icons = {
  close: require("@assets/icons/close.svg"),
  arrowLeft: require("@assets/icons/arrow-left.svg"),
  checkboxCircle: require("@assets/icons/checkbox-circle.svg"),
  closeCircle: require("@assets/icons/close-circle.svg"),
  add: require("@assets/icons/add.svg"),
  cross: require("@assets/icons/cross.svg"),
}

type IconName = keyof typeof icons

interface SvgIconProps {
  icon: IconName
}

export const SvgIcon = ({ icon }: SvgIconProps) => {
  const svg = useSVG(icons[icon])

  return (
    <Canvas style={{ width: 24, height: 24 }}>
      {svg && <ImageSVG svg={svg} width={24} height={24} />}
    </Canvas>
  )
}
