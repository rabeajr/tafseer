import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useRouter, useSegments } from 'expo-router';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('@expo-google-fonts/poppins/Poppins_400Regular.ttf'),
    'Poppins-Medium': require('@expo-google-fonts/poppins/Poppins_500Medium.ttf'),
    'Poppins-SemiBold': require('@expo-google-fonts/poppins/Poppins_600SemiBold.ttf'),
    'Poppins-Bold': require('@expo-google-fonts/poppins/Poppins_700Bold.ttf'),
  });

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!mounted) return;

      // If no session and trying to access protected route, redirect to login
      if (!session && segments[0] === '(tabs)') {
        router.replace('/login');
      }
      // If session and on auth route, redirect to home
      if (session && (segments[0] === 'login' || segments[0] === 'signup' || segments[0] === 'forgot-password')) {
        router.replace('/(tabs)');
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_IN' && (segments[0] === 'login' || segments[0] === 'signup')) {
        router.replace('/(tabs)');
      }
      if (event === 'SIGNED_OUT') {
        router.replace('/login');
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [segments]);

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}