import { View, Text, Image } from 'react-native';
import React from 'react';
import { Ride } from '~/types/type';
import { icons } from '~/constants';
import { calculateRideDuration, calculateRidePrice, convertDate } from '~/lib/utils';
import { StripeProvider } from '@stripe/stripe-react-native';
import CustomButton from '../customButton';
import Payment from '../payment';
import { useAuth } from '~/providers/AuthProvider';

const RideCard = ({ ride }: any) => {
  const payment_status = 'paid';
  const destination_longitude = ride.routeCoords[0][0];
  const destination_latitude = ride.routeCoords[0][1];

  const { session } = useAuth();

  const email = session?.user?.email;

  const calculateRidePriceStrip = (distance: number): number => {
    // Convert distance to kilometers
    const kilometers = distance / 1000; // e.g., 2044 meters -> 2.044 km

    // Calculate the price (2 LKR per km)
    const price = kilometers * 2; // e.g., 2.044 km * 2 LKR = 4.088 LKR

    // Convert the price to the smallest currency unit (e.g., cents for Stripe)
    const priceInCents = Math.round(price * 100); // e.g., 4.088 LKR -> 409 cents (rounded)

    return priceInCents;
  };

  const price = calculateRidePriceStrip(ride.routeDistance);

  //console.log(`ride card`, price);

  const mapUri = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIP_PUBLIC_KEY!}
      urlScheme="cycle_final_dev_app">
      <View className="mt-5 flex flex-col items-center justify-center rounded-lg bg-white shadow-sm shadow-neutral-300">
        <View className="flex flex-col items-center justify-center p-5">
          <View className="flex flex-col items-center justify-between">
            <View className="flex flex-row items-center justify-between">
              <Image source={{ uri: mapUri }} className="h-[90px] w-[80px] rounded-lg" />

              <View className="mx-5 flex flex-1 flex-col gap-y-5">
                <View className="flex flex-row items-center gap-x-2">
                  <Image source={icons.to} className="h-5 w-5" />
                  <Text className="font-JakartaMedium text-2xl" numberOfLines={1}>
                    Ad
                  </Text>
                </View>

                <View className="flex flex-row items-center gap-x-2">
                  <Image source={icons.point} className="h-5 w-5" />
                  <Text className="font-JakartaMedium text-2xl" numberOfLines={1}>
                    dd
                  </Text>
                </View>
              </View>
            </View>

            <View className="mt-5 flex w-full flex-col items-start justify-center rounded-lg bg-general-500 p-3">
              <View className="mb-5 flex w-full flex-row items-center justify-between">
                <Text className="text-md font-JakartaMedium text-gray-500">
                  Started Date & Time
                </Text>
                <Text className="text-md font-JakartaBold" numberOfLines={1}>
                  {convertDate(ride.created_at)}
                </Text>
              </View>
              <View className="mb-5 flex w-full flex-row items-center justify-between">
                <Text className="text-md font-JakartaMedium text-gray-500">
                  Finished Date & Time
                </Text>
                <Text className="text-md font-JakartaBold" numberOfLines={1}>
                  {convertDate(ride.finished_at)}
                </Text>
              </View>
              <View className="mb-5 flex w-full flex-row items-center justify-between">
                <Text className="text-md font-JakartaMedium text-gray-500">Scooter ID</Text>
                <Text className="text-md font-JakartaBold">{ride.id}</Text>
              </View>
              <View className="mb-5 flex w-full flex-row items-center justify-between">
                <Text className="text-md font-JakartaMedium text-gray-500">Ride Duration</Text>
                <Text className="text-md font-JakartaBold">
                  {calculateRideDuration(ride.routeDuration)}
                </Text>
              </View>
              <View className="mb-5 flex w-full flex-row items-center justify-between">
                <Text className="text-md font-JakartaMedium text-gray-500">Price LKR</Text>
                <Text className="text-md font-JakartaBold">
                  {calculateRidePrice(ride.routeDistance)}
                </Text>
              </View>
              <View className="flex w-full flex-row items-center justify-between">
                <Text className="text-md font-JakartaMedium text-gray-500">Payment Status</Text>
                <Text
                  className={`text-md font-JakartaBold capitalize ${payment_status === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                  {payment_status}
                </Text>
              </View>
              <View className="mt-10 flex w-full flex-row items-center justify-between">
                <Text className="text-md font-JakartaMedium text-gray-500">
                  Check out the payment
                </Text>
                <View className="h-15 w-15">
                  <Payment email={email} amount={price} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </StripeProvider>
  );
};

export default RideCard;
