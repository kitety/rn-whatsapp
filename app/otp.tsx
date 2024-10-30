import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useReactive } from 'ahooks';
import clsx from 'clsx';
import { Href, useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Alert,
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
  ' ',
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
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const openLink = () => {
    Linking.openURL('https://www.google.com');
  };
  const sendOtp = async () => {
    state.loading = true;
    try {
      await signUp!.create({
        phoneNumber: state.phoneNumber,
      });
      await signUp!.preparePhoneNumberVerification();
      router.push(`/verify/${state.phoneNumber}`);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        if (error.errors[0].code === 'form_identifier_exists') {
          // User signed up before
          console.log('User signed up before');
          await trySignIn();
        } else {
          state.loading = false;
          Alert.alert('Error', error.errors[0].message);
        }
      }
    }
  };

  const trySignIn = async () => {
    console.log('trySignIn', state.phoneNumber);

    const { supportedFirstFactors } = await signIn!.create({
      identifier: state.phoneNumber,
    });

    const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
      return factor.strategy === 'phone_code';
    });

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: 'phone_code',
      phoneNumberId,
    });

    router.push(`/verify/${state.phoneNumber}?signin=true` as Href<string>);
    state.loading = false;
  };

  return (
    <KeyboardAvoidingView className="flex-1" keyboardVerticalOffset={keyboardVerticalOffset}>
      {state.loading && (
        <View className="absolute bottom-0 left-0 right-0 top-0 z-10 items-center justify-center bg-white">
          <ActivityIndicator color={Colors.primary} size="large" />
          <Text style={{ fontSize: 18, padding: 10 }}>Sending code...</Text>
        </View>
      )}
      <View className="flex-1 items-center gap-5 bg-background p-5">
        <Text className="text-sm text-gray">
          WhatsApp will need to verify your account. Carrier charges may apply.
        </Text>
        <View className="w-full rounded-xl bg-white p-2.5">
          <View className="mb-1 flex-row items-center justify-between p-1.5">
            <Text className="text-lg text-primary">Germany</Text>
            <Ionicons className="text-gray" name="chevron-forward" size={20} />
          </View>
          {/* seprator */}
          <View className="h-hairline w-full bg-gray opacity-20" />
          <MaskInput
            autoFocus
            keyboardType="numeric"
            mask={GER_PHONE}
            placeholder="+86 Your Phone Number"
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
            `w-full items-center rounded-xl
            p-2.5 text-lightGray`,
            {
              'bg-primary text-white': !!state.phoneNumber,
            }
          )}
          onPress={sendOtp}>
          <Text
            className={clsx(`text-[22px] font-normal text-gray`, {
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
