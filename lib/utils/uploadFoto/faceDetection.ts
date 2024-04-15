import FaceDetection, {
  FaceDetectorContourMode,
  FaceDetectorLandmarkMode,
  FaceContourType,
  FaceLandmarkType,
  FaceResult,
} from "react-native-face-detection"

export async function faceDetection(imagePath: string): Promise<FaceResult[]> {
  try {
    const options = {
      landmarkMode: FaceDetectorLandmarkMode.ALL,
      contourMode: FaceDetectorContourMode.ALL,
    }

    const faces = await FaceDetection.processImage(imagePath, options)
    return faces
  } catch (error) {
    console.error("Error processing faces in image: ", error)
    throw new Error("Error processing faces in image")
  }
}
