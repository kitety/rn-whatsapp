import { Ionicons } from '@expo/vector-icons';
import { useReactive } from 'ahooks';
import { ImageBackground, KeyboardAvoidingView, Platform, View } from 'react-native';
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
  console.log('insets.bottom', insets.bottom);

  const state = useReactive<{
    messages: IMessage[];
    text: string;
  }>({
    messages: getInitialMessages(),
    text: '',
  });

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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 修改1: 添加合适的behavior
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} // 修改2: 考虑底部安全区域
    >
      <ImageBackground
        className="flex-1 bg-background"
        source={require('~/assets/images/pattern.png')}
        style={{
          marginBottom: insets.bottom,
        }}>
        <GiftedChat
          bottomOffset={insets.bottom}
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
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default ChatPage;
