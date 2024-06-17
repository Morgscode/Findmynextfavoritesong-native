import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Audio, type AVPlaybackStatus } from "expo-av";
import { useTrackContext } from "@src/context/TrackContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function AudioPlayer() {
  const { state } = useTrackContext();
  const [audio, setAudio] = useState<Audio.Sound>(new Audio.Sound());
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [audioFinished, setAudioFinished] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>("play");

  async function getAudio() {
    if (!state.track?.preview_url) return;
    try {
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: state.track.preview_url },
        { shouldPlay: true },
        (playbackStatus: AVPlaybackStatus) => {
          if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            // eslint-disable-next-line
            setIcon("pause");
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
              setIcon("pause");
              setAudioFinished(false);
            } else {
              // Update your UI for the paused state
            }

            if (playbackStatus.isBuffering) {
              // Update your UI for the buffering state
            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
              // The player has just finished playing and will stop. Maybe you want to play something else?
              // eslint-disable-next-line
              setIcon("play");
              setAudioFinished(true);
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
    if (status && audioFinished) {
      const newStatus = await audio.replayAsync();
      setStatus(newStatus);
    } else if (status && status.isLoaded && status.isPlaying === false) {
      const newStatus = await audio.playAsync();
      setStatus(newStatus);
    } else if (status && status.isLoaded && status.isPlaying) {
      const newStatus = await audio.pauseAsync();
      setStatus(newStatus);
      // eslint-disable-next-line
      setIcon("play");
    }
  }

  useEffect(() => {
    state.track && state.track.preview_url && prepareAudio();
    return () => {
      unloadAudio();
    };
  }, [state.track]);

  if (!state.track) return;

  return (
    <View className="bg-[#191414]">
      <View className="flex flex-row items-center bg-[#083518] px-4 py-2 rounded-lg mx-2">
        <Image
          className="mr-4 rounded-lg"
          style={{ marginRight: 16 }}
          source={{ uri: state.track.album.images[0].url }}
          height={50}
          width={50}
        />
        <View className="flex gap-2">
          <Text className="text-white">{state.track.name}</Text>
          <Text className="text-white text-sm">
            {state.track.artists[0].name}
          </Text>
        </View>
        <Pressable onPress={() => toggleAudio()} className="ml-auto">
          <FontAwesome5 name={icon} size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
