import React, { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import { Link, usePathname } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
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
  const [, setNextAction] = useState<NavRoute>("/");
  const [, setBackAction] = useState<NavRoute>("/");
  const { state: authState } = useAuthContext();
  const { state: trackState } = useTrackContext();
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
      prev:
        sampleState.tracks.length && trackState.track
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
        <Pressable className="p-2">
          <FontAwesome5 name="home" size={24} color="white" />
        </Pressable>
      </Link>
      <Link href="/spotify-tracks" asChild>
        <Pressable className="p-2">
          <FontAwesome5 name="list-alt" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}
