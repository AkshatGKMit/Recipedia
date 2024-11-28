import { useContext, useMemo } from 'react';
import { Pressable, View, Text, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';

import Icon from '@components/icon';
import SearchContext from '@config/SearchContext';
import { ImageSizes, IconFamily, Images } from '@constants';
import ApiConstants from '@network/apiConstants';

import styles from './styles';

const SuggestionTile = (autoComplete: AutoCompleteSearch) => {
  const { onSubmit } = useContext(SearchContext);

  const { id, imageType, title } = autoComplete;

  const imageUri = useMemo(() => {
    const { recipes: recipesUrl } = ApiConstants.imageUrl;

    return recipesUrl(id, ImageSizes.size90x90, imageType);
  }, []);

  return (
    <Pressable onPress={() => onSubmit(title)}>
      <View style={styles.autoCompleteTile}>
        <Icon
          family={IconFamily.ionicons}
          name="search"
        />
        <FastImage
          defaultSource={Images.recipePlaceholder}
          source={{ uri: imageUri }}
          style={styles.autoCompleteImage}
        />
        <Text
          style={styles.autoCompleteText}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Icon
          family={IconFamily.feather}
          name="arrow-up-left"
        />
      </View>
    </Pressable>
  );
};

const Suggestions = () => {
  const { suggestions } = useContext(SearchContext);

  return (
    <FlatList
      style={styles.autoCompleteContainer}
      data={suggestions}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: autoComplete }) => <SuggestionTile {...autoComplete} />}
    />
  );
};

export default Suggestions;
