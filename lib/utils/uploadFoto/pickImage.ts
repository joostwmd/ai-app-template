import * as ImagePicker from "expo-image-picker"

export async function pickImages(): Promise<
  ImagePicker.ImagePickerAsset[] | undefined
> {
  if (!ImagePicker.getMediaLibraryPermissionsAsync) {
    console.log(
      "No permissions request is necessary for launching the image library"
    )
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: true,
  })

  if (!result.canceled) {
    return result.assets
  }
}
