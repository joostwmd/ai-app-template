import React from "react"
import { View, ScrollView } from "react-native"
import Compare, {
  Before,
  After,
  Dragger,
  //@ts-ignore
} from "react-native-before-after-slider-v2"
import { Canvas, ImageSVG } from "@shopify/react-native-skia"
import { SvgIcon } from "./SvgIcon"

type BeforeAndAfterSliderProps = {
  before: React.ReactNode
  after: React.ReactNode
  width: number
  height: number
}

export const BeforeAndAfterSlider: React.FC<BeforeAndAfterSliderProps> = ({
  before,
  after,
  width,
  height,
}) => {
  return (
    <View style={{ width, height }}>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Compare
          initial={width / 2}
          draggerWidth={50}
          width={width}
          height={height}
        >
          <Before>{before}</Before>
          <After>{after}</After>
          <Dragger>
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 24,
                bottom: 0,
                left: 24,
                backgroundColor: "#fff",
                opacity: 0.6,
                zIndex: 10,
                height,
              }}
            ></View>

            <View
              style={{
                position: "absolute",
                top: height / 2,
                left: -4,
              }}
            >
              <SvgIcon icon="cross" />
            </View>
          </Dragger>
        </Compare>
      </ScrollView>
    </View>
  )
}
