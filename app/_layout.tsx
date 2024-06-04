import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "@src/context/AuthContext";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Layout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
