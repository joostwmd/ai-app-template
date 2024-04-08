import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect, useState } from "react"
import { FirebaseProvider, useFirebase } from "@utils/firebase/FirebaseContext"
import { UserProvider, useUser } from "@utils/user/UserContext"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function AppContent() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    //Pricedown: require("@assets/fonts/Pricedown.otf"),
    ...FontAwesome.font,
  })

  // if (!fontsLoaded) {
  //   console.log("Fonts not loaded")
  //   return null
  // }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000" },
      }}
    ></Stack>
  )
}

export default function RootLayout() {
  return (
    <FirebaseProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </FirebaseProvider>
  )
}
