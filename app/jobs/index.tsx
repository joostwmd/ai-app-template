import { useUser } from "@utils/user/UserContext"
import { getJobs } from "@utils/user/methods/test/AsyncStorage"
import { JobRecordTest } from "@utils/user/methods/test/types"
import { JobRecord } from "@utils/user/types"
import { ImageCard } from "lib/components/molecules/ImageCard"

import { NewJobButton } from "lib/components/organisms/allJobsPage/NewJobButton"
import { useEffect, useState } from "react"
import { ScrollView, View, Text, Dimensions } from "react-native"
import { useFocusEffect } from "expo-router"
import { useCallback } from "react"
import { JobCard } from "@utils/user/methods/test/JobCard"

const Page: React.FC = () => {
  const BLACK = "#000"
  const [jobs, setJobs] = useState<JobRecordTest[]>([])

  async function getJobsAndUpdateState() {
    const jobs = await getJobs()
    console.log("jobs", jobs)
    setJobs(jobs)
  }

  useFocusEffect(
    useCallback(() => {
      getJobsAndUpdateState()
      const intervalId = setInterval(getJobsAndUpdateState, 5000)
      return () => {
        clearInterval(intervalId)
      }
    }, [])
  )

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {jobs.length > 0 ? (
        <ScrollView
          contentContainerStyle={[
            {
              backgroundColor: BLACK,
              alignItems: "center",
              marginTop: 48,
              paddingBottom: 196,
            },
            { flexDirection: "row", flexWrap: "wrap" },
          ]}
        >
          {jobs.map((job) => {
            return <JobCard key={job.id} job={job} />
          })}
        </ScrollView>
      ) : (
        <View
          style={[
            {
              backgroundColor: BLACK,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 48,
              paddingBottom: 196,
              flexDirection: "row",
              flexWrap: "wrap",
              position: "relative",
            },
          ]}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => {
            return (
              <View style={{ margin: 10 }} key={i}>
                <ImageCard width={200} height={300} showPlaceholder={true}>
                  <></>
                </ImageCard>
              </View>
            )
          })}
          <View style={{ position: "absolute", alignItems: "center" }}>
            <Text style={{ fontSize: 28, color: "white" }}>no walks</Text>
            <Text style={{ fontSize: 48, color: "white" }}>
              we haven't seen you on the catwalk yet
            </Text>
          </View>
          <NewJobButton />
        </View>
      )}

      <NewJobButton />
    </View>
  )
}

export default Page
