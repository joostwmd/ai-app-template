import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import FaceDetection, {
  FaceDetectorContourMode,
  FaceDetectorLandmarkMode,
  FaceContourType,
  FaceLandmarkType,
} from "react-native-face-detection"
import { View, Text, Button, StyleSheet } from "react-native"
import { useRouter } from "expo-router"

const Page: React.FC = () => {
  const pickImage = async () => {
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
      const newUsableImages: { path: string; id: string }[] = []

      for (let asset of result.assets) {
        const test = await processFaces(asset.uri)
        console.log("face recognition test", test)

        // Get file size
        const fileInfo = await FileSystem.getInfoAsync(asset.uri)
        console.log("File size:", fileInfo)
        console.log("File size:", fileInfo.size)
      }
    }

    return
  }

  async function processFaces(imagePath: string) {
    try {
      console.log("Processing faces in image: ", imagePath)
      const options = {
        landmarkMode: FaceDetectorLandmarkMode.ALL,
        contourMode: FaceDetectorContourMode.ALL,
      }

      const faces = await FaceDetection.processImage(imagePath, options)

      faces.forEach((face) => {
        console.log("Head rotation on X axis: ", face.headEulerAngleX)
        console.log("Head rotation on Y axis: ", face.headEulerAngleY)
        console.log("Head rotation on Z axis: ", face.headEulerAngleZ)

        console.log("Left eye open probability: ", face.leftEyeOpenProbability)
        console.log(
          "Right eye open probability: ",
          face.rightEyeOpenProbability
        )
        console.log("Smiling probability: ", face.smilingProbability)

        face.faceContours.forEach((contour) => {
          if (contour.type === FaceContourType.FACE) {
            console.log("Face outline points: ", contour.points)
          }
        })

        face.landmarks.forEach((landmark) => {
          if (landmark.type === FaceLandmarkType.LEFT_EYE) {
            console.log("Left eye outline points: ", landmark.points)
          } else if (landmark.type === FaceLandmarkType.RIGHT_EYE) {
            console.log("Right eye outline points: ", landmark.points)
          }
        })
      })
    } catch (error) {
      console.error("Error processing faces in image: ", error)
    }
  }

  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>

        <Button title="Test" onPress={() => pickImage()} />
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
})
