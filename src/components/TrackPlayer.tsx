import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import { type SpotifyTrack } from "@src/lib/spotify";

export default function TrackPlayer({
  name,
  album,
  artists,
  preview_url,
}: SpotifyTrack) {
  const [sound, setSound] = useState<Audio.Sound>(new Audio.Sound());
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [icon, setIcon] = useState<string>("../../assets/play.png");

  async function getSound() {
    try {
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: preview_url },
        { shouldPlay: true },
        (playbackStatus: AVPlaybackStatus) => {
          if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            setIcon("../../assets/pause.png");
            if (playbackStatus.error) {
              //eslint-disable-next-line
              console.error(
                `Encountered a fatal error during playback: ${playbackStatus.error}`,
              );
              // Send Expo team the error on Slack or the forums so we can help you debug!
            }
          } else {
            // Update your UI for the loaded state

            if (playbackStatus.isPlaying) {
              // Update your UI for the playing state
              setIcon("../../assets/pause.png");
            } else {
              // Update your UI for the paused state
            }

            if (playbackStatus.isBuffering) {
              // Update your UI for the buffering state
            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
              // The player has just finished playing and will stop. Maybe you want to play something else?
              setIcon("../../assets/play.png");
            }
          }
        },
        true,
      );
      setStatus(status);
      setSound(sound);
    } catch (error) {
      //eslint-disable-next-line
      console.error(error);
    }
  }

  async function unloadSound() {
    const status = await sound.unloadAsync();
    setStatus(status);
  }

  async function handleSound() {
    try {
      await unloadSound();
      await getSound();
    } catch (error) {
      //eslint-disable-next-line
      console.error(error);
    }
  }

  async function toggle() {
    if (status && status.isLoaded && status.isPlaying === false) {
      const newStatus = await sound.playAsync();
      setStatus(newStatus);
      status && status.isLoaded && status.isPlaying === false;
    } else if (status && status.isLoaded && status.isPlaying) {
      const newStatus = await sound.pauseAsync();
      setIcon("../../assets/play.png");
      setStatus(newStatus);
    }
  }

  useEffect(() => {
    if (preview_url) {
      handleSound();
    }
    return () => {
      unloadSound();
    };
  }, [preview_url]);

  return (
    <View className="flex flex-row items-center ml-4 mr-4 bg-[#062812] p-4">
      <Image
        style={{ marginRight: 16 }}
        source={{ uri: album.images[0].url }}
        height={50}
        width={50}
      />
      <View className="flex gap-2">
        <Text className="text-white">{name}</Text>
        <Text className="text-white text-sm">{artists[0].name}</Text>
      </View>
      <Pressable onPress={() => toggle()} className="ml-auto">
        <Image source={require(icon)} width={23} />
      </Pressable>
    </View>
  );
}
