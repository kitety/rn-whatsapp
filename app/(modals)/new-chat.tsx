import { Image, Text, View } from 'react-native';
import { AlphabetList } from 'react-native-section-alphabet-list';
import contacts from '~/assets/data/contacts.json';
import colors from '~/constants/colors';

const NewChat = () => {
  const data = contacts.map((contact, index) => ({
    value: `${contact.first_name} ${contact.last_name}`,
    name: `${contact.first_name} ${contact.last_name}`,
    img: contact.img,
    desc: contact.desc,
    key: `${contact.first_name} ${contact.last_name}-${index}`,
  }));
  return (
    <View className="flex-1 bg-background pt-[100px]">
      <AlphabetList
        stickySectionHeadersEnabled
        data={data}
        ItemSeparatorComponent={() => <View className="h-hairline bg-gray px-4" />}
        keyExtractor={(item) => item.key}
        sectionHeaderHeight={50}
        indexContainerStyle={{
          width: 24,
          backgroundColor: colors.background,
        }}
        indexLetterStyle={{
          color: colors.primary,
          fontSize: 12,
        }}
        renderCustomItem={(item: any) => {
          return (
            <View
              className="h-[50px] flex-1 shrink-0 flex-row items-center gap-2.5  bg-white px-3"
              key={item.key}>
              <Image className="h-[30px] w-[30px] rounded-full" source={{ uri: item.img }} />
              <View className="flex-1">
                <Text className="text-sm text-black">{item.value}</Text>
                <Text className="pr-4 text-xs text-gray" ellipsizeMode="tail" numberOfLines={1}>
                  {item.desc}
                </Text>
              </View>
            </View>
          );
        }}
        renderCustomSectionHeader={(section) => (
          <View className="h-[30px] justify-center bg-background px-[14px]">
            <Text className=" text-black">{section.title}</Text>
          </View>
        )}
        style={{
          marginLeft: 14,
        }}
      />
    </View>
  );
};

export default NewChat;
