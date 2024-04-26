import Share, { ShareSingleOptions, Social } from "react-native-share"
import Marker, { Position } from "react-native-image-marker"

export async function shareInInstagramStory(url: string) {
  try {
    const markedImage = await Marker.markImage({
      backgroundImage: {
        src: url,
        scale: 1,
      },
      watermarkImages: [
        {
          src: require("@assets/adaptive-icon.png"),
          position: {
            position: Position.topLeft,
          },
        },
      ],
    })

    const shareOptions: ShareSingleOptions = {
      //backgroundImage: url,
      backgroundImage: markedImage,
      //backgroundBottomColor: "#fefefe",
      //backgroundTopColor: "#906df4",
      social: Social.InstagramStories,
      appId: "1103337564187008", // required since  Jan 2023 (see: https://developers.facebook.com/docs/instagram/sharing-to-stories/#sharing-to-stories)
    }
    Share.shareSingle(shareOptions)
  } catch (error) {
    console.log("Error =>", error)
  }
}
