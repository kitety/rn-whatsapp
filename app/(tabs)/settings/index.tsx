import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BoxedIcon from '~/components/boxedIcon';
import colors from '~/constants/colors';
import { defaultStyles } from '~/constants/styles';

const Page = () => {
  const devices = [
    {
      name: 'Broadcast Lists',
      icon: 'megaphone',
      backgroundColor: colors.green,
    },
    {
      name: 'Starred Messages',
      icon: 'star',
      backgroundColor: colors.yellow,
    },
    {
      name: 'Linked Devices',
      icon: 'laptop-outline',
      backgroundColor: colors.green,
    },
  ];

  const items = [
    {
      name: 'Account',
      icon: 'key',
      backgroundColor: colors.primary,
    },
    {
      name: 'Privacy',
      icon: 'lock-closed',
      backgroundColor: '#33A5D1',
    },
    {
      name: 'Chats',
      icon: 'logo-whatsapp',
      backgroundColor: colors.green,
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      backgroundColor: colors.red,
    },
    {
      name: 'Storage and Data',
      icon: 'repeat',
      backgroundColor: colors.green,
    },
  ];

  const support = [
    {
      name: 'Help',
      icon: 'information',
      backgroundColor: colors.primary,
    },
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor: colors.red,
    },
  ];

  const { signOut } = useAuth();
  return (
    <View className="flex-1 bg-background">
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={defaultStyles.block}>
          <FlatList
            data={devices}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            keyExtractor={(item) => item.name}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon
                  backgroundColor={item.backgroundColor}
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                />
                <Text className="flex-1 text-lg">{item.name}</Text>
                <Ionicons color={colors.gray} name="chevron-forward" size={20} />
              </View>
            )}
          />
        </View>
        <View style={defaultStyles.block}>
          <FlatList
            data={items}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            keyExtractor={(item) => item.name}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon
                  backgroundColor={item.backgroundColor}
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                />
                <Text className="flex-1 text-lg">{item.name}</Text>
                <Ionicons color={colors.gray} name="chevron-forward" size={20} />
              </View>
            )}
          />
        </View>
        <View style={defaultStyles.block}>
          <FlatList
            data={support}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            keyExtractor={(item) => item.name}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon
                  backgroundColor={item.backgroundColor}
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                />
                <Text className="flex-1 text-lg">{item.name}</Text>
                <Ionicons color={colors.gray} name="chevron-forward" size={20} />
              </View>
            )}
          />
        </View>
        <TouchableOpacity onPress={() => signOut()}>
          <Text className="py-3 text-center text-lg text-primary">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Page;
