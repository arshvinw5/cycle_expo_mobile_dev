import { Redirect, Stack, usePathname, useRouter } from 'expo-router';
import { useAuth } from '~/providers/AuthProvider';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  //The user is redirected to / home if authenticated.
  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
