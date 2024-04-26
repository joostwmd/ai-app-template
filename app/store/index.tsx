import { useRevenuecat } from "@utils/revenuecat/RevenuecatContext"
import { IDENTIFIER_10_TOKENS } from "@utils/revenuecat/constants"
import { BeforeAndAfterSlider } from "lib/components/molecules/BeforeAndAfterSlider"
import { BottomGradient } from "lib/components/molecules/BottomGradient"
import { CustomButton } from "lib/components/molecules/Button"
import { Header } from "lib/components/molecules/Header"
import { BLACK, styleSheet } from "lib/styles"
import React from "react"
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native"
import { PurchasesOffering } from "react-native-purchases"

const Page: React.FC = () => {
  const { width, height } = Dimensions.get("window")

  const { purchase, offerings } = useRevenuecat()
  const [selectedOffering, setSelectedOffering] =
    React.useState<PurchasesOffering | null>(null)

  function handlePurchase() {
    if (!selectedOffering) return
    purchase(selectedOffering)
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: BLACK,
      }}
    >
      <Header text={"store"} />

      <BeforeAndAfterSlider
        width={width}
        height={height / 3}
        before={<Before />}
        after={<After />}
      />

      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 48,
        }}
      >
        {offerings &&
          Object.values(offerings.all).map((offering: PurchasesOffering) => (
            <TouchableOpacity
              key={offering.identifier}
              style={{
                width: "100%",
                height: 80,
                marginTop: 24,
                flexDirection: "row",
                alignItems: "center",
                transform: [{ skewX: "-10deg" }],
                borderColor: "white",
                borderWidth: 1,
                backgroundColor:
                  selectedOffering === offering ? "white" : "transparent",
              }}
              onPress={() => setSelectedOffering(offering)}
            >
              <View
                style={{
                  padding: 12,
                  width: "100%",
                  transform: [{ skewX: "10deg" }],
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ paddingLeft: 8, marginVertical: 8 }}>
                  <Text
                    style={[
                      styleSheet.headingLg,
                      {
                        color:
                          selectedOffering === offering ? "black" : "white",
                      },
                    ]}
                  >
                    {offering.lifetime?.product.identifier ===
                    "videogame_10_tokens"
                      ? "PRO"
                      : "STANDARD"}
                  </Text>
                  <Text
                    style={{
                      color: selectedOffering === offering ? "black" : "white",
                    }}
                  >
                    {offering.lifetime?.product.identifier ===
                    IDENTIFIER_10_TOKENS
                      ? `10 images, ${(
                          Math.round(
                            (offering.lifetime.product.price / 10) * 100
                          ) / 100
                        ).toFixed(2)} per image`
                      : `60 images, ${(
                          Math.round(
                            (offering.lifetime.product.price / 60) * 100
                          ) / 100
                        ).toFixed(2)} per image`}
                  </Text>
                </View>

                <Text
                  style={[
                    styleSheet.headingLg,
                    {
                      color: selectedOffering === offering ? "black" : "white",
                    },
                  ]}
                >
                  {offering.lifetime?.product.priceString}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>

      <BottomGradient>
        <CustomButton
          disabled={!selectedOffering}
          text="purchase"
          handleOnPress={handlePurchase}
        />
      </BottomGradient>
    </View>
  )
}

export default Page

const Before: React.FC = () => {
  const { width, height } = Dimensions.get("window")
  return (
    <Image
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/milanlaser-fcb24.appspot.com/o/omaha_bw.jpg?alt=media&token=9864378d-74d9-4579-830d-a56e50dc017d",
      }}
      style={{ width, height: height / 3 }}
      resizeMode="cover"
    />
  )
}

const After: React.FC = () => {
  const { width, height } = Dimensions.get("window")
  return (
    <Image
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/milanlaser-fcb24.appspot.com/o/omaha_color.jpg?alt=media&token=7b3c5be6-ee90-40ec-9f1c-4b52ce655322",
      }}
      style={{ width, height: height / 3 }}
      resizeMode="cover"
    />
  )
}
