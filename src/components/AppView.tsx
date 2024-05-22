import { PropsWithChildren } from "react";
import { View } from "react-native";

export default function AppView({children}: PropsWithChildren) {
    return (
        <View className="flex-1 items-center justify-center bg-gray-900">
            {children}
        </View>
      );
}