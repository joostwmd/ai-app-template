import React, { createContext, useContext, useEffect, useState } from "react"
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app"
import {
  Auth,
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth"
import {
  Firestore,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { FirebaseStorage, getStorage } from "firebase/storage"
import { firebaseConfig } from "./firebaseConfig"

interface FirebaseContextValue {
  app: FirebaseApp
  auth: Auth
  db: Firestore
  storage: FirebaseStorage
  firebaseContextLoaded: boolean
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null)

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [app, setApp] = useState<FirebaseApp | null>(null)
  const [auth, setAuth] = useState<Auth | null>(null)
  const [db, setDb] = useState<Firestore | null>(null)
  const [storage, setStorage] = useState<FirebaseStorage | null>(null)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    let app: FirebaseApp
    let auth: Auth
    let db: Firestore
    let storage: FirebaseStorage

    if (!getApps().length) {
      app = initializeApp(firebaseConfig)
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      })
      db = initializeFirestore(app, {
        //experiment
        experimentalForceLongPolling: false,
      })
      storage = getStorage(app)
    } else {
      app = getApp()
      auth = getAuth(app)
      db = getFirestore(app)
      storage = getStorage(app)
    }

    setApp(app)
    setAuth(auth)
    setDb(db)
    setStorage(storage)
    setLoaded(true)
  }, [])

  if (!app || !auth || !db || !storage) {
    return null
  }

  const value: FirebaseContextValue = {
    app,
    auth,
    db,
    storage,
    firebaseContextLoaded: loaded,
  }

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  )
}

export function useFirebase() {
  const context = useContext(FirebaseContext)
  if (context === null) {
    throw new Error("useFirebase must be used within a FirebaseProvider")
  }
  return context
}
