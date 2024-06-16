import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  type NativeScrollEvent,
} from "react-native";
import { router, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SpotifyTrack from "@src/components/SpotifyTrack";
import { useAuthContext } from "@src/context/AuthContext";
import { useTrackContext } from "@src/context/TrackContext";
import { useSampleContext } from "@src/context/SampleConext";
import {
  getTopTracks,
  type SpotifyTrack as SpotifyTrackType,
} from "@src/lib/spotify";

export default function SpotifyTracks() {
  const { state: authState } = useAuthContext();
  const { state: trackState, dispatch: trackDispatch } = useTrackContext();
  const { state: sampleState, dispatch: sampleDispatch } = useSampleContext();
  const [tracks, setTracks] = useState<Array<SpotifyTrackType>>([]);
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getTracks(url: string | null = null) {
    if (!authState.token) return;
    setLoading(true);
    const { tracks, next } = await getTopTracks(authState.token, url);
    setTracks((topTracks) => [...topTracks, ...tracks]);
    setNext(next);
    setLoading(false);
  }

  async function handleListEndReached() {
    await getTracks(next);
  }

  function toggleTrack(track: SpotifyTrackType) {
    sampleState.tracks.find((t) => t.id === track.id)
      ? sampleDispatch({
          type: "SET_TRACKS",
          payload: sampleState.tracks.filter((t) => t.id !== track.id),
        })
      : sampleDispatch({
          type: "SET_TRACKS",
          payload: [...sampleState.tracks, track],
        });
  }

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100
    );
  };

  const tracksSelected = () => sampleState.tracks.length > 0;

  const isSelectedTrack = (track: SpotifyTrackType) =>
    sampleState.tracks.find((t) => t.id === track.id);

  const borderStyles = (track: SpotifyTrackType) =>
    isSelectedTrack(track)
      ? "p-2 border-2 border-solid border-[#1DB954] rounded-lg"
      : "p-2 border-2 border-solid border-gray-400 rounded-lg";

  // eslint-disable-next-line
  const textStyles = (track: SpotifyTrackType) =>
    isSelectedTrack(track) ? "text-[#1DB954]" : "text-gray-400";

  const isDisabled = (track: SpotifyTrackType) =>
    sampleState.tracks.length === 1 ||
    (sampleState.tracks.length + sampleState.genres.length === 5 &&
      !isSelectedTrack(track));

  function sampleRedirect(track: SpotifyTrackType) {
    if (
      !trackState.track ||
      (trackState.track && trackState.track.id !== track.id)
    ) {
      trackDispatch({ type: "SET_TRACK", payload: track });
    }
    if (!isSelectedTrack(track)) {
      sampleDispatch({
        type: "SET_TRACKS",
        payload: [...sampleState.tracks, track],
      });
    }
    router.replace({
      pathname: "track-features/[id]",
      params: { id: track.id },
    });
  }

  useEffect(() => {
    getTracks();
  }, []);

  if (tracks.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#191414]">
        <Text className="text-2xl text-gray-400 mb-8">
          Fetching your current top tracks...
        </Text>
        <ActivityIndicator size="large" color="#1DB954" />
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="relative flex-1 bg-[#191414]">
      <View className="p-4">
        <Text className="text-gray-400 text-2xl mb-4">
          These are your current top tracks.
        </Text>
        <Text className="text-gray-400">
          Choose up to 5 of them to sample similar music.
        </Text>
      </View>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          isCloseToBottom(nativeEvent) && !loading && handleListEndReached();
        }}
        scrollEventThrottle={500}
        className="px-4 pb-[50px]"
        indicatorStyle="white"
      >
        {tracks.map((track) => (
          <Pressable
            key={track.id}
            onPress={() => trackDispatch({ type: "SET_TRACK", payload: track })}
          >
            <SpotifyTrack
              isSelected={
                (trackState.track && trackState.track.id === track.id) || false
              }
              {...track}
            >
              <View className="flex flex-row gap-1">
                <Pressable
                  disabled={isDisabled(track)}
                  className={borderStyles(track)}
                  onPress={() => toggleTrack(track)}
                >
                  <Text className="text-gray-400">Select</Text>
                </Pressable>
                <Pressable
                  className="p-2 border-2 border-solid border-gray-400 rounded-lg"
                  onPress={() => sampleRedirect(track)}
                >
                  <Text className="text-gray-400">Sample</Text>
                </Pressable>
              </View>
            </SpotifyTrack>
          </Pressable>
        ))}
      </ScrollView>
      {tracksSelected() && (
        <Link
          href={{
            pathname: "track-features/[id]",
            params: {
              id:
                (trackState.track && trackState.track.id) ||
                sampleState.tracks[0].id,
            },
          }}
          asChild
        >
          <Pressable className="rounded-full bg-[#1DB954] p-4 m-4">
            <Text className="text-[#191414] text-center">
              Set Sample Preferences
            </Text>
          </Pressable>
        </Link>
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
