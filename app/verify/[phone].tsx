import { useReactive } from 'ahooks';
import clsx from 'clsx';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const PhoneOtpPage = () => {
  const { phone, signIn } = useLocalSearchParams<{ phone: string; signIn: string }>();
  const state = useReactive({
    code: '',
  });
  console.log('state.code', state.code);
  const ref = useBlurOnFulfill({ value: state.code, cellCount: CELL_COUNT });
  const onChangeText = (code: string) => {
    state.code = code;
  };
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: state.code,
    setValue: onChangeText,
  });
  console.log('props', props);

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
    console.log('code', state.code);
    if (state.code.length === 6) {
      if (signIn === 'true') {
        // login
        verifySignIn();
      } else {
        // verify phone
        verifyCode();
      }
    }
  }, [signIn, state.code]);
  return (
    <View className="flex-1 items-center gap-5 bg-background p-5">
      <Stack.Screen options={{ headerTitle: phone }} />
      <Text className="items-center text-base text-black">
        We have sent you an SMS with a code to the number above.
      </Text>
      <Text className="items-center text-base text-black">
        To complete your phone number verification, please enter the 6-digit activation code.
      </Text>
      <CodeField
        ref={ref}
        {...props}
        autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        testID="my-code-input"
        textContentType="oneTimeCode"
        value={state.code}
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            className={clsx('h-12 w-12 items-center justify-center border-b border-b-[#ccc]', {
              'border-b-2 border-b-black pb-1': isFocused,
            })}
            onLayout={getCellOnLayoutHandler(index)}>
            <Text className="text-center text-4xl text-black">
              {symbol || (isFocused && <Cursor />)}
            </Text>
          </View>
        )}
        rootStyle={{
          marginTop: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
          gap: 10,
        }}
        onChangeText={onChangeText}
      />
      <TouchableOpacity className="w-full items-center" onPress={resendCode}>
        <Text className="text-lg text-primary">Didn't receive the verification code?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneOtpPage;
