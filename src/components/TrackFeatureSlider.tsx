import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

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
  return (
    <View>
      <Text className="text-lg text-gray-400 mb-4">
        {featureName} - {featureValue.toFixed(3)}
      </Text>
      <Text className="text-gray-400 mb-4">
        A confidence measure from 0.0 to 1.0 of whether the track is acoustic.
        1.0 represents high confidence the track is acoustic.
      </Text>
      <Slider
        step={0.001}
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={(value) => updateFn(featureName, value)}
      />
    </View>
  );
}
