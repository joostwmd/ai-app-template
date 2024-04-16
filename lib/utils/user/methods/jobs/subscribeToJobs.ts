import { UserRecord } from "@utils/user/types"
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"
import { getImagesUrls } from "../images/getImages"
import { FirebaseStorage } from "firebase/storage"
import { getData, getJobIds } from "@utils/helpers/AsyncStorage"

export const subscribeToJobsCollection = (
  db: Firestore,
  storage: FirebaseStorage,
  userId: string,
  setUser: Dispatch<SetStateAction<UserRecord>>
) => {
  const userDoc = doc(db, "users", userId)
  const jobsCollection = collection(userDoc, "jobs")
  const jobsQuery = query(jobsCollection, orderBy("createdAt", "desc"))

  const unsubscribe = onSnapshot(jobsQuery, async (jobsSnapshot) => {
    if (!jobsSnapshot.empty) {
      const changes = jobsSnapshot.docChanges()
      for (let change of changes) {
        if ((await getData(change.doc.data().id)) === null) {
          if (change.type === "added") {
            const image = await getImagesUrls({
              storage: storage,
              userId: userId,
              jobId: change.doc.id,
              folder: "uploaded",
            })
            console.log("Image", image)

            console.log("New job", change.doc.id)
          } else if (change.type === "modified") {
            console.log("Modified job", change.doc.id)

            if (change.doc.data().finished) {
              console.log("Job is finished", change.doc.id)

              const image = await getImagesUrls({
                storage: storage,
                userId: userId,
                jobId: change.doc.id,
                folder: "generated",
              })
              console.log("Image", image)
            }
          } else if (change.type === "removed") {
            console.log("Removed job", change.doc.id)
          }
        }
      }
    }
  })

  return unsubscribe
}
