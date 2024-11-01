import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import colors from '~/constants/colors';

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Calls',
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerBlurEffect: 'regular',
          headerStyle: { backgroundColor: colors.background },
          headerSearchBarOptions: {
            placeholder: 'Search',
          },
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons color={colors.primary} name="call-outline" size={26} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
