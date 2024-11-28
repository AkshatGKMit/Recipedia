import { useContext } from 'react';
import { useWindowDimensions, View, Text, FlatList } from 'react-native';

import SearchRecipeCard from '@components/searchRecipeCard';
import SearchContext from '@config/SearchContext';

import styles from './styles';

const DisplayData = () => {
  const { width } = useWindowDimensions();

  const { searchText, data } = useContext(SearchContext);

  const baseWidth = 150;
  const numColumns = Math.floor(width / baseWidth);

  const columnStyles = numColumns > 1 ? styles.dataContentContainer : undefined;

  return (
    <View style={styles.dataContainer}>
      {!!data.length && (
        <Text
          style={styles.searchHeading}
          numberOfLines={1}
        >
          Search Result: "{searchText}"
        </Text>
      )}
      <FlatList
        contentContainerStyle={styles.dataContentContainer}
        columnWrapperStyle={columnStyles}
        data={data}
        key={width.toString()}
        numColumns={numColumns}
        renderItem={({ item: recipe }) => <SearchRecipeCard {...recipe} />}
      />
    </View>
  );
};

export default DisplayData;
