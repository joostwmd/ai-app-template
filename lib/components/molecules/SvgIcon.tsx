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

  let width = 24
  let height = 24

  if (icon === "cross") {
    width = 58
    height = 96
  }

  return (
    <Canvas style={{ width, height }}>
      {svg && <ImageSVG svg={svg} width={width} height={height} />}
    </Canvas>
  )
}
