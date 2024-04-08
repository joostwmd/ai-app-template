import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { SvgIcon } from "../molecules/SvgIcon"

type UploadFotoCardsProps = {
  width: number
  height: number
  pickImage: () => void
}

export const UploadFotoCard: React.FC<UploadFotoCardsProps> = ({
  width,
  height,
  pickImage,
}) => {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <TouchableOpacity
        style={[styles.container, { width, height }]}
        onPress={pickImage}
      >
        <View style={styles.outline}>
          <SvgIcon icon="add" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 12,
  },

  outline: {
    justifyContent: "center",
    alignItems: "center",
  },
})
