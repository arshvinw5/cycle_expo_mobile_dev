import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { Text } from 'react-native';

import { Button } from './Button';

import { useRide } from '~/providers/RideProvider';
import { StripeProvider } from '@stripe/stripe-react-native';
import Payment from '../payment';
import { Redirect } from 'expo-router';

export default function ActiveRideSheet() {
  const { ride, finishRide }: any = useRide();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (ride) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [ride]);

  const handleFinishRide = async () => {
    await finishRide();
    <Redirect href="/(root)/(tabs)/rides" />;
  };

  //console.log(`Ride sheet`, ride);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[300]}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: '#414442' }}>
      {ride && (
        <BottomSheetView style={{ flex: 1, padding: 10, gap: 20 }}>
          <Text>Ride in progress</Text>
          <Button title="Finish journey" onPress={handleFinishRide} />
        </BottomSheetView>
      )}
    </BottomSheet>
  );
}
