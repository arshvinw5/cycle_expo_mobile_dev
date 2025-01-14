import { LineLayer, ShapeSource } from '@rnmapbox/maps';
import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';

export default function LineRoute({
  coordinates,
  id = 'routeSource',
}: {
  coordinates: Position[];
  id?: string;
}) {
  return (
    <ShapeSource
      id={id}
      lineMetrics
      shape={{
        properties: {},
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates,
        },
      }}>
      <LineLayer
        id={`${id}-lineLayer`}
        style={{
          lineColor: '#42E100',
          lineCap: 'round',
          lineJoin: 'round',
          lineWidth: 5,
        }}
      />
    </ShapeSource>
  );
}
