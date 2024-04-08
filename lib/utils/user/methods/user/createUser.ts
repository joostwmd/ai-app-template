import { Auth, signInAnonymously } from "firebase/auth"
import {
  getFirstInstallationDate,
  setFirstInstallationDate,
} from "../install/firstInstallationDate"
import { decreaseUserTokens } from "../install/decreaseUserTokens"

export async function createNewUser({ auth }: { auth: Auth }) {
  const res = await signInAnonymously(auth)
  const authUser = res.user
  const firstInstallationDate = await getFirstInstallationDate()
  if (firstInstallationDate) {
    console.log("User already installed the app")
    decreaseUserTokens(authUser.uid)
  } else {
    setFirstInstallationDate()
  }

  return authUser
}
