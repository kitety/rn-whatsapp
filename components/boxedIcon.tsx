import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { View } from 'react-native';

export type BoxedIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
};

const BoxedIcon: FC<BoxedIconProps> = (props) => {
  const { name, backgroundColor } = props;
  return (
    <View className="rounded-md p-1" style={{ backgroundColor }}>
      <Ionicons color="white" name={name} size={22} />
    </View>
  );
};

export default BoxedIcon;
