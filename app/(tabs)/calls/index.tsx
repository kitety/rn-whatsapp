import { Ionicons } from '@expo/vector-icons';
import { useReactive } from 'ahooks';
import clsx from 'clsx';
import { format } from 'date-fns';
import { Stack } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import items from '~/assets/data/calls.json';
import colors from '~/constants/colors';

const Page = () => {
  const state = useReactive({
    isEditing: false,
    items: items,
  });
  console.log('state.items', state.items);
  const onEdit = () => {
    state.isEditing = !state.isEditing;
  };
  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text
                className={clsx('text-xl text-primary', {
                  'text-red': state.isEditing,
                })}>
                {state.isEditing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        contentInsetAdjustmentBehavior="automatic">
        <View className="mx-4 mt-3 rounded-xl bg-white">
          <FlatList
            data={state.items}
            ItemSeparatorComponent={() => <View className="ml-10 h-hairline bg-lightGray" />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="flex-row items-center gap-2.5 p-2.5">
                <Image className="h-10 w-10 rounded-full" source={{ uri: item.img }} />
                <View className="flex-1 gap-0.5">
                  <Text className={clsx('text-lg', item.missed ? 'text-red' : 'text-black')}>
                    {item.name}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <Ionicons
                      color={colors.gray}
                      name={item.video ? 'videocam' : 'call'}
                      size={16}
                    />
                    <Text className="flex-1 text-gray">
                      {item.incoming ? 'Incoming' : 'Outgoing'}
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-gray">{format(item.date, 'MM.dd.yy')}</Text>
                  <Ionicons color={colors.primary} name="information-circle-outline" size={24} />
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;
