import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, View } from 'react-native';
import { icons } from '~/constants';

const TabIcon = ({ source, focused }: { source: ImageSourcePropType; focused: boolean }) => (
  <View
    className={`flex flex-row items-center justify-center rounded-md ${focused ? 'bg-[#fff]' : ''}`}>
    <View
      className={`h-12 w-12 items-center justify-center rounded-md ${focused ? 'bg-[#F05454]' : ''}`}>
      <Image source={source} tintColor="white" resizeMode="contain" className="h-10 w-10" />
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          display: 'flex',
          backgroundColor: '#000',
          borderRadius: 20,
          overflow: 'hidden',
          paddingTop: 20,
          height: 78,
          marginHorizontal: 20,
          marginBottom: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon source={icons.home} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: 'Rides',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon source={icons.list} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon source={icons.chat} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon source={icons.profile} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
