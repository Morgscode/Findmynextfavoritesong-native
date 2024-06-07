import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  type ImageSourcePropType,
} from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import { type SpotifyTrack } from "@src/lib/spotify";

export default function AudioPlayer({
  name,
  album,
  artists,
  preview_url,
}: SpotifyTrack) {
  const [audio, setAudio] = useState<Audio.Sound>(new Audio.Sound());
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  const [icon, setIcon] = useState<ImageSourcePropType>(
    // eslint-disable-next-line
    require("../../assets/play.png"),
  );

  async function getAudio() {
    try {
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: preview_url },
        { shouldPlay: true },
        (playbackStatus: AVPlaybackStatus) => {
          if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            // eslint-disable-next-line
            setIcon(require("../../assets/pause.png"));
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
              // eslint-disable-next-line
              setIcon(require("../../assets/pause.png"));
            } else {
              // Update your UI for the paused state
            }

            if (playbackStatus.isBuffering) {
              // Update your UI for the buffering state
            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
              // The player has just finished playing and will stop. Maybe you want to play something else?
              // eslint-disable-next-line
              setIcon(require("../../assets/play.png"));
            }
          }
        },
        true,
      );
      setStatus(status);
      setAudio(sound);
    } catch (error) {
      //eslint-disable-next-line
      console.error(error);
    }
  }

  async function unloadAudio() {
    const status = await audio.unloadAsync();
    setAudio(new Audio.Sound());
    setStatus(status);
  }

  async function prepareAudio() {
    try {
      await unloadAudio();
      await getAudio();
    } catch (error) {
      //eslint-disable-next-line
      console.error(error);
    }
  }

  async function toggleAudio() {
    if (status && status.isLoaded && status.isPlaying === false) {
      const newStatus = await audio.playAsync();
      setStatus(newStatus);
    } else if (status && status.isLoaded && status.isPlaying) {
      const newStatus = await audio.pauseAsync();
      setStatus(newStatus);
      // eslint-disable-next-line
      setIcon(require("../../assets/play.png"));
    }
  }

  useEffect(() => {
    preview_url && prepareAudio();
    return () => {
      unloadAudio();
    };
  }, [preview_url]);

  return (
    <View className="flex flex-row items-center ml-4 mr-4 bg-[#062812] p-2">
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
      <Pressable onPress={() => toggleAudio()} className="ml-auto">
        <Image source={icon} width={35} />
      </Pressable>
    </View>
  );
}
