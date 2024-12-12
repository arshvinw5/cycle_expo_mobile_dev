import { CircleLayer, Images, ShapeSource, SymbolLayer } from '@rnmapbox/maps';
import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import { featureCollection, point } from '@turf/helpers';

import pin from '../../assets/pin.png';

import scooters from '~/data/scooters.json';
import { useScooter } from '~/providers/ScooterProvider';

export default function ScooterMarkers() {
  const { setSelectedScooter, nearbyScooters }: any = useScooter();

  //near by scooter is from supabase db scooter table
  const points = nearbyScooters.map((scooter: any) =>
    point([scooter.long, scooter.lat], { scooter })
  );

  const scooterFeatures: any = featureCollection(points);

  const onPointPress = async (event: OnPressEvent) => {
    if (event.features[0].properties?.scooter) {
      setSelectedScooter(event.features[0].properties.scooter);
      // pass the scooter's id and all to useScooter hook to store the values in
      //if that scooter exist in gps range
      //all data is from pressing the scooter on map
      //just do clg to figure it out
    }
  };
  return (
    <ShapeSource id="scooters" cluster shape={scooterFeatures} onPress={onPointPress}>
      <SymbolLayer
        id="clusters-count"
        style={{
          textField: ['get', 'point_count'],
          textSize: 18,
          textColor: '#ffffff',
          textPitchAlignment: 'map',
        }}
      />

      <CircleLayer
        id="clusters"
        belowLayerID="clusters-count"
        filter={['has', 'point_count']}
        style={{
          circlePitchAlignment: 'map',
          circleColor: '#42E100',
          circleRadius: 20,
          circleOpacity: 1,
          circleStrokeWidth: 2,
          circleStrokeColor: 'white',
        }}
      />

      <SymbolLayer
        id="scooter-icons"
        filter={['!', ['has', 'point_count']]}
        style={{
          iconImage: 'pin',
          iconSize: 0.5,
          iconAllowOverlap: true,
          iconAnchor: 'bottom',
        }}
      />
      <Images images={{ pin }} />
    </ShapeSource>
  );
}
