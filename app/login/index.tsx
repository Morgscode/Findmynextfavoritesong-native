import { Text, View } from "react-native";
import { router } from "expo-router";
import * as Linking from "expo-linking";

export default function Login() {
    const url = Linking.useURL();
    
    if (!url) {
        return router.replace('/');
    }

    const { queryParams } = Linking.parse(url);

    return (
        <View className="bg-gray-900 flex-1 items-center justify-center"></View>
    )

}