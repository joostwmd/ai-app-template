import { shareInInstagramStory } from "@utils/helpers/shareOnInstagram"
import { CustomButton } from "lib/components/molecules/Button"
import { Share, View } from "react-native"

type ShareButtonProps = {
  url: string
}

export const ShareButton: React.FC<ShareButtonProps> = ({ url }) => {
  return (
    <View style={{ width: "33%" }}>
      <CustomButton
        text="Share"
        handleOnPress={() => shareInInstagramStory(url)}
      />
    </View>
  )
}
