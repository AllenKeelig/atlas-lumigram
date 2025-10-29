import React from 'react';
import { Button, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';

export function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login'); // Go back to login or home screen
    } catch (error: any) {
      Alert.alert('Logout failed', error.message);
    }
  };

  return <Button title="Logout" onPress={handleLogout} />;
}
