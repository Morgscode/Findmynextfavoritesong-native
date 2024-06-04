import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  type NativeScrollEvent,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import SpotifyTrack from "@src/components/SpotifyTrack";
import TrackPlayer from "@src/components/TrackPlayer";
import { useAuthContext } from "@src/context/AuthContext";
import {
  getTopTracks,
  type SpotifyTrack as SpotifyTrackType,
} from "@src/lib/spotify";

export default function SpotifyTracks() {
  const { state } = useAuthContext();
  const [tracks, setTracks] = useState<Array<SpotifyTrackType>>([]);
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrackType | null>(
    null,
  );
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getTracks(url: string | null = null) {
    setLoading(true);
    const { tracks, next } = await getTopTracks(state.token!, url);
    setTracks((topTracks) => [...topTracks, ...tracks]);
    setNext(next);
    setLoading(false);
  }

  async function handleListEndReached() {
    await getTracks(next);
  }

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100
    );
  };

  useEffect(() => {
    getTracks();
  }, []);

  if (tracks.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#191414]">
        <Text className="text-2xl text-gray-400 mb-8">
          Fetching your current top tracks...
        </Text>
        <ActivityIndicator size="large" color="#1DB954" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="relative flex-1 bg-[#191414] h-screen w-screen">
      <View className="p-4">
        <Text className="text-gray-400 text-2xl mb-4">
          These are your current top tracks.
        </Text>
        <Text className="text-gray-400">
          Choose one of them to sample similar music.
        </Text>
      </View>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          isCloseToBottom(nativeEvent) && !loading && handleListEndReached();
        }}
        scrollEventThrottle={500}
        className="px-4 pb-[50px]"
        indicatorStyle="white"
      >
        {tracks.map((track) => (
          <Pressable key={track.id} onPress={() => setSelectedTrack(track)}>
            <SpotifyTrack {...track} />
          </Pressable>
        ))}
      </ScrollView>
      {selectedTrack && <TrackPlayer {...selectedTrack} />}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
