import { CustomButton } from "lib/components/molecules/Button"

export const ShareButton: React.FC = () => {
  return (
    <CustomButton text="Share" handleOnPress={() => console.log("Sahre")} />
  )
}
