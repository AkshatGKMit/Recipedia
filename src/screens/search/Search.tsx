import { useContext } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import SearchContext from '@config/SearchContext';
import { isIos } from '@constants';

import SearchBar from './SearchBar';
import Suggestions from './Suggestions';
import DisplayData from './DisplayData';
import AppliedFilters from './AppliedFilters';
import styles from './styles';

const Search = () => {
  const { showSuggestions } = useContext(SearchContext);

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      style={styles.search}
    >
      <SearchBar />
      <AppliedFilters />
      {showSuggestions ? <Suggestions /> : <DisplayData />}
    </KeyboardAvoidingView>
  );
};

export default Search;
