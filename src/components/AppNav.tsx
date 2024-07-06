import React from "react";
import { View, Pressable } from "react-native";
import { Link } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function AppNav() {
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
