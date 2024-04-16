import {
  doc,
  collection,
  updateDoc,
  Firestore,
  DocumentData,
} from "firebase/firestore"

interface UpdateJobProps {
  db: Firestore
  userId: string
  jobId: string
}

export async function updateJob({
  db,
  userId,
  jobId,
}: UpdateJobProps): Promise<void> {
  const userCollection = collection(db, "users")
  const userDoc = doc(userCollection, userId)
  const jobCollection = collection(userDoc, "jobs")
  const jobDoc = doc(jobCollection, jobId)

  await updateDoc(jobDoc, {
    uploaded: true,
  })
}
