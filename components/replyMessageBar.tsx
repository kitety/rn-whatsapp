import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import colors from '~/constants/colors';

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: IMessage | null;
};

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
  return (
    <>
      {message && (
        <Animated.View
          className={'h-[50px] flex-row bg-[#E4E9EB]'}
          entering={FadeInDown}
          exiting={FadeOutDown}>
          <View className="h-[50px] w-1.5 bg-[#89BC0C]" />
          <View className="w-8 flex-1">
            <Text className="pl-2.5 pt-[5px] text-base font-semibold text-[#89BC0C]">
              {message?.user.name}
            </Text>
            <Text className="line-clamp-1 truncate px-2.5 pt-1 text-gray" numberOfLines={1}>
              {message?.text}
            </Text>
          </View>
          <View className="items-end justify-center pr-2.5">
            <TouchableOpacity onPress={clearReply}>
              <Ionicons color={colors.primary} name="close-circle-outline" size={28} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default ReplyMessageBar;
