import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Audio } from "expo-av";
import { type SpotifyTrack } from "@src/lib/spotify";

export default function TrackPlayer({
  id,
  name,
  album,
  artists,
  preview_url,
}: SpotifyTrack) {
  const [paused, setPaused] = useState<boolean>(true);
  const [sound, setSound] = useState<Audio.Sound>(new Audio.Sound());

  const icon = paused
    ? require("../../assets/play.png")
    : require("../../assets/pause.png");

  async function getSound() {
    try {
      if (!preview_url || !name || !id) return;
      const { sound } = await Audio.Sound.createAsync(
        { uri: preview_url },
        { shouldPlay: true },
      );
      setSound(sound);
      setPaused(false);
    } catch (error) {
      //eslint-disable-next-line
      console.error(error);
    }
  }

  useEffect(() => {
    getSound();
  }, []);

  useEffect(() => {
    getSound();
  }, [preview_url]);

  async function toggle() {
    if (paused) {
      await sound?.playAsync();
    } else {
      // paused
      await sound?.pauseAsync();
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
