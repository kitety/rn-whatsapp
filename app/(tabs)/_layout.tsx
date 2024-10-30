import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '~/constants/colors';

const Layout = () => {
  return (
    <GestureHandlerRootView className="flex-1">
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.background },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveBackgroundColor: colors.background,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
        }}>
        <Tabs.Screen
          name="update"
          options={{
            title: 'Updates',
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons color={color} name="update" size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="calls"
          options={{
            title: 'Calls',
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons color={color} name="phone-outline" size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="communities"
          options={{
            title: 'Communities',
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons color={color} name="people" size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            title: 'Chats',
            tabBarIcon: ({ size, color }) => (
              <Ionicons color={color} name="chatbubbles" size={size} />
            ),
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.background,
              // display: segments?.[2] === '[id]' ? 'none' : 'flex',
            },
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            title: 'Settings',
            tabBarIcon: ({ size, color }) => <Ionicons color={color} name="cog" size={size} />,
            headerShown: false,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default Layout;
