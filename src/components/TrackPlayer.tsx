import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { type SpotifyTrack } from "@src/lib/spotify";

export default function TrackPlayer({ name, album, artists }: SpotifyTrack) {
  const [paused, setPaused] = useState<boolean>(true);

  const icon = paused
    ? require("../../assets/play.png")
    : require("../../assets/pause.png");

  function toggle() {
    if (paused) {
      // play
    } else {
      // paused
    }
    setPaused(!paused);
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        bottom: 10,
        alignSelf: "stretch",
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: "#062812",
        padding: 8,
      }}
    >
      <Image
        style={{ marginRight: 16 }}
        source={{ uri: album.images[0].url }}
        height={50}
        width={50}
      />
      <View style={{ display: "flex", gap: 5 }}>
        <Text style={{ color: "white" }}>{name}</Text>
        <Text style={{ color: "white", fontSize: 12 }}>{artists[0].name}</Text>
      </View>
      <Pressable onPress={() => toggle()} style={{ marginLeft: "auto" }}>
        <Image source={icon} width={23} />
      </Pressable>
    </View>
  );
}
