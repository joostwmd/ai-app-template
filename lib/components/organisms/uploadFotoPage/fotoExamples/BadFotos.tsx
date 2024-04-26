import { ImageCard } from "lib/components/molecules/ImageCard"
import { CustomScrollView } from "lib/components/molecules/ScrollView"
import { SvgIcon } from "lib/components/molecules/SvgIcon"
import { styleSheet } from "lib/styles"
import { View, Text } from "react-native"

export const BadFotosExample = () => {
  return (
    <>
      <View style={{ width: "100%", marginTop: 32 }}>
        <Text style={[styleSheet.headingSm, { marginBottom: 8 }]}>
          Bad Images
        </Text>
        <Text style={styleSheet.paragraphMd}>
          group images, sunglasses, hats, blurry, or low-quality images,
          complicated backgrounds
        </Text>
      </View>

      <View style={{ height: 164, marginVertical: 12 }}>
        <CustomScrollView scrollDirection="left" autoScrollToEnd={true}>
          {[1, 2, 3, 4, 5].map((example: number, index: number) => {
            return (
              <View
                style={{
                  marginLeft: 20,
                  justifyContent: "center",
                }}
                key={index}
              >
                <ImageCard
                  width={112}
                  height={164}
                  imageLink={`https://picsum.photos/200/300?random=${index}`}
                  childrenStyle={{
                    position: "absolute",
                    bottom: 4,
                    right: 4,
                  }}
                >
                  <SvgIcon icon="closeCircle" />
                </ImageCard>
              </View>
            )
          })}
        </CustomScrollView>
      </View>
    </>
  )
}
