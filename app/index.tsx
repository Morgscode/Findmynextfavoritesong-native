import React from "react";
import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import * as Linking from "expo-linking";
import { getSpotifyAuthUrl } from "@src/lib/spotify";
import { useAuthContext } from "@src/context/AuthContext";

export default function App() {
  const { state, dispatch } = useAuthContext();

  const url = Linking.useURL();

  if (url && !state.isLoggedIn) {
    const { hash } = new URL(url);
    if (hash && hash.startsWith("#access_token")) {
      dispatch({ type: "SET_TOKEN", payload: hash });
      dispatch({ type: "LOGIN" });
    }
  }

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
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-gray-400 text-center p-8">
        Find my next favorite song lets you sample music from over 100 genres
        based on your current top tracks, your own personal taste and mood.
      </Text>
      {action()}
    </View>
  );
}
