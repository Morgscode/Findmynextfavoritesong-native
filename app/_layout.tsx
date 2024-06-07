import React from "react";
import { Slot } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import AppNav from "@src/components/AppNav";
import { AuthProvider } from "@src/context/AuthContext";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Layout() {
  return (
    <AuthProvider>
      <Slot />
      <AppNav />
    </AuthProvider>
  );
}
