import React from 'react';
import Mapbox, { Camera, LocationPuck, MapView } from '@rnmapbox/maps';

import LineRoute from './LineRoute';
import ScooterMarkers from './ScooterMarkers';

import { useRide } from '~/providers/RideProvider';
import { useScooter } from '~/providers/ScooterProvider';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function Map() {
  const { directionCoordinates }: any = useScooter();
  const { ride, rideRoute }: any = useRide();

  //to disappear scooter makers
  const showMakers = !ride;

  console.log(`ride route`, rideRoute);

  return (
    <MapView
      zoomEnabled
      pitchEnabled
      scrollEnabled
      rotateEnabled
      style={{ flex: 1 }}
      styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera followZoomLevel={15} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />

      {rideRoute.length > 0 && <LineRoute id="rideRoute" coordinates={rideRoute} />}

      {showMakers && (
        <>
          <ScooterMarkers />
          {/* another layer for directions */}
          {directionCoordinates && (
            <LineRoute id="directionRoute" coordinates={directionCoordinates} />
          )}
        </>
      )}
      {directionCoordinates && <LineRoute coordinates={directionCoordinates} />}
    </MapView>
  );
}
