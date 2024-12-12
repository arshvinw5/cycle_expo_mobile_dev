import { View, Text, Image } from 'react-native';
import React from 'react';
import CustomButton from './customButton';
import { icons } from '~/constants';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function OAuth() {
  const handleGoogleAuth = () => {};
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-200" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-200" />
      </View>
      <CustomButton
        title="Log in with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={AntDesign}
        iconName="google"
        iconSize={24}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleAuth}
      />
    </View>
  );
}
