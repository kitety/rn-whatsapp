import { useReactive } from 'ahooks';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

const PhoneOtpPage = () => {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const state = useReactive({
    code: '',
  });
  console.log('state.code', state.code);
  const verifyCode = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };
  const verifySignIn = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };
  const resendCode = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  useEffect(() => {
    if (state.code.length === 6) {
      console.log('code', state.code);
    }
  }, [state.code]);
  return (
    <View className="flex1 bg-background items-center gap-5 p-5">
      <Stack.Screen options={{ headerTitle: phone }} />
      <Text className="items-center text-base text-black">
        We have sent you an SMS with a code to the number above.
      </Text>
      <Text className="items-center text-base text-black">
        To complete your phone number verification, please enter the 6-digit activation code.
      </Text>
      <Text>{phone}</Text>
    </View>
  );
};

export default PhoneOtpPage;
