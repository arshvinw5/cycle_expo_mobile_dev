import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import CustomButton from '~/components/customButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { onboarding } from '~/constants';

const Onboarding = () => {
  const swipeRef = useRef<Swiper>(null);
  //to track the index
  const [activeIndex, setActiveIndex] = useState<number>(0);

  //to get the index of the swiper
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="h-full w-full items-center justify-between bg-[#F7F6F2]">
      <TouchableOpacity
        onPress={() => {
          router.replace('./register');
        }}
        className="w-full items-end justify-center p-5">
        <Text className="text-md font-JakartaBold text-[#000]">Skip</Text>
      </TouchableOpacity>
      {/* swiper card */}
      <Swiper
        ref={swipeRef}
        loop={false}
        dot={<View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#EEEEEE]" />}
        activeDot={<View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#F05454]" />}
        onIndexChanged={(i) => setActiveIndex(i)}>
        {onboarding.map(({ id, title, description, image }) => (
          // swiper card
          <View key={id} className="my-36 items-center justify-center p-5">
            <Image source={image} className="h-[300px] w-full" resizeMode="contain" />
            <View className="mt-10 w-full flex-row items-center justify-center">
              <Text className="mx-10 text-center text-3xl font-bold text-[#000]">{title}</Text>
            </View>
            <Text className="mx-10 mt-3 text-center font-JakartaSemiBold text-lg text-[#858585]">
              {description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        className="mb-16 mt-5 w-11/12 px-10"
        IconRight={isLastSlide ? MaterialCommunityIcons : MaterialIcons}
        iconName={isLastSlide ? 'page-next' : 'navigate-next'}
        iconSize={25}
        title={isLastSlide ? 'Tap to Register' : 'Next'}
        onPress={() => {
          isLastSlide ? router.replace('./register') : swipeRef.current?.scrollBy(1);
        }}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
