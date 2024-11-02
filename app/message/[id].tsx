import { Ionicons } from '@expo/vector-icons';
import { useReactive } from 'ahooks';
import { useCallback, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import messageData from '~/assets/data/messages.json';
import ChatMessageBox from '~/components/chatMessageBox';
import ReplyMessageBar from '~/components/replyMessageBar';
import colors from '~/constants/colors';

const getInitialMessages = (): IMessage[] => [
  ...messageData.map((message) => {
    return {
      _id: message.id,
      text: message.msg,
      createdAt: new Date(message.date),
      user: {
        _id: message.from,
        name: message.from ? 'You' : 'Bob',
      },
    };
  }),
  {
    _id: 0,
    system: true,
    text: 'All your base are belong to us',
    createdAt: new Date(),
    user: {
      _id: 0,
      name: 'Bot',
    },
  },
];
function ChatPage() {
  const insets = useSafeAreaInsets();
  const swipeableRowRef = useRef<Swipeable | null>(null);
  const oldSwipeableRowRef = useRef<Swipeable | null>(null);

  const state = useReactive<{
    messages: IMessage[];
    replyMessage: IMessage | null;
    text: string;
  }>({
    messages: getInitialMessages(),
    text: '',
    replyMessage: null,
  });

  const updateRowRef = useCallback(
    (currentRef: any) => {
      const newRefid = currentRef?.props?.children?.props?.currentMessage?._id;

      if (newRefid === state.replyMessage?._id) {
        // 需要先关掉旧的
        swipeableRowRef.current?.close?.();
        swipeableRowRef.current = currentRef;
      }
    },
    [state.replyMessage]
  );
  useEffect(() => {
    if (state.replyMessage && swipeableRowRef.current) {
      // swipeableRowRef.current.close();
      // swipeableRowRef.current = null;
    }
  }, [state.replyMessage]);

  const onSend = (messages: IMessage[]) => {
    state.messages = GiftedChat.append(state.messages, messages);
  };
  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: colors.background }}
        renderActions={() => (
          <View className="left-1 h-11 items-center justify-center">
            <Ionicons color={colors.primary} name="add" size={28} />
          </View>
        )}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom : 0} // 修改2: 考虑底部安全区域
      style={{
        marginBottom: insets.bottom,
      }}>
      <GiftedChat
        maxComposerHeight={100}
        messages={state.messages}
        renderAvatar={null}
        renderInputToolbar={renderInputToolbar}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: '#000',
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: '#fff',
                },
                right: {
                  backgroundColor: colors.lightGreen,
                },
              }}
            />
          );
        }}
        renderChatFooter={() => (
          <ReplyMessageBar
            clearReply={() => (state.replyMessage = null)}
            message={state.replyMessage}
          />
        )}
        renderMessage={(props) => (
          <ChatMessageBox
            {...props}
            updateRowRef={updateRowRef}
            setReplyOnSwipeOpen={(message) => {
              state.replyMessage = message;
            }}
          />
        )}
        renderSend={(props) => {
          return (
            <View className="h-11 flex-row items-center justify-center gap-4 px-4">
              {state.text.length > 0 ? (
                <Send {...props} containerStyle={{ justifyContent: 'center' }}>
                  <Ionicons color={colors.primary} name="send" size={28} />
                </Send>
              ) : (
                <>
                  <Ionicons color={colors.primary} name="camera-outline" size={28} />
                  <Ionicons color={colors.primary} name="mic-outline" size={28} />
                </>
              )}
            </View>
          );
        }}
        renderSystemMessage={(props) => (
          <SystemMessage {...props} textStyle={{ color: colors.gray }} />
        )}
        textInputProps={{
          backgroundColor: '#fff',
          borderRadius: 15,
          borderWidth: 1,
          borderColor: colors.lightGray,
          paddingHorizontal: 10,
          paddingTop: 3,
          fontSize: 16,
          marginVertical: 4,
        }}
        user={{
          _id: 1,
        }}
        onSend={(messages) => onSend(messages)}
        onInputTextChanged={(text) => {
          state.text = text;
        }}
      />
    </KeyboardAvoidingView>
  );
}

export default ChatPage;
