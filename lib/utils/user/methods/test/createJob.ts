import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  Firestore,
  DocumentData,
} from "firebase/firestore"

interface CreateJobProps {
  db: Firestore
  userId: string
}

export async function createJob({
  db,
  userId,
}: CreateJobProps): Promise<DocumentData> {
  const userCollection = collection(db, "users")
  const userDoc = doc(userCollection, userId)
  const jobCollection = collection(userDoc, "jobs")

  const newJobDoc: DocumentData = await addDoc(jobCollection, {
    createdAt: serverTimestamp(),
    finished: false,
    uploaded: false,
  })

  return newJobDoc
}
