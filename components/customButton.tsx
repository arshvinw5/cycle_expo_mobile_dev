import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ButtonProps } from '~/types/type';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case 'secondary':
      return 'bg-gray-500';
    case 'danger':
      return 'bg-red-500';
    case 'success':
      return 'bg-green-500';
    case 'outline':
      return 'bg-transparent border-neutral-500 border-[0.5px]';
    default:
      return 'bg-[#F05454]';
  }
};
const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
  switch (variant) {
    case 'primary':
      return 'text-[#082032]';
    case 'secondary':
      return 'text-gray-100';
    case 'danger':
      return 'text-red-100';
    case 'success':
      return 'text-green-500';
    default:
      return 'text-white';
  }
};

export default function CustomButton({
  onPress,
  title,
  bgVariant = 'primary',
  textVariant = 'primary',
  IconLeft,
  IconRight,
  className,
  iconName,
  iconSize,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-xl flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} p-3 ${className} space-x-2`}
      {...props}>
      {IconLeft && <IconLeft name={iconName} size={iconSize} color="#082032" />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
      {IconRight && <IconRight name={iconName} size={iconSize} color="#082032" />}
    </TouchableOpacity>
  );
}
