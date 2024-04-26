import { download } from "@utils/helpers/download"
import { CustomButton } from "lib/components/molecules/Button"
import { View } from "react-native"

interface DownloadButtonProps {
  url: string
  jobId: string
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  url,
  jobId,
}) => {
  return (
    <View style={{ width: "42%" }}>
      <CustomButton
        text="Save"
        handleOnPress={() => download({ jobId, url })}
      />
    </View>
  )
}
