import React, { useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { Link, usePathname } from "expo-router";
import { useAuthContext } from "@src/context/AuthContext";
import { useTrackContext } from "@src/context/TrackContext";
import { useSampleContext } from "@src/context/SampleConext";
import { getSpotifyAuthUrl } from "@src/lib/spotify";

type Route =
  | "/"
  | "/spotify-tracks"
  | "/track-features"
  | "/track-features/[id]"
  | "/genres"
  | "/recommendations";

type IdParam = Record<"id", string>;

type RouteParam = IdParam;

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

type Direction = "prev" | "next";

export default function AppNav() {
  const [nextAction, setNextAction] = useState<NavRoute>("/");
  const [prevAction, setBackAction] = useState<NavRoute>("/");
  const { state: authState } = useAuthContext();
  const { state: trackState } = useTrackContext();
  // eslint-disable-next-line
  const { state: sampleState } = useSampleContext();
  const path = usePathname();

  const NAV_ACTIONS: NavActions = {
    "/": {
      next: authState.isLoggedIn
        ? "/spotify-tracks"
        : (getSpotifyAuthUrl() as Route),
      prev: "/",
    },
    "/spotify-tracks": {
      next:
        sampleState.tracks.length && trackState.track
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
    "/recommendations": {
      next: "/spotify-tracks",
      prev: "/genres",
    },
  };

  const getAction = (route: string, direction: Direction) =>
    NAV_ACTIONS[route][direction];

  useEffect(() => {
    try {
      setNextAction(getAction(path, "next"));
      setBackAction(getAction(path, "prev"));
    } catch (error) {
      setNextAction("/");
      setBackAction("/");
    }
  }, [trackState.track, path, authState.isLoggedIn, sampleState.tracks]);

  return (
    <View className="bg-[#191414] flex flex-row items-center justify-between pb-6 px-6 pt-3">
      <Link href="/" asChild>
        <Pressable className="border-solid border-2 border-gray-400 p-2 rounded-lg">
          <Text className="text-gray-400">Home</Text>
        </Pressable>
      </Link>
      <Link href={prevAction} asChild>
        <Pressable className="border-solid border-2 border-gray-400 p-2 rounded-lg">
          <Text className="text-gray-400">Back</Text>
        </Pressable>
      </Link>
      <Link href={nextAction} asChild>
        <Pressable className="border-solid border-2 border-gray-400 p-2 rounded-lg">
          <Text className="text-gray-400">Next</Text>
        </Pressable>
      </Link>
    </View>
  );
}
