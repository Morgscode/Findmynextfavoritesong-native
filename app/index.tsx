import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import AppView from "@src/components/AppView";
import AppLinkButton from '@src/components/AppLinkButton';
import { getSpotifyAuthUrl } from '@src/lib/auth';
import { state } from '@src/lib/state';

export default function App() { 

  const link = () => {
    if (!state.isLoggedIn) {
      return (
        <AppLinkButton href={getSpotifyAuthUrl()}>Authorise with Spotify</AppLinkButton>
      )
    }
    return (<AppLinkButton href="/spotify-tracks">Browse my spotify tracks</AppLinkButton>)
  }
  
  return (
    <AppView>
      <Text className="text-gray-400 text-center p-4">
        Find my next favorite song lets you sample music 
        from over 100 genres based on your current top tracks, 
        your own personal taste and mood.
      </Text>
      {link()}
      <StatusBar />
    </AppView>
  );
}
