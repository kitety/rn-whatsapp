import { Ionicons } from '@expo/vector-icons';
import { useReactive } from 'ahooks';
import clsx from 'clsx';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaskInput from 'react-native-mask-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const GER_PHONE = [
  `+`,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const OtpPage = () => {
  const state = useReactive({
    loading: false,
    phoneNumber: '',
  });
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const openLink = () => {
    Linking.openURL('https://www.google.com');
  };
  const sendOtp = async () => {
    state.loading = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    state.loading = false;
    router.push(`/verify/${state.phoneNumber}`);
  };

  const trySignIn = async () => {};

  return (
    <KeyboardAvoidingView className="flex-1">
      {state.loading && (
        <View className="absolute bottom-0 left-0 right-0 top-0 z-10 items-center justify-center bg-white">
          <ActivityIndicator color={Colors.primary} size="large" />
          <Text style={{ fontSize: 18, padding: 10 }}>Sending code...</Text>
        </View>
      )}
      <View className="bg-background  flex-1 items-center gap-5 p-5">
        <Text className="text-gray text-sm">
          WhatsApp will need to verify your account. Carrier charges may apply.
        </Text>
        <View className="w-full rounded-xl bg-white p-2.5">
          <View className="mb-1 flex-row items-center justify-between p-1.5">
            <Text className="text-primary text-lg">Germany</Text>
            <Ionicons className="text-gray" name="chevron-forward" size={20} />
          </View>
          {/* seprator */}
          <View className="bg-gray h-hairline w-full opacity-20" />
          <MaskInput
            autoFocus
            keyboardType="numeric"
            mask={GER_PHONE}
            placeholder="+49 Your Phone Number"
            value={state.phoneNumber}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              fontSize: 16,
              padding: 6,
              marginTop: 10,
            }}
            onChangeText={(masked, unmasked) => {
              state.phoneNumber = masked; // you can use the unmasked value as well

              // assuming you typed "9" all the way:
              console.log(masked); // (99) 99999-9999
              console.log(unmasked); // 99999999999
            }}
          />
        </View>
        {/* 提示 */}
        <Text className="text-center text-xs text-black">
          You must be{' '}
          <Text className="text-primary" onPress={openLink}>
            at least 16 years old
          </Text>{' '}
          to register. Learn how WhatsApp works with the{' '}
          <Text className="text-primary" onPress={openLink}>
            Meta Companies
          </Text>
          .
        </Text>
        {/* flex 1 */}
        <View className="flex-1" />
        {/* next */}
        <TouchableOpacity
          disabled={!state.phoneNumber}
          style={{ marginBottom: bottom }}
          className={clsx(
            `text-lightGray w-full items-center
            rounded-xl p-2.5`,
            {
              'bg-primary text-white': !!state.phoneNumber,
            }
          )}
          onPress={sendOtp}>
          <Text
            className={clsx(`text-gray text-[22px] font-normal`, {
              'bg-primary text-white': !!state.phoneNumber,
            })}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpPage;
