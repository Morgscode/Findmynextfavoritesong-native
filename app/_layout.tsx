import React from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import AppNav from "@src/components/AppNav";
import AudioPlayer from "@src/components/AudioPlayer";
import { AuthProvider } from "@src/context/AuthContext";
import { TrackProvider } from "@src/context/TrackContext";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Layout() {
  return (
    <AuthProvider>
      <TrackProvider>
        <Slot />
        <AudioPlayer />
        <AppNav />
        <StatusBar style="light" />
      </TrackProvider>
    </AuthProvider>
  );
}
