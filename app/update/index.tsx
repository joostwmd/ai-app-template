import { BLACK, GRAY, WHITE, styleSheet } from "lib/styles"
import { View, Text } from "react-native"

const Page: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BLACK,
        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 20,
      }}
    >
      <Text
        style={[
          styleSheet.headingLg,
          { color: WHITE, fontSize: 48, marginBottom: 88 },
        ]}
      >
        a new mission
      </Text>

      <Text
        style={[styleSheet.paragraphMd, { color: GRAY, textAlign: "center" }]}
      >
        you are not up to date with the latest version of the app. please update
        the app and get access to brand new features.
      </Text>
    </View>
  )
}

export default Page
