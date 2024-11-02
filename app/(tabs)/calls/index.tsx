import { Ionicons } from '@expo/vector-icons';
import { useReactive } from 'ahooks';
import clsx from 'clsx';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import items from '~/assets/data/calls.json';
import { SegmentedControl } from '~/components/segmentedControl';
import SwipeableRow from '~/components/swipeableRow';
import colors from '~/constants/colors';

const transition = CurvedTransition.delay(100);

const AnimatedTouchOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
  const editing = useSharedValue(-30);
  const state = useReactive({
    isEditing: false,
    items: items,
    selectedOption: 'All',
  });
  useEffect(() => {
    if (state.selectedOption === 'Missed') {
      state.items = items.filter((item) => item.missed);
    } else {
      state.items = items;
    }
  }, [state.selectedOption, state]);

  const animatedRowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));

  const onEdit = () => {
    state.isEditing = !state.isEditing;
    editing.value = state.isEditing ? 0 : -30;
  };
  const setSelectedOption = (option: string) => {
    state.selectedOption = option;
  };
  const onRemoveCall = (item: (typeof items)[0]) => {
    // 震动反馈
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
                <Animated.View
                  className={'flex-row items-center'}
                  entering={FadeInUp}
                  exiting={FadeOutUp}>
                  {/* icon */}
                  <AnimatedTouchOpacity
                    className={'pl-2'}
                    style={animatedRowStyle}
                    onPress={() => onRemoveCall(item)}>
                    <Ionicons color={colors.red} name="remove-circle" size={24} />
                  </AnimatedTouchOpacity>

                  <Animated.View
                    className="flex-row items-center gap-2.5 p-2.5"
                    style={animatedRowStyle}>
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
                  </Animated.View>
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
