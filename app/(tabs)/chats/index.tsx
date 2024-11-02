import { FlatList, ScrollView, View } from 'react-native';
import chats from '~/assets/data/chats.json';
import ChatRow from '~/components/chatRow';

const Page = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20, backgroundColor: '#fff' }}
      contentInsetAdjustmentBehavior="automatic">
      <FlatList
        data={chats}
        ItemSeparatorComponent={() => <View className="ml-24 h-hairline bg-lightGray" />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatRow chat={item} />}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default Page;
