import { useContext, useState } from 'react';
import { View, TextInput } from 'react-native';

import IconButton from '@components/iconButton';
import SearchContext from '@config/SearchContext';
import { IconFamily } from '@constants';
import { AppColors } from '@themes';

import styles from './styles';
import Filters from './Filters';

const SearchBar = () => {
  const { searchText: text, onChangeText, onSubmit, onBackPress } = useContext(SearchContext);

  const [containerHeight, setContainerHeight] = useState(0);

  return (
    <>
      {Filters(containerHeight)}
      <View
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
        style={styles.inputContainer}
      >
        <IconButton
          family={IconFamily.feather}
          name="arrow-left"
          iconStyle={styles.containerIcon}
          onPress={onBackPress}
        />
        <TextInput
          value={text}
          onChangeText={onChangeText}
          style={styles.textfield}
          placeholder="Search by ingredients and recipe name"
          placeholderTextColor={AppColors.placeholder()}
          numberOfLines={1}
          selectionColor={AppColors.primary}
          returnKeyType="search"
          onSubmitEditing={() => onSubmit()}
          autoFocus
        />
        <IconButton
          family={IconFamily.entypo}
          name="cross"
          iconStyle={styles.containerIcon}
          onPress={() => onChangeText('')}
        />
      </View>
    </>
  );
};

export default SearchBar;
