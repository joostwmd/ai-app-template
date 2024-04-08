import { User, onAuthStateChanged } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { createJob } from "./methods/jobs/createJob"
import { uploadImage } from "./methods/images/uploadImage"
import { useFirebase } from "../firebase/FirebaseContext"
import { subscribeToUserDocument } from "./methods/user/subscribeToUser"
import { subscribeToJobsCollection } from "./methods/jobs/subscribeToJobs"
import { createNewUser } from "./methods/user/createUser"
import { getImagesUrls } from "./methods/images/getImages"
import {
  GetJobImages,
  GetJobsImageByFolder,
  UserContextValue,
  UserRecord,
} from "./types"

const UserContext = createContext<UserContextValue | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { db, storage, auth } = useFirebase()
  const [loaded, setLoaded] = useState<boolean>(false)
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [user, setUser] = useState<UserRecord>({
    id: null,
    tokens: null,
    jobs: null,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      const handleAuth = async () => {
        if (authUser) {
          setAuthUser(authUser)
        } else {
          const authUser = await createNewUser({ auth })
          setAuthUser(authUser)
        }
      }
      handleAuth()
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (!authUser) {
      return
    }
    const unsubscribeUser = subscribeToUserDocument(db, authUser.uid, setUser)
    const unsubscribeJobs = subscribeToJobsCollection(db, authUser.uid, setUser)

    return () => {
      unsubscribeUser()
      unsubscribeJobs()
    }
  }, [authUser])

  //   useEffect(() => {
  //     if (user.jobs && user.id && user.tokens) {
  //       setLoaded(true)
  //     }
  //   }, [user])

  async function createNewJobs(images: string[]) {
    if (!authUser) {
      throw new Error("User not authenticated")
    }
    for (let image of images) {
      console.log(
        "Creating new job for user",
        authUser.uid,
        "with image",
        image
      )

      const newJobDoc = await createJob({ db, userId: authUser.uid })
      await uploadImage({
        storage,
        userId: authUser.uid,
        jobId: newJobDoc.id,
        image,
      })
    }
  }

  async function getJobsImageByFolder({
    jobId,
    folder,
  }: {
    jobId: string
    folder: "uploaded" | "generated"
  }): GetJobsImageByFolder {
    if (!authUser) {
      throw new Error("User not authenticated")
    }

    const uploadedImages = await getImagesUrls({
      storage,
      userId: authUser.uid,
      jobId,
      folder: folder,
    })

    return { path: uploadedImages[0] }
  }

  async function getJobImages(jobId: string): GetJobImages {
    if (!authUser) {
      throw new Error("User not authenticated")
    }

    const uploadedImages = await getImagesUrls({
      storage,
      userId: authUser.uid,
      jobId,
      folder: "uploaded",
    })

    const generatedImages = await getImagesUrls({
      storage,
      userId: authUser.uid,
      jobId,
      folder: "generated",
    })

    return { uploaded: uploadedImages[0], generated: generatedImages[0] }
  }

  // prevents app from rendering right now
  // if (!user.id || !user.tokens || !user.jobs) {
  //   return null
  // }

  return (
    <UserContext.Provider
      value={{
        user,
        userContextLoaded: loaded,
        createNewJobs,
        getJobsImageByFolder,
        getJobImages,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
