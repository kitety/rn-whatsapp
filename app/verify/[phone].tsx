import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useReactive } from 'ahooks';
import clsx from 'clsx';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import colors from '~/constants/colors';

const CELL_COUNT = 6;

const PhoneOtpPage = () => {
  const { phone, signin } = useLocalSearchParams<{ phone: string; signin: string }>();
  const state = useReactive({
    code: '',
    loading: false,
  });
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
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

  const verifyCode = useCallback(async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code: state.code,
      });

      await setActive!({ session: signUp!.createdSessionId });
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message);
      }
      state.loading = false;
    }
  }, [signUp, setActive, state]);
  const verifySignIn = useCallback(async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: 'phone_code',
        code: state.code,
      });

      await setActive!({ session: signIn!.createdSessionId });
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message);
      }
      state.loading = false;
    }
  }, [signIn, state, setActive]);
  const resendCode = async () => {
    try {
      if (signin === 'true') {
        const { supportedFirstFactors } = await signIn!.create({
          identifier: phone,
        });

        const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
          return factor.strategy === 'phone_code';
        });

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId,
        });
      } else {
        await signUp!.create({
          phoneNumber: phone,
        });
        signUp!.preparePhoneNumberVerification();
      }
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message);
      }
    }
  };

  useEffect(() => {
    console.log('code', state.code);
    if (state.code.length === 6) {
      state.loading = true;
      if (signin === 'true') {
        // login
        verifySignIn();
      } else {
        // verify phone
        verifyCode();
      }
    }
  }, [signIn, signin, state, state.code, verifyCode, verifySignIn]);
  return (
    <View className="flex-1 items-center gap-5 bg-background p-5">
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
      {state.loading && <ActivityIndicator color={colors.primary} size="large" />}
    </View>
  );
};

export default PhoneOtpPage;
