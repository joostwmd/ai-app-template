import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { BeforeAndAfterSlider } from "lib/components/molecules/BeforeAndAfterSlider"
import {
  Button,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native"

const Page: React.FC = () => {
  const router = useRouter()
  const { width, height } = Dimensions.get("window")

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <View style={{ flex: 1 }}>
        <BeforeAndAfterSlider
          before={
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/milanlaser-fcb24.appspot.com/o/omaha_bw.jpg?alt=media&token=9864378d-74d9-4579-830d-a56e50dc017d",
              }}
              style={{ width, height }}
            />
          }
          after={
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/milanlaser-fcb24.appspot.com/o/omaha_color.jpg?alt=media&token=7b3c5be6-ee90-40ec-9f1c-4b52ce655322",
              }}
              style={{ width, height }}
            />
          }
          width={width}
          height={height}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "red",
            zIndex: 10,
          }}
        >
          <LinearGradient
            colors={["transparent", "#000"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 240,
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/new-job/")}
              style={{
                position: "absolute",
                bottom: 44,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 28, color: "white" }}>
                press to play
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  )
}

export default Page
