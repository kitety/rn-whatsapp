import { Link } from 'expo-router';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

const welcomeImage = require('~/assets/images/welcome.png');

const Page = () => {
  const openLink = () => {
    Linking.openURL('https://www.google.com');
  };
  return (
    <View className="flex-1 items-center justify-center bg-white p-5">
      <Image className="mb-20 h-[300px] w-full" source={welcomeImage} />
      <Text className="my-5 text-2xl font-bold">Welcome to WhatsApp Clone</Text>
      <Text className={`text-gray mb-20 text-center text-sm`}>
        Read our{' '}
        <Text className="text-primary" onPress={openLink}>
          Privacy Policy
        </Text>
        . {'Tap "Agree & Continue" to accept the '}
        <Text className="text-primary" onPress={openLink}>
          Terms of Service
        </Text>
        .
      </Text>
      <Link asChild replace href={{ pathname: '/otp' }}>
        <TouchableOpacity className="w-full items-center">
          <Text className="text-primary text-[22px] font-bold">Agree & Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;
