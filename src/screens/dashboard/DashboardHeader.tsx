import { View, Text, ImageBackground, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Icon from '@components/icon';
import { Images, IconFamily, AppConstants, Routes } from '@constants';

import Styles from './styles';

const DashboardHeader = () => {
  const { navigate } = useNavigation<StackNavigation>();
  const { top: topInsets } = useSafeAreaInsets();

  const styles = Styles(topInsets);
  const { appDescription } = AppConstants;
  const { Search: SearchRoute } = Routes.Stack;

  return (
    <ImageBackground
      source={Images.dashboardTop}
      style={styles.headerBackground}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.headline}>{appDescription}</Text>
        <Pressable onPress={() => navigate(SearchRoute)}>
          <View style={styles.searchBar}>
            <Icon
              family={IconFamily.octicons}
              name="search"
              style={styles.textStyle}
            />
            <Text style={styles.textStyle}>Search by ingredients or recipe name</Text>
          </View>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default DashboardHeader;
