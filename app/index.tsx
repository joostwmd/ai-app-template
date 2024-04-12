import BeforeAndAfter from "lib/components/organisms/entryPage/BeforeAndAfter"
import StartButton from "lib/components/organisms/entryPage/StartButton"
import { View } from "react-native"

const Page: React.FC = () => {
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
