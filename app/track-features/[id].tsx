import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthContext } from "@src/context/AuthContext";
import { getTrackFeatures, type TrackFeatures } from "@src/lib/spotify";

export default function TrackFeatures() {
  const { state } = useAuthContext();
  const { id } = useLocalSearchParams();
  const [trackFeatures, setTrackFeatures] = useState<TrackFeatures | null>(
    null,
  );

  async function fetchTrackFeatures() {
    const features = await getTrackFeatures(state.token!, id as string);
    // eslint-disable-next-line
    console.log(features);
    setTrackFeatures(features as TrackFeatures);
  }

  useEffect(() => {
    fetchTrackFeatures();
  }, []);

  if (!trackFeatures) {
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
