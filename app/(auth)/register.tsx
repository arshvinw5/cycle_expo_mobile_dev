import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Img08 from './../../assets/scooterImgs/08.jpg';
import InputField from '~/components/inputField';
import { icons } from '~/constants/index';
import CustomButton from '~/components/customButton';
import { Link } from 'expo-router';
import OAuth from '~/components/oAuth';

import { useRouter } from 'expo-router';
import check from '../../assets/scooterImgs/check.png';
import ReactNativeModal from 'react-native-modal';
import { supabase } from '~/lib/supabase';

const Register = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //email verification
  const [verification, setVerification] = useState({
    //state is the form state
    state: 'default',
    error: '',
  });

  const [form, setForm] = useState({
    name: '',
    emailAddress: '',
    password: '',
  });

  const RegisterPress = async () => {
    const { emailAddress, password } = form;
    setLoading(true);

    try {
      const {
        error,
        data: { session },
      } = await supabase.auth.signUp({
        email: emailAddress,
        password: password,
      });

      if (error) {
        throw error;
      }

      if (!session) {
        setShowSuccessModal(true);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
      setVerification({
        state: 'failed',
        error: err.message,
      });
    }
    setLoading(false);
  };

  return (
    <ScrollView className="flex-1 bg-[#F7F6F2]">
      <View className="flex-1 bg-[#F7F6F2]">
        <View className="relative h-[480px] w-full">
          <Image source={Img08} className="z-0 h-[480px] w-full" />
          <View className="z-1 absolute h-[480px] w-full bg-black/60" />
          <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-3xl text-[#fff]">
            Create your account.
          </Text>
        </View>
        <View className="my-1 p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChange={(value: any) => {
              //spread the form useState then assign value to name
              setForm({ ...form, name: value });
            }}
          />
          <InputField
            label="Email"
            placeholder="Email"
            icon={icons.email}
            value={form.emailAddress}
            onChangeText={(value) => {
              setForm({
                ...form,
                emailAddress: value,
              });
            }}
          />
          <InputField
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => {
              setForm({
                ...form,
                password: value,
              });
            }}
          />
          <CustomButton
            title="Register"
            disabled={loading}
            onPress={RegisterPress}
            className="mt-10"
          />
          {/* OAuth */}
          <OAuth />
          <View className="mt-10 flex-row items-center justify-center space-x-2">
            <Text className="text-lg text-general-200">Already have an account ?</Text>
            <Link href="./login">
              <Text className="text-lg text-primary-500">Log in</Text>
            </Link>
          </View>
        </View>
        {/* verification modal */}

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="min-h-[300px] rounded-2xl bg-[#F7F6F2] px-7 py-9 ">
            <Image source={check} className="mx-auto my-5 h-[100px] w-[100px]" />
            <Text className="text-center font-JakartaSemiBold text-3xl">Email Sent</Text>
            <Text className="mt-2 text-center font-Jakarta text-base text-gray-400 ">
              We have sent verification email to {form.emailAddress}
            </Text>
            {verification.error && (
              <Text className="mt-1 text-sm text-red-500">{verification.error}</Text>
            )}
            <CustomButton
              title="Back to Home"
              onPress={() => {
                setShowSuccessModal(false);
                router.push('/(auth)/login');
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default Register;
