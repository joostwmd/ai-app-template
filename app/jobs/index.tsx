import { NewJobButton } from "lib/components/organisms/allJobsPage/NewJobButton"
import { useState } from "react"
import { ScrollView, View, Text } from "react-native"
import { useFocusEffect } from "expo-router"
import { useCallback } from "react"
import { JobRecordTest } from "@utils/user/types"
import { getJobs } from "@utils/helpers/AsyncStorage"
import { JobCard } from "lib/components/organisms/allJobsPage/JobCard"
import { PlaceholderCard } from "lib/components/organisms/allJobsPage/PlaceholderCrds"
import { Header } from "lib/components/molecules/Header"
import { styleSheet } from "lib/styles"

const Page: React.FC = () => {
  const BLACK = "#000"
  const [jobs, setJobs] = useState<JobRecordTest[]>([])

  async function getJobsAndUpdateState() {
    const jobs = await getJobs()
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
      <Header text="Your Images" />
      {jobs.length > 0 ? (
        <ScrollView
          contentContainerStyle={[
            {
              backgroundColor: BLACK,
              alignItems: "center",

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
            return <PlaceholderCard key={i} />
          })}
          <View style={{ position: "absolute", alignItems: "center" }}>
            <Text style={[styleSheet.headingMd]}>nothing to see here</Text>
            <Text style={[styleSheet.paragraphMd]}>
              upload your first image annd dive into 2000s videogames
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
