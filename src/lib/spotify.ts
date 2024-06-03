import * as Linking from "expo-linking";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=<<<CLIENT_ID>>>&redirect_uri=<<<REDIRECT_URI>>>&scope=<<<SCOPES>>>&response_type=token";
const AUTH_SCOPES =
  "user-read-email%20user-top-read%20user-library-read%20user-library-modify";
const BASE_URL = "https://api.spotify.com/v1";
const TRACKS_ENDPOINT = "/me/top/tracks";

export type SpotifyTrack = {
  title: string;
};

export function getSpotifyAuthUrl() {
  const appReturnUrl = Linking.createURL("/");

  return AUTH_URL.replace(
    "<<<CLIENT_ID>>>",
    process.env.EXPO_PUBLIC_CLIENT_ID ?? "client id not set",
  )
    .replace("<<<REDIRECT_URI>>>", appReturnUrl)
    .replace("<<<SCOPES>>>", AUTH_SCOPES);
}

export async function getTopTracks(token: string) {
  try {
    const response = await fetch(`${BASE_URL}${TRACKS_ENDPOINT}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return (await response.json()) as Array<SpotifyTrack>;
  } catch (error) {
    console.error(error);
    return [];
  }
}