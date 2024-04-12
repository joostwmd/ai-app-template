import { CustomButton } from "lib/components/molecules/Button"

export const DownloadButton: React.FC = () => {
  return (
    <CustomButton
      text="Download"
      handleOnPress={() => console.log("download")}
    />
  )
}
