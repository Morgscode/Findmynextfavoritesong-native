import React, { useEffect } from "react";
import { Text, SafeAreaView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import * as Linking from "expo-linking";
import { getSpotifyAuthUrl } from "@src/lib/spotify";
import { useAuthContext } from "@src/context/AuthContext";

export default function App() {
  const { state, dispatch } = useAuthContext();
  const url = Linking.useURL();

  useEffect(() => {
    if (url && !state.isLoggedIn) {
      const { hash } = new URL(url);
      if (hash && hash.startsWith("#access_token")) {
        dispatch({ type: "SET_TOKEN", payload: hash });
        dispatch({ type: "LOGIN" });
      }
    }
  }, [url]);

  const action = () => {
    if (!state.isLoggedIn) {
      return (
        <Link href={getSpotifyAuthUrl()} asChild>
          <Pressable className="border-solid border-2 border-gray-400 p-4 rounded-lg">
            <Text className="text-gray-400">Authorise with Spotify</Text>
          </Pressable>
        </Link>
      );
    }
    return (
      <Link href="/spotify-tracks" asChild>
        <Pressable className="border-solid border-2 border-gray-400 p-4 rounded-lg">
          <Text className="text-gray-400">Sample Music</Text>
        </Pressable>
      </Link>
    );
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#191414]">
      <Text className="text-gray-400 text-center text-2xl p-8 mb-4">
        Find my next favorite song lets you sample music from over 100 genres
        based on your current top tracks, your own personal taste and mood.
      </Text>
      {action()}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
