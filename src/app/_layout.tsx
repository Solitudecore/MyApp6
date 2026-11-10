import { Stack } from "expo-router";
import { MovieProvider } from "../context/MovieContext";

export default function RootLayout() {
  return (
    <MovieProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </MovieProvider>
  );
}
