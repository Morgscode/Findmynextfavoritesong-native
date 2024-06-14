import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import TrackFeatureSlider from "@src/components/TrackFeatureSlider";
import { useAuthContext } from "@src/context/AuthContext";
import { getTrackFeatures, type TrackFeatures } from "@src/lib/spotify";

export default function TrackFeatures() {
  const { state } = useAuthContext();
  const { id } = useLocalSearchParams();
  const [trackFeatures, setTrackFeatures] = useState<TrackFeatures | null>(
    null,
  );

  async function fetchTrackFeatures() {
    if (!id) return;
    const trackId = typeof id === "string" ? id : id[0];
    const features = await getTrackFeatures(state.token!, trackId);
    // eslint-disable-next-line
    console.log(features);
    setTrackFeatures(features);
  }

  function updateFeatures(feature: string, value: number) {
    const updated = {
      ...(trackFeatures as TrackFeatures),
    };
    updated[feature] = value;
    setTrackFeatures(updated);
  }

  useEffect(() => {
    fetchTrackFeatures();
  }, []);

  function sliders(features: TrackFeatures) {
    if (!features) return;
    return Object.entries(features)
      .filter(([, value]) => typeof value === "number")
      .map(([key, value], index) => (
        <TrackFeatureSlider
          key={`${index}-${key}`}
          featureName={key}
          featureValue={value}
          updateFn={updateFeatures}
        />
      ));
  }

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
    <SafeAreaView className="flex-1 items-center bg-[#191414]">
      <View className="p-4">
        <Text className="text-2xl text-gray-400 mb-8 pt-8">Track Features</Text>
        <Text className="text-gray-400 mb-8">
          This is the Spotify tack analysis of your chosen song. Spotify uses
          these attributes to classify music and suggest new songs to you. You
          can either search for new music based on these attributes as they
          are... or modify them with the sliders below.
        </Text>
        <StatusBar style="light" />
        <ScrollView
          scrollEventThrottle={500}
          className="pb-[50px]"
          indicatorStyle="white"
        >
          {sliders(trackFeatures)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
