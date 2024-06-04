import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
  type NativeScrollEvent,
} from "react-native";
import SpotifyTrack from "@src/components/SpotifyTrack";
import { useAuthContext } from "@src/context/AuthContext";
import {
  getTopTracks,
  type SpotifyTrack as SpotifyTrackType,
} from "@src/lib/spotify";

export default function SpotifyTracks() {
  const { state } = useAuthContext();
  const [tracks, setTracks] = useState<Array<SpotifyTrackType>>([]);
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getTracks(url: string | null = null) {
    setLoading(true);
    const { tracks, next } = await getTopTracks(state.token!, url);
    setTracks((topTracks) => [...topTracks.slice(), ...tracks]);
    setNext(next);
    setLoading(false);
  }

  async function handleEndReached() {
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
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-gray-400 mb-8">
          Fetching your current top tracks...
        </Text>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900 h-screen w-screen">
      <Text className="text-gray-400 p-8">
        These are your current top tracks. Choose one of them to sample similar
        music.
      </Text>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          isCloseToBottom(nativeEvent) && !loading && handleEndReached();
        }}
        scrollEventThrottle={500}
        className="px-8"
      >
        {tracks.map((track) => (
          <SpotifyTrack {...track} key={track.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
