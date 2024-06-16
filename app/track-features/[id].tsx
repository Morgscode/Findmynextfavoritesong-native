import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  View,
} from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import TrackFeatureSlider from "@src/components/TrackFeatureSlider";
import { useAuthContext } from "@src/context/AuthContext";
import { useSampleContext } from "@src/context/SampleConext";
import { getTrackFeatures, type TrackFeatures } from "@src/lib/spotify";

export default function TrackFeatures() {
  const { state } = useAuthContext();
  const { id } = useLocalSearchParams();
  const { state: sampleState, dispatch: sampleDispatch } = useSampleContext();

  async function fetchTrackFeatures() {
    if (!id) return;
    const trackId = typeof id === "string" ? id : id[0];
    if (sampleState.features && sampleState.features.id === trackId) return;
    const features = await getTrackFeatures(state.token!, trackId);
    sampleDispatch({
      type: "SET_FEATURES",
      payload: features as TrackFeatures,
    });
  }

  function updateFeatures(feature: string, value: number) {
    const updated = {
      ...(sampleState.features as TrackFeatures),
    };
    updated[feature] = value;
    sampleDispatch({ type: "SET_FEATURES", payload: updated });
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
          featureValue={value as number}
          updateFn={updateFeatures}
        />
      ));
  }

  if (!sampleState.features) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#191414]">
        <Text className="text-2xl text-gray-400 font-bold mb-8">
          Fetching the track analysis...
        </Text>
        <ActivityIndicator size="large" color="#1DB954" />
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="relative flex-1 bg-[#191414]">
      <View className="p-4 gap-2">
        <Text className="text-gray-400 text-2xl text-white font-bold">
          Track Features
        </Text>
        <Text className="text-gray-400">
          Spotify uses these attributes to classify music and suggest new songs
          to you. Sample music based on these as they are, or modify them with
          the sliders below.
        </Text>
      </View>
      <ScrollView
        scrollEventThrottle={500}
        className="px-4 pb-[50px]"
        indicatorStyle="white"
      >
        {sliders(sampleState.features)}
      </ScrollView>
      {sampleState.features && (
        <Link href="/genres" asChild>
          <Pressable className="rounded-full bg-[#1DB954] p-4 m-4">
            <Text className="text-[#191414] text-center">Select Genres</Text>
          </Pressable>
        </Link>
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
