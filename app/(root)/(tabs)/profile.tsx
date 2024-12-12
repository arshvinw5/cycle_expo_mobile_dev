import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '~/components/customButton';
import InputField from '~/components/inputField';
import { images } from '~/constants';
import { supabase } from '~/lib/supabase';

const Profile = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5" contentContainerStyle={{ paddingBottom: 120 }}>
        <Text className="my-5 font-JakartaBold text-2xl">My profile</Text>

        <View className="my-5 flex items-center justify-center">
          <Image
            source={images.user}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className=" h-[110px] w-[110px] rounded-full border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center rounded-lg bg-white px-5 py-3 shadow-sm shadow-neutral-300">
          <View className="flex w-full flex-col items-start justify-start">
            <InputField
              label="First name"
              placeholder="First Name"
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder="last Name"
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder="Email"
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder="Phone"
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>
        </View>
        <View className="m-10">
          <CustomButton title="Update User" onPress={() => {}} />
        </View>
        <View className="m-10">
          <CustomButton title="Log out" onPress={() => supabase.auth.signOut} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
