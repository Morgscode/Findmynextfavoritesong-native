import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@src/context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Slot />
      <StatusBar />
    </AuthProvider>
  );
}
