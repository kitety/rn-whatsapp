import { useReactive } from 'ahooks';
import { ImageBackground } from 'react-native';
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat';
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

  return (
    <ImageBackground
      className="flex-1 bg-background"
      source={require('~/assets/images/pattern.png')}
      style={{
        marginBottom: insets.bottom,
      }}>
      <GiftedChat
        messages={state.messages}
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
        user={{
          _id: 1,
        }}
        onSend={(messages) => onSend(messages)}
      />
    </ImageBackground>
  );
}

export default ChatPage;
