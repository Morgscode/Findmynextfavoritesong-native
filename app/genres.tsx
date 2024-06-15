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
import { getSeedGenres } from "@src/lib/spotify";

export default function Genres() {
  const [genres, setGenres] = useState<Array<string>>([]);
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const { state: authState } = useAuthContext();

  async function fetchGenres() {
    if (!authState.token) return;
    const genres = await getSeedGenres(authState.token);
    setGenres(genres);
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  const genreStyles = (genre: string) =>
    selectedGenres.includes(genre)
      ? "border-2 border-solid border-[#1DB954] p-2 bg-[#1DB954]"
      : "border-2 border-solid border-gray-400 p-2";

  const textStyles = (genre: string) =>
    selectedGenres.includes(genre) ? "text-[#191414]" : "text-gray-400";

  const genreDisabled = (genre: string) =>
    selectedGenres.length === 3 && selectedGenres.includes(genre) === false;

  const displayButton = () => selectedGenres.length > 0;

  function toggleGenre(genre: string) {
    selectedGenres.includes(genre)
      ? setSelectedGenres((genres) => genres.filter((g) => g !== genre))
      : setSelectedGenres((genres) => [...genres, genre]);
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
          Select up to 3 to tell Spotify what genres you want to sample music
          from.
        </Text>
      </View>
      <ScrollView
        scrollEventThrottle={500}
        className="px-4 pb-[50px]"
        indicatorStyle="white"
      >
        <View className="flex flex-row flex-wrap gap-4">
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
      {displayButton() && (
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
