import '../global.css';

import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import colors from '~/constants/colors';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.log('err', err);
    }
  },
};

const InitialLayout = () => {
  const router = useRouter();
  const segement = useSegments();
  const { isLoaded, isSignedIn } = useAuth();
  console.log('segement,isSignedIn', segement, isSignedIn);

  useEffect(() => {
    if (!isLoaded) return;
    const isTabGroup = segement?.[0] === '(tabs)' || segement?.[0] === 'message';
    if (isSignedIn && !isTabGroup) {
      router.replace('/(tabs)/chats');
    } else {
    }
  }, [isLoaded, isSignedIn, router, segement]);

  if (!isLoaded) return <View />;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="otp"
        options={{ headerTitle: 'Enter Your Phone Number', headerBackVisible: false }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerTitle: 'Verify Code',
          headerBackTitle: 'Edit Number',
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/new-chat"
        options={{
          presentation: 'modal',
          title: 'New Chat',
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerSearchBarOptions: {
            placeholder: 'Search name or number',
            hideWhenScrolling: false,
          },
          headerRight: () => (
            <Link asChild href={'/(tabs)/chats'}>
              <TouchableOpacity
                style={{ backgroundColor: colors.lightGray, borderRadius: 20, padding: 4 }}>
                <Ionicons color={colors.gray} name="close" size={30} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="message/[id]"
        options={{
          headerBackTitleVisible: false,
          title: '',
          headerTitle: () => (
            <View className="flex-row items-center gap-2.5 pb-1">
              <Image
                className="h-10 w-10 rounded-full"
                source={{
                  uri: 'https://pbs.twimg.com/profile_images/1564203599747600385/f6Lvcpcu_400x400.jpg',
                }}
              />
              <Text className="text-base font-normal">John Doe</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity>
                <Ionicons color={colors.primary} name="videocam-outline" size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons color={colors.primary} name="call-outline" size={30} />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
