type TrackFeatures = {
    acousticness: null | number,
    danceability: null | number,
    energy: null | number,
    instrumentalness: null | number,
    key: null | number,
    liveness: null | number,
    loudness: null | number,
    mode: null | number,
    speechiness: null | number,
    tempo: null | number,
    valence: null | number,
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