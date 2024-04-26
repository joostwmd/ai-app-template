import React, { createContext, useContext, useEffect, useState } from "react"
import { Platform } from "react-native"
import Purchases, {
  PurchasesOffering,
  PurchasesOfferings,
} from "react-native-purchases"
import { APIKeys } from "./revenuecatConfig"
import { useUser } from "@utils/user/UserContext"

interface RevenuecatContextType {
  offerings: PurchasesOfferings
  purchase: (offering: PurchasesOffering) => Promise<string | null>
  revenuecatContextLoaded: boolean
}

const RevenuecatContext = createContext<RevenuecatContextType | null>(null)

export function RevenuecatProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>()
  const [loaded, setLoaded] = useState<boolean>(false)
  const { user } = useUser()

  useEffect(() => {
    const setup = async () => {
      if (Platform.OS == "android") {
        Purchases.configure({ apiKey: APIKeys.google, appUserID: user.id })
      } else {
        Purchases.configure({ apiKey: APIKeys.apple, appUserID: user.id })
      }

      const offerings = await Purchases.getOfferings()
      console.log("Offerings: ", offerings)
      setOfferings(offerings)
      setLoaded(true)
    }

    setup().catch(console.log)
  }, [])

  async function purchase(offering: PurchasesOffering): Promise<string | null> {
    try {
      const purchase = await Purchases.purchasePackage(
        offering.availablePackages[0]
      )
      const purchaseId: string = purchase.transaction.transactionIdentifier
      return purchaseId
      // Handle successful purchase here
    } catch (error) {
      console.log("Error purchasing: " + error)
      return null
    }
  }

  if (!offerings) {
    return null
  }

  const value: RevenuecatContextType = {
    offerings,
    purchase,
    revenuecatContextLoaded: loaded,
  }

  return (
    <RevenuecatContext.Provider value={value}>
      {children}
    </RevenuecatContext.Provider>
  )
}

export const useRevenuecat = (): RevenuecatContextType => {
  const context = useContext(RevenuecatContext)
  if (!context) {
    throw new Error("useRevenuecat must be used within a RevenuecatProvider")
  }
  return context
}
