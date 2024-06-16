import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import SpotifyTrack from "@src/components/SpotifyTrack";
import { useAuthContext } from "@src/context/AuthContext";
import { useSampleContext } from "@src/context/SampleConext";
import { useTrackContext } from "@src/context/TrackContext";
import {
  getRecommendations,
  TrackFeatures,
  type SpotifyTrack as SpotifyTrackType,
} from "@src/lib/spotify";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<
    Array<SpotifyTrackType>
  >([]);
  const { state: authState } = useAuthContext();
  const { state: trackState, dispatch: trackDispatch } = useTrackContext();
  const { state: sampleState } = useSampleContext();

  async function fetchRecommendations() {
    if (!authState.token) return;
    const { tracks } = await getRecommendations(
      authState.token,
      sampleState.tracks,
      sampleState.genres,
      sampleState.features as TrackFeatures,
    );
    setRecommendations(tracks);
  }

  async function likeSong(track: SpotifyTrackType) {
    const { id } = track;
    return id;
  }

  useEffect(() => {
    fetchRecommendations();
  }, []);

  if (recommendations.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#191414]">
        <Text className="text-2xl text-gray-400 mb-8">
          Finding recommended music to sample...
        </Text>
        <ActivityIndicator size="large" color="#1DB954" />
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="relative flex-1 bg-[#191414]">
      <ScrollView
        scrollEventThrottle={500}
        className="px-4 pb-[50px]"
        indicatorStyle="white"
      >
        {recommendations.map((track) => (
          <Pressable key={track.id}>
            <SpotifyTrack
              isSelected={
                (trackState.track && trackState.track.id === track.id) || false
              }
              {...track}
            >
              <View className="flex flex-row gap-1">
                <Pressable
                  onPress={() => likeSong(track)}
                  className="p-2 border-2 border-solid border-gray-400 rounded-lg"
                >
                  <Text className="text-gray-400">Like</Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    trackDispatch({ type: "SET_TRACK", payload: track })
                  }
                  className="p-2 border-2 border-solid border-gray-400 rounded-lg"
                >
                  <Text className="text-gray-400">Sample</Text>
                </Pressable>
              </View>
            </SpotifyTrack>
          </Pressable>
        ))}
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
