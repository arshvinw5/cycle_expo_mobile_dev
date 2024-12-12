import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';
import React from 'react';
import { InputFieldProps } from '~/types/type';

export default function InputField({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>{label}</Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-200 rounded-lg border border-neutral-100 focus:border-gray-500 ${containerStyle}`}>
            {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />}
            <TextInput
              className={`rounded-lg p-3 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
