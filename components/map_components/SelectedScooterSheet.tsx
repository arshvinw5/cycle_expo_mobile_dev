import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { Text, Image, View } from 'react-native';

import { Button } from './Button';

import scooterImage from '~/assets/scooter.png';
import { useRide } from '~/providers/RideProvider';
import { useScooter } from '~/providers/ScooterProvider';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function SelectedScooterSheet() {
  const { selectedScooter, duration, distance, isNearby, setSelectedScooter }: any = useScooter();

  const { startRide }: any = useRide();

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (selectedScooter) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [selectedScooter]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[300]}
      enablePanDownToClose
      onClose={() => setSelectedScooter(undefined)}
      backgroundStyle={{ backgroundColor: '#414442' }}>
      {selectedScooter && (
        <BottomSheetView style={{ flex: 1, padding: 10, gap: 20 }}>
          {/* TOP part */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image source={scooterImage} style={{ width: 60, height: 60 }} />
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Cycle - S</Text>
              <Text style={{ color: 'gray', fontSize: 18 }}>
                id-{selectedScooter.id} · Galle Road
              </Text>
            </View>
            <View style={{ gap: 5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  alignSelf: 'flex-start',
                }}>
                <FontAwesome6 name="flag-checkered" size={18} color="#F05454" />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                  {(distance / 1000).toFixed(1)} km
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  alignSelf: 'flex-start',
                }}>
                <FontAwesome6 name="clock" size={18} color="#F05454" />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                  {(duration / 60).toFixed(0)} min
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  alignSelf: 'flex-start',
                }}>
                <MaterialIcons name="battery-charging-full" size={24} color="#F05454" />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                  {selectedScooter.battery}
                </Text>
              </View>
            </View>
          </View>
          {/* Bottom part */}
          <View>
            <Button
              title="Start journey"
              onPress={() => {
                startRide(selectedScooter.id);
                setSelectedScooter(undefined);
              }}
              disabled={!isNearby}
            />
          </View>
        </BottomSheetView>
      )}
    </BottomSheet>
  );
}
