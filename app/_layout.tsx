import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect, useState } from "react"
import { FirebaseProvider, useFirebase } from "@utils/firebase/FirebaseContext"
import { UserProvider, useUser } from "@utils/user/UserContext"
import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

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

  useEffect(() => {
    console.log("Fonts loaded: ", fontsLoaded)
    if (fontsLoaded) {
      SplashScreen.hideAsync()

      //test
      //AsyncStorage.clear()
      //console.log("AsyncStorage cleared")
    }
  }, [fontsLoaded])

  // if (!fontsLoaded) {
  //   console.log("Fonts not loaded")
  //   return null
  // }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000" },
        }}
      ></Stack>
    </View>
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
