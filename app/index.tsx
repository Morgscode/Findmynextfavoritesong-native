import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
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
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-gray-400 text-center p-4">
        Find my next favorite song lets you sample music 
        from over 100 genres based on your current top tracks, 
        your own personal taste and mood.
      </Text>
      {link()}
      <StatusBar />
    </View>
  );
}
