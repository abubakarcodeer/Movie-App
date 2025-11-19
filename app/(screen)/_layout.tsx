import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="HomeScreen" />
        <Stack.Screen name="MovieScreen" />
        <Stack.Screen name="PersonScreen" />
        <Stack.Screen name="SearchScreen" />
      </Stack>
  )
}
