import { Slot } from 'expo-router';
import * as Linking from "expo-linking";
import { StatusBar } from 'expo-status-bar';
import { login } from "@src/lib/auth";
import { state } from "@src/lib/state";

export default function Layout() {
    const url = Linking.useURL();
    if (url && !state.isLoggedIn) {
        const { host, hash } = new URL(url);
        if (hash) {
            login(hash);
        }
    }
    return (
    <>
    <Slot />
    <StatusBar />
    </>
    );
}