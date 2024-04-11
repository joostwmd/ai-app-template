import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { BeforeAndAfterSlider } from "lib/components/molecules/BeforeAndAfterSlider"
import BeforeAndAfter from "lib/components/organisms/entryPage/BeforeAndAfter"
import StartButton from "lib/components/organisms/entryPage/StartButton"
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
      <BeforeAndAfter />
      <StartButton />
    </View>
  )
}

export default Page
