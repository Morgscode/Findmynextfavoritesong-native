import React from "react";
import { View, Text, Image } from "react-native";
import { type SpotifyTrack } from "@src/lib/spotify";

export default function SpotifyTrack({ name, album, artists }: SpotifyTrack) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 5,
      }}
    >
      <Image source={{ uri: album.images[0].url }} height={50} width={50} />
      <View style={{ display: "flex", gap: 5 }}>
        <Text style={{ color: "white" }}>{name}</Text>
        <Text style={{ color: "white", fontSize: 12 }}>{artists[0].name}</Text>
      </View>
    </View>
  );
}
