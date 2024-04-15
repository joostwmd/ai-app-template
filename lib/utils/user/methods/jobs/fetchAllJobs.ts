import {
  Firestore,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore"

interface Test {
  id: string
  finished: boolean
}

export const getAllJobs = async (
  db: Firestore,
  userId: string
): Promise<Test[]> => {
  const userDoc = doc(db, "users", userId)
  const jobsCollection = collection(userDoc, "jobs")
  const jobsQuery = query(jobsCollection, orderBy("createdAt", "desc"))

  const querySnapshot = await getDocs(jobsQuery)
  const jobs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  const data: Test[] = await Promise.all(
    jobs.map(async (job) => {
      //@ts-ignore
      const isFinished = job.finished
      console.log("job", job, isFinished)

      return {
        id: job.id,
        finished: isFinished,
      }
    })
  )

  return data
}
