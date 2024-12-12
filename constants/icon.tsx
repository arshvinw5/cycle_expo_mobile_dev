import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export const icon = {
  explore: (props: any) => <FontAwesome name="map-o" size={24} {...props} />,
  activity: (props: any) => <Feather name="activity" size={25} {...props} />,
  profile: (props: any) => <MaterialCommunityIcons name="account" size={25} {...props} />,
};
