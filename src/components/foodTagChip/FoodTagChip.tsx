import { View, Text, Pressable } from 'react-native';

import Icon from '@components/icon';
import { IconFamily } from '@constants';

import Styles from './styles';

const FoodTagChip = ({
  name,
  onPress,
  onLongPress,
  selected: isSelected,
  notSelect: isNotSelected,
}: FoodTagsProps) => {
  const styles = Styles(isSelected, isNotSelected);

  return (
    <Pressable
      onPress={() => onPress?.(name)}
      onLongPress={() => onLongPress?.(name)}
    >
      <View style={styles.chip}>
        {isSelected && (
          <Icon
            family={IconFamily.entypo}
            name="check"
          />
        )}
        {isNotSelected && (
          <Icon
            family={IconFamily.entypo}
            name="cross"
          />
        )}
        <Text style={styles.tagName}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default FoodTagChip;
