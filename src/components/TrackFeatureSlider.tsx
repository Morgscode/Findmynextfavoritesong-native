import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { TRACK_FEATURES_INFO } from "@src/lib/spotify";

type TrackFeatureSliderProps = {
  featureName: string;
  featureValue: number;
  updateFn(name: string, value: number): void;
};

export default function TrackFeatureSlider({
  featureName,
  featureValue,
  updateFn,
}: TrackFeatureSliderProps) {
  const info = TRACK_FEATURES_INFO[featureName];
  return (
    <View className="mb-4">
      <Text className="text-xl text-gray-400 mb-4">
        {info.name} - {featureValue.toFixed(3)}
      </Text>
      <Text className="text-gray-400 mb-4">{info.description}</Text>
      <Slider
        value={featureValue}
        step={info.step}
        minimumValue={info.min}
        maximumValue={info.max}
        onValueChange={(value) => updateFn(featureName, value)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        style={{ width: "100%", height: 40 }}
      />
    </View>
  );
}
