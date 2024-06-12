import * as Linking from "expo-linking";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=<<<CLIENT_ID>>>&redirect_uri=<<<REDIRECT_URI>>>&scope=<<<SCOPES>>>&response_type=token";
const AUTH_SCOPES =
  "user-read-email%20user-top-read%20user-library-read%20user-library-modify";
const BASE_URL = "https://api.spotify.com/v1";
const TRACKS_ENDPOINT = "/me/top/tracks";
const TRACK_FEATURES_ENDPOINT = "/audio-features";

type SpotifyImage = {
  height: number;
  width: number;
  url: string;
};

type Album = {
  "album type": string;
  artists: Array<Artist>;
  "available markets": Array<string>;
  "external urls": Record<string, string>;
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  name: string;
  "release date": string;
  "release day precision": string;
  "total tracks": number;
  type: string;
  uri: string;
};

type Artist = {
  "external urls": Record<string, string>;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type SpotifyTrack = {
  album: Album;
  artists: Array<Artist>;
  "available markets": Array<string>;
  "duration ms": number;
  "disc number": number;
  "external urls": Record<string, string>;
  "external ids": Record<string, string>;
  explicit: boolean;
  href: string;
  id: string;
  "is local": boolean;
  name: string;
  popularity: number;
  preview_url: string;
  "track number": number;
  type: string;
  uri: string;
};

export type TrackFeatures = {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  valence: number;
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

export async function getTopTracks(token: string, url: string | null = null) {
  try {
    const response = await fetch(url ?? `${BASE_URL}${TRACKS_ENDPOINT}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();
    return {
      tracks: body?.items as Array<SpotifyTrack>,
      next: (body?.next as string) || null,
    };
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return {
      tracks: [],
      next: null,
    };
  }
}

export async function getTrackFeatures(token: string, id: string) {
  try {
    const response = await fetch(
      `${BASE_URL}${TRACK_FEATURES_ENDPOINT}/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return (await response.json()) as TrackFeatures;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return {};
  }
}
