import { format } from 'date-fns';
import { Href, Link } from 'expo-router';
import React, { FC } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import colors from '~/constants/colors';
import AppleStyleSwipeableRow from './appleStyleSwipeableRow';

export interface IChatItem {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}
interface IChatRowProps {
  chat: IChatItem;
}
const ChatRow: FC<IChatRowProps> = ({ chat }) => {
  return (
    <AppleStyleSwipeableRow>
      <Link asChild href={`/(tabs)/chats/${chat.id}` as Href<string>}>
        <TouchableHighlight activeOpacity={0.8} underlayColor={colors.lightGray}>
          <View className="flex-row items-center gap-4 px-5 py-2.5">
            <Image className="h-12 w-12 rounded-full" source={{ uri: chat.img }} />
            <View className="flex-1">
              <Text className="text-lg font-bold">{chat.from}</Text>
              <Text className="line-clamp-1 truncate text-base text-gray">{chat.msg}</Text>
            </View>
            <Text className="self-start text-gray">{format(new Date(chat.date), 'MM.dd.yy')}</Text>
          </View>
        </TouchableHighlight>
      </Link>
    </AppleStyleSwipeableRow>
  );
};

export default ChatRow;
