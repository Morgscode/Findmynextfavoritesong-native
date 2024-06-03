import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import SpotifyTrack from "@src/components/SpotifyTrack";
import { useAuthContext } from "@src/context/AuthContext";
import {
  getTopTracks,
  type SpotifyTrack as SpotifyTrackType,
} from "@src/lib/spotify";

export default async function SpotifyTracks() {
  const { state } = useAuthContext();
  const [tracks, setTracks] = useState<Array<SpotifyTrackType>>([]);

  setTracks(await getTopTracks(state.token!));

  if (tracks.length === 0) {
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
        These are your current top tracks
      </Text>
      <View className="flex flex-col">
        {tracks.map((track) => (
          <SpotifyTrack key={track.title} />
        ))}
      </View>
    </View>
  );
}
