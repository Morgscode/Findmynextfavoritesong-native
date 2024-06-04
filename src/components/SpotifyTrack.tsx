import React from "react";
import { Text } from "react-native";
import { type SpotifyTrack } from "@src/lib/spotify";

export default function SpotifyTrack(props: SpotifyTrack) {
  console.log(JSON.stringify(props, null, 2));

  return <Text>Track</Text>;
}
