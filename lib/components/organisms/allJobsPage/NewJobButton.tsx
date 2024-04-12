import { useRouter } from "expo-router"
import { BottomGradient } from "lib/components/molecules/BottomGradient"
import { CustomButton } from "lib/components/molecules/Button"

export function NewJobButton() {
  const router = useRouter()

  function handleClick() {
    router.push("/new-job/")
  }

  return (
    <BottomGradient>
      <CustomButton text="New Job" handleOnPress={handleClick} />
    </BottomGradient>
  )
}
