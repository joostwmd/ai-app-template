import React from "react"
import { Text, TouchableOpacity } from "react-native"
import { BLACK, WHITE, styleSheet } from "../../styles"

type ButtonProps = {
  text: string
  handleOnPress: () => void
  disabled?: boolean
}

export const CustomButton: React.FC<ButtonProps> = ({
  text,
  handleOnPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={{
        width: "100%",
        backgroundColor: disabled ? "red" : WHITE,
        alignItems: "center",
        paddingVertical: 24,
        borderRadius: 4,
      }}
      disabled={disabled}
    >
      <Text style={[styleSheet.headingSm, { color: disabled ? WHITE : BLACK }]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}
