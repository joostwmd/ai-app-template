import {
  DocumentData,
  Firestore,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore"
import { FirebaseStorage } from "firebase/storage"
import { JobRecordTest } from "./types"
import { getJobs, setJobs } from "./AsyncStorage"
import { getImageUrl } from "./getImage"

export const subscribeToJobsCollection = (
  db: Firestore,
  storage: FirebaseStorage,
  userId: string
) => {
  const userDoc = doc(db, "users", userId)
  const jobsCollection = collection(userDoc, "jobs")
  const jobsQuery = query(jobsCollection, orderBy("createdAt", "desc"))

  const unsubscribe = onSnapshot(jobsQuery, async (jobsSnapshot) => {
    if (!jobsSnapshot.empty) {
      const jobs: JobRecordTest[] = await getJobs()
      const jobIds: string[] = jobs.map((job) => job.id)
      const changes = jobsSnapshot.docChanges()
      for (let change of changes) {
        const jobId: string = change.doc.id
        const current: DocumentData = change.doc.data()
        if (change.type === "added") {
          if (!jobIds.includes(jobId)) {
            jobs.push({
              id: jobId,
              uploaded: false,
              finished: false,
              coverImage: null,
              createdAt: current.createdAt,
            })
          }
        } else if (change.type === "modified") {
          const prev = jobs.find((job) => job.id === jobId)
          if (prev && prev.uploaded !== current.uploaded) {
            const imageUrl = await getImageUrl({
              storage: storage,
              userId: userId,
              jobId: jobId,
              folder: "uploaded",
            })

            const index = jobs.findIndex((job) => job.id === jobId)
            if (index !== -1) {
              jobs[index] = {
                id: jobId,
                uploaded: true,
                finished: false,
                coverImage: imageUrl,
                createdAt: current.createdAt,
              }
            }
          } else if (prev && prev.finished !== current.finished) {
            const imageUrl = await getImageUrl({
              storage: storage,
              userId: userId,
              jobId: jobId,
              folder: "generated",
            })

            const index = jobs.findIndex((job) => job.id === jobId)
            if (index !== -1) {
              jobs[index] = {
                id: jobId,
                uploaded: true,
                finished: true,
                coverImage: imageUrl,
                createdAt: current.createdAt,
              }
            }
          }
        }
      }
      setJobs(jobs)
    }
  })

  return unsubscribe
}
