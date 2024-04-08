import { UserRecord } from "@utils/user/types"
import { Firestore, doc, onSnapshot } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"

export const subscribeToUserDocument = (
  db: Firestore,
  userId: string,
  setUser: Dispatch<SetStateAction<UserRecord>>
) => {
  const userRef = doc(db, "users", userId)

  const unsubscribe = onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      console.log("User document data:", doc.data())
      const data = doc.data()
      const user: UserRecord = {
        id: data.id,
        tokens: data.tokens,
        jobs: data.jobs,
      }
      setUser(user)
    } else {
      console.log("No user document!")
    }
  })

  return unsubscribe
}
