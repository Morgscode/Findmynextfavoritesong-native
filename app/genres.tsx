import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthContext } from "@src/context/AuthContext";
import { useSampleContext } from "@src/context/SampleConext";
import { getSeedGenres } from "@src/lib/spotify";

export default function Genres() {
  const [genres, setGenres] = useState<Array<string>>([]);
  const { state: authState } = useAuthContext();
  const { state: sampleState, dispatch: sampleDispatch } = useSampleContext();

  async function fetchGenres() {
    if (!authState.token) return;
    const genres = await getSeedGenres(authState.token);
    setGenres(genres);
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  const genreStyles = (genre: string) =>
    sampleState.genres.includes(genre)
      ? "p-2 rounded-full border-2 border-[#1DB954] bg-[#1DB954]"
      : "p-2 rounded-full border-2 border-solid border-gray-400";

  const textStyles = (genre: string) =>
    sampleState.genres.includes(genre)
      ? "px-2 text-[#191414]"
      : "px-2 text-gray-400";

  const genreDisabled = (genre: string) =>
    sampleState.genres.length === 4 &&
    sampleState.genres.includes(genre) === false;

  const genresSelected = () => sampleState.genres?.length > 0;

  function toggleGenre(genre: string) {
    sampleState.genres.includes(genre)
      ? sampleDispatch({
          type: "SET_GENRES",
          payload: sampleState.genres.filter((g) => g !== genre),
        })
      : sampleDispatch({
          type: "SET_GENRES",
          payload: [...sampleState.genres, genre],
        });
  }

  if (!genres.length) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#191414]">
        <Text className="text-2xl text-gray-400 mb-8">
          Fetching Available Genres...
        </Text>
        <ActivityIndicator size="large" color="#1DB954" />
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#191414]">
      <View className="p-4">
        <Text className="text-gray-400 text-2xl mb-4">
          Available Seed Genres
        </Text>
        <Text className="text-gray-400">
          Select up to 5 to tell Spotify what genres you want to sample music
          from.
        </Text>
        {genresSelected() && (
          <View className="flex flex-row flex-wrap gap-2 mt-1">
            {sampleState.genres.map((genre, index) => (
              <Pressable
                key={`selected-${genre}-${index}`}
                className="p-2 rounded-full bg-[#1DB954]"
                onPress={() => toggleGenre(genre)}
              >
                <Text className="px-2 text-[#191414]">{genre}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
      <ScrollView
        scrollEventThrottle={500}
        className="px-4 pb-[50px]"
        indicatorStyle="white"
      >
        <View className="flex flex-row flex-wrap gap-2">
          {genres.map((genre, index) => (
            <Pressable
              className={genreStyles(genre)}
              key={`${genre}-${index}`}
              onPress={() => toggleGenre(genre)}
              disabled={genreDisabled(genre)}
            >
              <Text className={textStyles(genre)}>{genre}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {genresSelected() && (
        <Link href="/recommendations" asChild>
          <Pressable className="rounded-full bg-[#1DB954] p-4 m-4">
            <Text className="text-[#191414] text-center">
              Get Recommendations
            </Text>
          </Pressable>
        </Link>
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
