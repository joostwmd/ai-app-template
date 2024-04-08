import { Firestore, collection, doc, onSnapshot } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"

interface JobRecord {
  id: string
  finished: boolean
}

export const subscribeToJobsCollection = (
  db: Firestore,
  userId: string,
  setUser: Dispatch<SetStateAction<any>>
) => {
  const userDoc = doc(db, "users", userId)
  const jobsCollection = collection(userDoc, "jobs")

  const unsubscribe = onSnapshot(jobsCollection, async (jobsSnapshot) => {
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
