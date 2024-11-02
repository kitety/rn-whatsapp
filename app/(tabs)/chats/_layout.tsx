import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import colors from '~/constants/colors';

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Chats',
          headerLargeTitle: true,
          headerBlurEffect: 'regular',
          headerTransparent: true,
          // headerStyle: { backgroundColor: colors.background },
          headerSearchBarOptions: {
            placeholder: 'Search',
          },
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons
                color={colors.primary}
                name="ellipsis-horizontal-circle-outline"
                size={30}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity>
                <Ionicons color={colors.primary} name="camera-outline" size={30} />
              </TouchableOpacity>
              <Link asChild href="/(modals)/new-chat">
                <TouchableOpacity>
                  <Ionicons color={colors.primary} name="add-circle" size={30} />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
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

export default SettingsLayout;
