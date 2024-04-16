import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native"
import { BlurView } from "expo-blur"
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated"
import { useRouter } from "expo-router"
import { useEffect, useMemo, useRef, useState } from "react"
import { ImageCard } from "lib/components/molecules/ImageCard"
import { JobRecord } from "@utils/user/types"
import { useUser } from "@utils/user/UserContext"
import { JobRecordTest } from "./types"

interface JobCardProps {
  job: JobRecordTest
}

export function JobCard({ job }: JobCardProps) {
  const { getJobsImageByFolder } = useUser()
  const { width } = Dimensions.get("window")
  const paddingHorizontal: number = 10
  const innerWidth: number = width - paddingHorizontal * 2
  const router = useRouter()
  function gotoWalk(id: string) {
    console.log("gotoWalk")
    router.push(`/job/${id}`)
  }

  const animation = useSharedValue(1)
  const prevFinishedRef = useRef(job.finished)
  const [imageLink, setImageLink] = useState<string | undefined>(undefined)

  useEffect(() => {
    let imageLink: string | null = null

    if (job.finished) {
      console.log("job finished", job, job.generatedImagLocalURL)
      imageLink = job.generatedImagLocalURL
    } else if (!job.finished && job.uploaded) {
      imageLink = job.uploadedImageLocalURL
      console.log("job unfinished", job, job.generatedImagLocalURL)
    } else {
      console.log("job wtf", job)
    }

    setImageLink(imageLink)
  }, [])

  useEffect(() => {
    const animate = async () => {
      if (prevFinishedRef.current !== job.finished) {
        animation.value = withTiming(0, { duration: 420 }, () => {
          animation.value = withTiming(1, { duration: 420 })
        })
      }

      prevFinishedRef.current = job.finished
    }
    animate()
  }, [job.finished])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animation.value }],
    }
  })

  return (
    <Animated.View style={[{ margin: 10 }, animatedStyle]} key={job.id}>
      {job.finished ? (
        <TouchableOpacity onPress={() => gotoWalk(job.id)}>
          {/* <ImageCard
            imageLink={imageLink}
            width={innerWidth / 2 - paddingHorizontal}
            height={(innerWidth / 2 - paddingHorizontal) * 1.75}
          ></ImageCard> */}
          {/* 
          <Image
            source={{ uri: imageLink }}
            style={{
              width,
              height: innerWidth / 2 - paddingHorizontal * 1.75,
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: 12,
            }}
          /> */}

          {/* <View
            style={{
              width: innerWidth / 2 - paddingHorizontal,
              height: (innerWidth / 2 - paddingHorizontal) * 1.75,
              borderRadius: 12,
              backgroundColor: "green",
            }}
          /> */}

          <Image
            source={{
              uri: "file:///var/mobile/Containers/Data/Application/A7D942BE-79AE-4C73-923A-EA204B7D9A2C/Documents/mLM0loXxA61hGhx2p2dH/uploaded",
            }}
            style={{
              width: innerWidth / 2 - paddingHorizontal,
              height: (innerWidth / 2 - paddingHorizontal) * 1.75,
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: 12,
            }}
            onError={(e) => {
              console.log("error image load", e.nativeEvent.error)
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          {/* <ImageCard
            imageLink={imageLink}
            width={innerWidth / 2 - paddingHorizontal}
            height={(innerWidth / 2 - paddingHorizontal) * 1.75}
            childrenStyle={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <BlurView
              style={[
                {
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                  overflow: "hidden",
                },
              ]}
              intensity={8}
            />
            <View
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator color={"white"} />
            </View>
          </ImageCard> */}

          <View
            style={{
              width: innerWidth / 2 - paddingHorizontal,
              height: (innerWidth / 2 - paddingHorizontal) * 1.75,
              borderRadius: 12,
              backgroundColor: "red",
            }}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  )
}
