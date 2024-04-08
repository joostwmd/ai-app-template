import { Firestore, doc, onSnapshot } from "firebase/firestore"
import { Dispatch, SetStateAction } from "react"

export const subscribeToUserDocument = (
  db: Firestore,
  userId: string,
  setUser: Dispatch<SetStateAction<any>> // replace 'any' with the actual type of your user state
) => {
  const userRef = doc(db, "users", userId)

  const unsubscribe = onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      console.log("User document data:", doc.data())
      setUser(doc.data())
    } else {
      console.log("No user document!")
    }
  })

  return unsubscribe
}
