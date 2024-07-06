import React, { type PropsWithChildren } from "react";
import { View, Text, Image } from "react-native";
import { type SpotifyTrack } from "@src/lib/spotify";

type SpotifyTrackProps = PropsWithChildren<
  SpotifyTrack & { isSelected: boolean }
>;

export default function SpotifyTrack({
  name,
  album,
  artists,
  explicit,
  children,
  isSelected,
}: SpotifyTrackProps) {
  const textStyles = isSelected
    ? "font-bold text-[#1DB954]"
    : "font-bold text-white";
  return (
    <View className="flex flex-row items-center gap-4 py-1 mb-1">
      <Image
        className="rounded-lg"
        source={{ uri: album.images[1]?.url ?? album.images[0]?.url }}
        height={50}
        width={50}
      />
      <View className="flex gap-1 mr-auto">
        <Text className={textStyles}>{name}</Text>
        <View className="flex flex-row items-center">
          {explicit && (
            <View className="mr-2">
              <Text className="text-[#191414] text-gray-400 text-sm font-bold">
                E
              </Text>
            </View>
          )}
          <Text className="text-gray-400 text-xs">
            {artists[0].name} - {album.name}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
}
