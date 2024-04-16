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
import { getJobs, setData, setJobs } from "./AsyncStorage"
import { getImageUrl } from "./getImage"
import { generateLocalImagePath } from "./generateLoclImagePath"
import { downloadToFileSystem } from "./downloadToFileSystem"

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
              uploadedImageLocalURL: null,
              generatedImagLocalURL: null,
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

            const localImagePath = generateLocalImagePath({
              jobId: jobId,
              isFinished: false,
            })

            const localImageURI = await downloadToFileSystem({
              imageUrl: imageUrl,
              localPath: localImagePath,
            })

            const index = jobs.findIndex((job) => job.id === jobId)
            if (index !== -1) {
              jobs[index] = {
                id: jobId,
                uploaded: true,
                finished: true,
                uploadedImageLocalURL: prev.uploadedImageLocalURL,
                generatedImagLocalURL: localImageURI,
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

            const localImagePath = generateLocalImagePath({
              jobId: jobId,
              isFinished: true,
            })

            const localImageURI = await downloadToFileSystem({
              imageUrl: imageUrl,
              localPath: localImagePath,
            })

            const index = jobs.findIndex((job) => job.id === jobId)
            if (index !== -1) {
              jobs[index] = {
                id: jobId,
                uploaded: true,
                finished: true,
                uploadedImageLocalURL: prev.uploadedImageLocalURL,
                generatedImagLocalURL: localImageURI,
                createdAt: current.createdAt,
              }
            }
          }
        }
      }

      //test
      // jobs.sort(
      //   (a, b) =>
      //     b.createdAt.seconds - a.createdAt.seconds ||
      //     b.createdAt.nanoseconds - a.createdAt.nanoseconds
      // )

      setJobs(jobs)
    }
  })

  return unsubscribe
}
