import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useCallback, useState } from 'react';
import Img08 from './../../assets/scooterImgs/08.jpg';
import InputField from '~/components/inputField';
import { icons } from '~/constants/index';
import CustomButton from '~/components/customButton';
import OAuth from '~/components/oAuth';

import { Link, useRouter } from 'expo-router';
import { supabase } from '~/lib/supabase';

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //input form
  const [form, setForm] = useState({
    emailAddress: '',
    password: '',
  });

  async function signInWithEmail() {
    setLoading(true);
    const { emailAddress, password } = form;
    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: emailAddress,
      password: password,
    });

    if (session) {
      router.push('/(root)/(tabs)/home');
    }

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <ScrollView className="flex-1 bg-[#F7F6F2]">
      <View className="flex-1 bg-[#F7F6F2]">
        <View className="relative h-[480px] w-full">
          <Image source={Img08} className="z-0 h-[480px] w-full" />
          <View className="z-1 absolute h-[480px] w-full bg-black/60" />
          <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-3xl text-[#fff]">
            Welcome to Cycle.
          </Text>
        </View>
        <View className="my-1 p-5">
          <InputField
            label="Email"
            placeholder="Email"
            icon={icons.email}
            value={form.emailAddress}
            onChangeText={(value: any) => {
              //spread the form useState then assign value to name
              setForm({ ...form, emailAddress: value });
            }}
          />
          <InputField
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            icon={icons.lock}
            value={form.password}
            onChangeText={(value: any) => {
              //spread the form useState then assign value to name
              setForm({ ...form, password: value });
            }}
          />
          <CustomButton
            disabled={loading}
            title="Log in"
            onPress={signInWithEmail}
            className="mt-10"
          />
          {/* OAuth */}
          <OAuth />
          <View className="mt-10 flex-row items-center justify-center space-x-2">
            <Text className="text-lg text-general-200">Don't have an account ?</Text>
            <Link href="./register">
              <Text className="text-lg text-primary-500">Then register with us.</Text>
            </Link>
          </View>
        </View>
        {/* verification modal */}
      </View>
    </ScrollView>
  );
};

export default Login;
