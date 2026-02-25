import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AlertProvider } from '@/template';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../contexts/AppContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasSplashed } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth' || segments[0] === 'splash';

    if (!hasSplashed) {
      // Show splash/onboarding first
      if (segments[0] !== 'splash') {
        router.replace('/splash');
      }
    } else if (!isAuthenticated) {
      // Not logged in, show auth
      if (segments[0] !== 'auth') {
        router.replace('/auth');
      }
    } else {
      // Logged in, redirect away from auth screens
      if (inAuthGroup) {
        router.replace('/onboarding');
      }
    }
  }, [isAuthenticated, hasSplashed, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <AppProvider>
            <StatusBar style="light" />
            <AuthGate>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="splash" options={{ animation: 'fade' }} />
                <Stack.Screen name="auth" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="event/[id]" options={{ animation: 'slide_from_right', gestureEnabled: true }} />
                <Stack.Screen name="org/[id]" options={{ animation: 'slide_from_right', gestureEnabled: true }} />
                <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
                <Stack.Screen name="notifications" options={{ animation: 'slide_from_right', gestureEnabled: true }} />
                <Stack.Screen name="settings" options={{ animation: 'slide_from_right', gestureEnabled: true }} />
                <Stack.Screen name="passport" options={{ animation: 'slide_from_right', gestureEnabled: true }} />
                <Stack.Screen name="command-center" options={{ animation: 'slide_from_right', gestureEnabled: true }} />
                <Stack.Screen name="team-lobby" options={{ animation: 'slide_from_bottom', gestureEnabled: true }} />
                <Stack.Screen name="story-viewer" options={{ animation: 'fade', gestureEnabled: true, presentation: 'fullScreenModal' }} />
              </Stack>
            </AuthGate>
          </AppProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
