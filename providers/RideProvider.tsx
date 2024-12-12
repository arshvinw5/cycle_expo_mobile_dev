import * as Location from 'expo-location';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useAuth } from './AuthProvider';

import { supabase } from '~/lib/supabase';
import { fetchDirectionBasedOnCoords } from '~/services/directions';

const RideContext = createContext({});

export default function RideProvider({ children }: PropsWithChildren) {
  const [ride, setRide] = useState();

  const [rideRoute, setRideRoute] = useState<number[][]>([]);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchActiveRide = async () => {
      const { data } = await supabase
        .from('rides')
        .select('*')
        .eq('user_id', userId)
        .is('finished_at', null)
        .limit(1)
        .single();

      if (data) {
        setRide(data);
      }
    };

    fetchActiveRide();
  }, []);

  useEffect(() => {
    let subscription: Location.LocationSubscription | undefined;

    const watchLocation = async () => {
      subscription = await Location.watchPositionAsync({ distanceInterval: 30 }, (newLocation) => {
        const locationPoint = [newLocation.coords.longitude, newLocation.coords.latitude];
        setRideRoute((currentRoute) => [...currentRoute, locationPoint]);
      });
    };

    if (ride) {
      watchLocation();
    }

    // Unsubscribe when component unmounts
    return () => {
      subscription?.remove();
    };
  }, [ride]);

  //scooter id is from selected scooter id from scooter sheet
  const startRide = async (scooterId: number) => {
    if (ride) {
      Alert.alert('Cannot start a new ride while another one is in progress');
      return;
    }
    const { data, error } = await supabase
      .from('rides')
      .insert([
        {
          user_id: userId,
          scooter_id: scooterId,
        },
      ])
      .select();
    if (error) {
      Alert.alert('Failed to start the ride');
      console.log(error);
    } else {
      setRide(data[0]);
    }
  };

  const finishRide = async () => {
    if (!ride) {
      Alert.alert('No active ride to finish');
      return;
    }

    const actualRoute = await fetchDirectionBasedOnCoords(rideRoute);
    const rideRouteCoords = actualRoute.routes[0].geometry.coordinates;
    const rideRouteDuration = actualRoute.routes[0].duration;
    const rideRouteDistance = actualRoute.routes[0].distance;
    setRideRoute(actualRoute.routes[0].geometry.coordinates);

    try {
      const { error } = await supabase
        .from('rides')
        .update({
          finished_at: new Date().toISOString(), // Ensure proper formatting
          routeDuration: rideRouteDuration,
          routeDistance: rideRouteDistance,
          routeCoords: rideRouteCoords,
        })
        .eq('id', ride.id);

      if (error) {
        //console.error('Error updating ride:', error);
        //Alert.alert('Failed to finish the ride', error.message || 'Unknown error');
        Alert.alert('Failed to finish the ride', error.message || 'Unknown error');
        return;
      }

      Alert.alert('Ride finished successfully');

      setRide(undefined); // Clear the active ride state
      setRideRoute([]); // Reset the route state
    } catch (err: any) {
      //console.error('Unexpected error:', err);
      Alert.alert('An unexpected error occurred while finishing the ride', err);
    }
  };

  return (
    <RideContext.Provider value={{ startRide, ride, rideRoute, finishRide }}>
      {children}
    </RideContext.Provider>
  );
}

export const useRide = () => useContext(RideContext);
