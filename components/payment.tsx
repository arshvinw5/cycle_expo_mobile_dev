import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import ReactNativeModal from 'react-native-modal';
import { router } from 'expo-router';
import { images } from '~/constants';
import { fetchAPI } from '~/lib/fetch';

const Payment = ({ email, amount }: { email: any; amount: any }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  //console.log(`payment`, amount);

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      intentConfiguration: {
        mode: {
          amount: amount, // Convert to smallest currency unit (e.g., cents)
          currencyCode: 'USD',
        },
        confirmHandler,
      },
      returnURL: 'cycle_final_dev_app://rides',
    });

    if (error) {
      console.error('Error initializing payment sheet:', error);
    }
  };

  const confirmHandler = async (paymentMethod: any, intentCreationCallback: any) => {
    try {
      const { paymentIntent, customer } = await fetchAPI('/(api)/(stripe)/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: email.split('@')[0],
          email,
          amount,
          paymentMethodId: paymentMethod.id,
        }),
      });

      if (paymentIntent?.client_secret) {
        const { result } = await fetchAPI('/(api)/(stripe)/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payment_method_id: paymentMethod.id,
            payment_intent_id: paymentIntent.id,
            customer_id: customer,
            client_secret: paymentIntent.client_secret,
          }),
        });

        intentCreationCallback({ clientSecret: result?.client_secret });
      }
    } catch (error) {
      console.error('Error in confirmHandler:', error);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={openPaymentSheet}>
        <Text className="font-JakartaBold text-[#F05454]">Check Out</Text>
      </TouchableOpacity>

      <ReactNativeModal isVisible={success} onBackdropPress={() => setSuccess(false)}>
        <View className="flex flex-col items-center justify-center rounded-2xl bg-white p-7">
          <Image source={images.check} className="mt-5 h-28 w-28" />
          <Text className="mt-5 text-center font-JakartaBold text-2xl">Payment Successful</Text>
          <Text className="font-JakartaRegular mt-3 text-center text-general-200">
            Your payment has been processed successfully. Enjoy your ride!
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSuccess(false);
              router.push('/(root)/(tabs)/rides');
            }}
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: '#F05454',
              borderRadius: 10,
            }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Back to Rides</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default Payment;
