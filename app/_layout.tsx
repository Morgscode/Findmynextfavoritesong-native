import React from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import AppNav from "@src/components/AppNav";
import AudioPlayer from "@src/components/AudioPlayer";
import { AuthProvider } from "@src/context/AuthContext";
import { TrackProvider } from "@src/context/TrackContext";
import { SampleProvider } from "@src/context/SampleConext";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Layout() {
  return (
    <AuthProvider>
      <TrackProvider>
        <SampleProvider>
          <Slot />
          <AudioPlayer />
          <AppNav />
          <StatusBar style="light" />
        </SampleProvider>
      </TrackProvider>
    </AuthProvider>
  );
}
