import React, { useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { Link, usePathname } from "expo-router";
import { useAuthContext } from "@src/context/AuthContext";
import { useTrackContext } from "@src/context/TrackContext";
import { getSpotifyAuthUrl } from "@src/lib/spotify";

type Route =
  | "/"
  | "/spotify-tracks"
  | "/track-features"
  | "/track-features/[id]"
  | "/genres"
  | "/recommendations";

type TrackIdParam = Record<"id", string>;

type RouteParam = TrackIdParam;

type DynamicRoute = {
  pathname: Route;
  params: RouteParam;
};

type NavRoute = Route | DynamicRoute;

type NavAction = {
  next: NavRoute;
  prev: NavRoute;
};

type NavActions = {
  [key: string]: NavAction;
};

export default function AppNav() {
  const [nextAction, setNextAction] = useState<NavRoute>("/");
  const [prevAction, setBackAction] = useState<NavRoute>("/");
  const { state: authState } = useAuthContext();
  const { state: trackState } = useTrackContext();
  const path = usePathname();

  const NAV_ACTIONS: NavActions = {
    "/": {
      next: authState.isLoggedIn
        ? "/spotify-tracks"
        : (getSpotifyAuthUrl() as Route),
      prev: "/",
    },
    "/spotify-tracks": {
      next: trackState.track
        ? {
            pathname: "/track-features/[id]",
            params: { id: trackState.track.id },
          }
        : "/",
      prev: "/",
    },
    [`/track-features/${trackState.track?.id}`]: {
      next: "/genres",
      prev: "/spotify-tracks",
    },
    "/genres": {
      next: "/recommendations",
      prev: trackState.track
        ? {
            pathname: "/track-features/[id]",
            params: { id: trackState.track.id },
          }
        : "/spotify-tracks",
    },
  };

  type Direction = "prev" | "next";

  const getAction = (route: string, direction: Direction) =>
    NAV_ACTIONS[route][direction];

  useEffect(() => {
    setNextAction(getAction(path, "next"));
    setBackAction(getAction(path, "prev"));
  }, [trackState.track, path, authState.isLoggedIn]);

  return (
    <View className="bg-[#191414]/95 flex flex-row items-center justify-between p-6">
      <Link href="/" asChild>
        <Pressable className="border-solid border-2 border-gray-400 p-1 rounded-lg">
          <Text className="text-gray-400">Home</Text>
        </Pressable>
      </Link>
      <Link href={prevAction} asChild>
        <Pressable className="border-solid border-2 border-gray-400 p-1 rounded-lg">
          <Text className="text-gray-400">Back Action</Text>
        </Pressable>
      </Link>
      <Link href={nextAction} asChild>
        <Pressable className="border-solid border-2 border-gray-400 p-1 rounded-lg">
          <Text className="text-gray-400">Next Action</Text>
        </Pressable>
      </Link>
    </View>
  );
}
