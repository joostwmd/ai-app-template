import { UserRecord } from "@utils/user/types"
import { Firestore, collection, doc, onSnapshot } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"

interface JobRecord {
  id: string
  finished: boolean
}

export const subscribeToJobsCollection = (
  db: Firestore,
  userId: string,
  setUser: Dispatch<SetStateAction<UserRecord>>
) => {
  const userDoc = doc(db, "users", userId)
  const jobsCollection = collection(userDoc, "jobs")

  const unsubscribe = onSnapshot(jobsCollection, async (jobsSnapshot) => {
    const changes = jobsSnapshot.docChanges()
    changes.forEach((change) => {
      console.log(`Job ${change.type}:`, change.doc.id, change.doc.data())
    })

    if (!jobsSnapshot.empty) {
      const jobs: JobRecord[] = []
      for (let job of jobsSnapshot.docs) {
        const data = job.data()
        jobs.push({
          id: job.id,
          finished: data.finished,
        })
      }
      setUser((user) => ({
        ...user,
        jobs: jobs,
      }))
    }
  })

  return unsubscribe
}
