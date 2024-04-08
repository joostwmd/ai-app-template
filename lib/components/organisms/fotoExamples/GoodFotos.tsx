import { CustomScrollView } from "lib/components/molecules/ScrollView"
import { ImageCard } from "lib/components/molecules/ImageCard"
import { SvgIcon } from "lib/components/molecules/SvgIcon"
import { styleSheet } from "lib/styles"
import { View, Text } from "react-native"

export const GoodFotosExample = () => {
  return (
    <>
      <View style={{ width: "100%" }}>
        <Text style={[styleSheet.headingSm, { marginBottom: 8 }]}>
          Good Photos
        </Text>
        <Text style={styleSheet.paragraphMd}>
          we need close-ups of selfies of a single person from different angles.
          for the best results, also ensure good image quality and lighting
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
                  <SvgIcon icon="checkboxCircle" />
                </ImageCard>
              </View>
            )
          })}
        </CustomScrollView>
      </View>
    </>
  )
}
