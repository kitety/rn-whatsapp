import { Ionicons } from '@expo/vector-icons';
import { useReactive } from 'ahooks';
import clsx from 'clsx';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { CurvedTransition, FadeInUp, FadeOutUp } from 'react-native-reanimated';
import items from '~/assets/data/calls.json';
import { SegmentedControl } from '~/components/segmentedControl';
import SwipeableRow from '~/components/swipeableRow';
import colors from '~/constants/colors';

const transition = CurvedTransition.delay(100);

const Page = () => {
  const state = useReactive({
    isEditing: false,
    items: items,
    selectedOption: 'All',
  });
  const onEdit = () => {
    state.isEditing = !state.isEditing;
  };
  const setSelectedOption = (option: string) => {
    state.selectedOption = option;
  };
  useEffect(() => {
    if (state.selectedOption === 'Missed') {
      state.items = items.filter((item) => item.missed);
    } else {
      state.items = items;
    }
  }, [state.selectedOption, state]);
  const onRemoveCall = (item: (typeof items)[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    state.items = state.items.filter((i) => i.id !== item.id);
  };

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={['All', 'Missed']}
              selectedOption={state.selectedOption}
              onOptionPress={setSelectedOption}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text className="text-xl text-primary">{state.isEditing ? 'Done' : 'Edit'}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        contentInsetAdjustmentBehavior="automatic">
        <Animated.View className="mx-4 mt-3 rounded-xl bg-white" layout={transition}>
          <Animated.FlatList
            // skipEnteringExitingAnimations
            data={state.items}
            itemLayoutAnimation={transition}
            ItemSeparatorComponent={() => <View className="ml-10 h-hairline bg-lightGray" />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <SwipeableRow
                onDelete={() => {
                  onRemoveCall(item);
                }}>
                <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
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
                      <Ionicons
                        color={colors.primary}
                        name="information-circle-outline"
                        size={24}
                      />
                    </View>
                  </View>
                </Animated.View>
              </SwipeableRow>
            )}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Page;
