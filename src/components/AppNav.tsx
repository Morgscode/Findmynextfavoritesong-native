import React, { useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { Link, usePathname } from "expo-router";
import { useAuthContext } from "@src/context/AuthContext";
import { useTrackContext } from "@src/context/TrackContext";
import { getSpotifyAuthUrl } from "@src/lib/spotify";

type Route = "/" | "/spotify-tracks" | "/track-features";

type DynamicRoute = {
  pathname: string;
  params: Record<string, string | number>;
};

type NavRoute = Route | DynamicRoute | string;

type NavAction = {
  next: NavRoute;
  back: NavRoute;
};

type NavActions = {
  [key: string]: NavAction;
};

export default function AppNav() {
  const [nextAction, setNextAction] = useState<NavRoute>("/");
  const [backAction, setBackAction] = useState<NavRoute>("/");
  const { state: authState } = useAuthContext();
  const { state: trackState } = useTrackContext();
  const path = usePathname();

  const NAV_ACTIONS: NavActions = {
    "/": {
      next: authState.isLoggedIn ? "/spotify-tracks" : getSpotifyAuthUrl(),
      back: "/",
    },
    "/spotify-tracks": {
      next: trackState.track
        ? {
            pathname: "/track-features/[id]",
            params: { id: trackState.track.id },
          }
        : "/",
      back: "/",
    },
    [`/track-features/${trackState.track?.id}`]: {
      next: "/",
      back: "/spotify-tracks",
    },
  };

  type Direction = "back" | "next";

  const getAction = (route: string, direction: Direction) =>
    NAV_ACTIONS[route][direction];

  useEffect(() => {
    setNextAction(getAction(path, "next"));
    setBackAction(getAction(path, "back"));
  }, [trackState.track, path, authState.isLoggedIn]);

  return (
    <View className="bg-[#191414]/95 flex flex-row items-center justify-between p-8">
      <Link href="/" asChild>
        <Pressable>
          <Text className="text-gray-400">Home</Text>
        </Pressable>
      </Link>
      <Link href={backAction} asChild>
        <Pressable>
          <Text className="text-gray-400">Back Action</Text>
        </Pressable>
      </Link>
      <Link href={nextAction} asChild>
        <Pressable>
          <Text className="text-gray-400">Next Action</Text>
        </Pressable>
      </Link>
    </View>
  );
}
