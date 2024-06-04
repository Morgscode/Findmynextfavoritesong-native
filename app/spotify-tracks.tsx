import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import SpotifyTrack from "@src/components/SpotifyTrack";
import { useAuthContext } from "@src/context/AuthContext";
import {
  getTopTracks,
  type SpotifyTrack as SpotifyTrackType,
} from "@src/lib/spotify";

export default function SpotifyTracks() {
  const { state } = useAuthContext();
  const [tracks, setTracks] = useState<Array<SpotifyTrackType>>([]);

  async function getTracks() {
    const tracks = await getTopTracks(state.token!);
    setTracks(tracks);
  }

  useEffect(() => {
    getTracks();
  }, []);

  if (tracks.length === 0) {
    getTracks();
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-gray-400 pb-4">
          Fetching your current top tracks...
        </Text>
        <View className="animate-spin">
          <Image source={require("../assets/loading.png")} />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-gray-400 p-8">
        These are your current top tracks. Choose one of them to sample similar
        music.
      </Text>
      <View className="flex flex-col">
        {tracks.map((track, index) => (
          <SpotifyTrack key={index} {...track} />
        ))}
      </View>
    </View>
  );
}
