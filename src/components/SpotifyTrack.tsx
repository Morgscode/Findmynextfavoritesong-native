import React, { type PropsWithChildren } from "react";
import { View, Text, Image } from "react-native";
import { type SpotifyTrack } from "@src/lib/spotify";

export default function SpotifyTrack({
  name,
  album,
  artists,
  explicit,
  children,
}: PropsWithChildren<SpotifyTrack>) {
  return (
    <View className="flex flex-row items-center gap-4 py-1 mb-1">
      <Image source={{ uri: album.images[0].url }} height={50} width={50} />
      <View className="flex gap-1 mr-auto">
        <Text className="text-white font-semibold">{name}</Text>
        <View className="flex flex-row items-center">
          {explicit && (
            <View className="mr-2 bg-gray-400">
              <Text className="text-[#191414] text-sm">E</Text>
            </View>
          )}
          <Text className="text-gray-400 text-sm">{artists[0].name}</Text>
        </View>
      </View>
      {children}
    </View>
  );
}
