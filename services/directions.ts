const BASE_URL = 'https://api.mapbox.com';

export async function getDirections(from: any, to: any) {
  const response = await fetch(
    `${BASE_URL}/directions/v5/mapbox/walking/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=false&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
  );
  const json = await response.json();
  return json;
  //to get the direction out of function
}

export async function fetchDirectionBasedOnCoords(coordinates: any) {
  const coordinatesString = coordinates.map((coord: any) => `${coord[0]},${coord[1]}`).join(';');
  console.log(
    `${BASE_URL}/directions/v5/mapbox/cycling/${coordinatesString}?annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
  );
  const response = await fetch(
    `${BASE_URL}/directions/v5/mapbox/cycling/${coordinatesString}?annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
  );
  const json = await response.json();
  return json;
}
