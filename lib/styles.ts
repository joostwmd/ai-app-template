import { StyleSheet } from "react-native"

export const BLACK = "#000"
export const WHITE = "#fff"
const GRAY = "#666666"

const baseHeading = {
  fontFamily: "Pricedown",
  color: WHITE,
}

const baseParagraph = {
  fontFamily: "Arial",
  color: GRAY,
}

const containerBase = {
  minHeight: "100%",
  paddingHorizontal: 20,
}

export const styleSheet = StyleSheet.create({
  headingLg: {
    ...baseHeading,
    fontSize: 28,
    fontWeight: "500",
  },
  headingMd: {
    ...baseHeading,
    fontSize: 24,
    fontWeight: "500",
  },
  headingSm: {
    ...baseHeading,
    fontSize: 18,
    fontWeight: "500",
  },
  paragraphLg: {
    ...baseParagraph,
    fontSize: 20,
  },
  paragraphMd: {
    ...baseParagraph,
    fontSize: 16,
  },
  paragraphSm: {
    ...baseParagraph,
    fontSize: 12,
  },

  screenContainer: {
    ...containerBase,
    backgroundColor: BLACK,
    alignItems: "center",
  },

  modalContainer: {
    ...containerBase,
    backgroundColor: BLACK,
    alignItems: "center",
  },
})
