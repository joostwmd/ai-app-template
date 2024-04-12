import { BottomGradient } from "lib/components/molecules/BottomGradient"
import { CustomButton } from "lib/components/molecules/Button"

interface GenerateButtonProps {
  onPress: () => void
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onPress }) => {
  return (
    <BottomGradient>
      <CustomButton text="generate" handleOnPress={onPress} />
    </BottomGradient>
  )
}
