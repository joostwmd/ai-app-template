import { View, Text, TouchableOpacity } from "react-native"
import { BLACK, WHITE, styleSheet } from "../../../lib/styles"
import { useRouter } from "expo-router"
import { useUser } from "@utils/user/UserContext"

export const Header: React.FC<{ text: string }> = ({ text }) => {
  const router = useRouter()
  const { user } = useUser()

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: BLACK,
      }}
    >
      <Text style={[styleSheet.headingLg]}>{text}</Text>
      <TouchableOpacity onPress={() => router.push("/store/")}>
        <Text
          style={{
            color: "green",
            fontFamily: "Pricedown",
            fontSize: 48,
            textShadowColor: "white",
          }}
        >
          ${user.tokens}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
