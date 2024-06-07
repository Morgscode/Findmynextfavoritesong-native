import React, { useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { useAuthContext } from "@src/context/AuthContext";
import { getSpotifyAuthUrl } from "@src/lib/spotify";

export default function AppNav() {
  const [actionUrl, setActionUrl] = useState<string>(getSpotifyAuthUrl());
  const { state } = useAuthContext();

  useEffect(() => {
    setActionUrl(state.isLoggedIn ? "/spotify-tracks" : getSpotifyAuthUrl());
  }, [state.isLoggedIn]);

  return (
    <View className="bg-[#191414]/95 flex flex-row items-center justify-evenly p-8">
      <Link href="/" asChild>
        <Pressable>
          <Text className="text-gray-400">Home</Text>
        </Pressable>
      </Link>
      <Link href={`${actionUrl}`} asChild>
        <Pressable className="ml-auto">
          <Text className="text-gray-400">Action</Text>
        </Pressable>
      </Link>
    </View>
  );
}
