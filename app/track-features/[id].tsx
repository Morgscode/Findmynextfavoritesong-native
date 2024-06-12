import React from "react";
import { SafeAreaView, Text, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function TrackFeatures() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#191414]">
      <Text className="text-2xl text-gray-400 mb-8">
        Fetching the track analysis...
      </Text>
      <ActivityIndicator size="large" color="#1DB954" />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
