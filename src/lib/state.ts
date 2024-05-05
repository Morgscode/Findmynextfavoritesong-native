type TrackFeatures = {
    acousticness: null,
    danceability: null,
    energy: null,
    instrumentalness: null,
    key: null,
    liveness: null,
    loudness: null,
    mode: null,
    speechiness: null,
    tempo: null,
    valence: null,
}

type AppState = {
    isLoggedIn: boolean;
    token: null | string;
    seedTrackID: null | string;
    seedArtistID: null | string;
    seedGenres: string[] | never[];
    trackFeatures: TrackFeatures;
}

export const state: AppState = {
      isLoggedIn: false,
      token: null,
      seedTrackID: null,
      seedArtistID: null,
      seedGenres: [],
      trackFeatures: {
        acousticness: null,
        danceability: null,
        energy: null,
        instrumentalness: null,
        key: null,
        liveness: null,
        loudness: null,
        mode: null,
        speechiness: null,
        tempo: null,
        valence: null,
    },
};