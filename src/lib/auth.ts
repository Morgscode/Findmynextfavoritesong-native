import * as Linking from "expo-linking";

let stuff: string;

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=<<<CLIENT_ID>>>&redirect_uri=<<<REDIRECT_URI>>>&scope=<<<SCOPES>>>&response_type=token";
const AUTH_SCOPES =
  "user-read-email%20user-top-read%20user-library-read%20user-library-modify";

export function getSpotifyAuthUrl() {
  const appReturnUrl = Linking.createURL("/");

  return AUTH_URL.replace(
    "<<<CLIENT_ID>>>",
    process.env.EXPO_PUBLIC_CLIENT_ID ?? "client id not set",
  )
    .replace("<<<REDIRECT_URI>>>", appReturnUrl)
    .replace("<<<SCOPES>>>", AUTH_SCOPES);
}
