import { useUser } from "@utils/user/UserContext"
import { ImageCard } from "lib/components/molecules/ImageCard"
import { JobCard } from "lib/components/organisms/allJobsPage/JobCard"
import { NewJobButton } from "lib/components/organisms/allJobsPage/NewJobButton"
import { ScrollView, View, Text } from "react-native"

const Page: React.FC = () => {
  const { user } = useUser()

  const BLACK = "#000"

  if (!user.jobs) {
    return (
      <>
        <Text style={{ color: "white" }}>Loading...</Text>
      </>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {user.jobs!.length > 0 ? (
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
          {user.jobs!.map((job) => {
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
                <ImageCard
                  width={innerWidth / 2 - 10}
                  height={(innerWidth / 2 - 10) * 1.75}
                  showPlaceholder={true}
                >
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
