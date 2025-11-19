import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
       <StatusBar barStyle={'light-content'} backgroundColor={"#262626"}/>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="(screen)" />
      </Stack>
    </GestureHandlerRootView>
  )
}
