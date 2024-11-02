import { Ionicons } from '@expo/vector-icons';
import { Href, Link, Stack } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
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
          headerStyle: { backgroundColor: '#fff' },
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
              <Link asChild href={'/(modals)/new-chat' as Href<string>}>
                <TouchableOpacity>
                  <Ionicons color={colors.primary} name="add-circle" size={30} />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
