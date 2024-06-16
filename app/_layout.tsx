import React from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import { RootSiblingParent } from "react-native-root-siblings";
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
          <RootSiblingParent>
            <Slot />
            <AudioPlayer />
            <AppNav />
          </RootSiblingParent>
          <StatusBar style="light" />
        </SampleProvider>
      </TrackProvider>
    </AuthProvider>
  );
}
