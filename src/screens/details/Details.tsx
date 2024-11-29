import { useContext } from 'react';
import { View, ScrollView, StatusBar, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Dialog from '@components/dialog';
import FloatingActionButton from '@components/floatingActionButton';
import GradientScreen from '@components/gradientScreen';
import DetailsContext from '@config/DetailsContext';
import useScalingMetrics from '@config/useScalingMetrics';
import { FabBorderRadius, FabSize, IconFamily, isIos, Orientation } from '@constants';
import { Colors, globalStyles } from '@themes';

import { Instructions } from './DetailsContent';
import DetailsHeader from './DetailsHeader';
import DetailsTags from './DetailsTags';
import DetailsTitle from './DetailsTitle';
import Equipments from './Equipments';
import SimilarRecipes from './SimilarRecipes';
import Summary from './Summary';
import TastesInfo from './Tastes';
import styles from './styles';
import MealPlanDialog from './MealPlanDialog';

const Details = () => {
  const { orientation } = useScalingMetrics();
  const { top } = useSafeAreaInsets();

  const { recipe } = useContext(DetailsContext);

  const isLandscape = orientation === Orientation.landscape;
  const marginTop = isLandscape ? 0 : isIos ? top : StatusBar.currentHeight;

  const screenStyles: StyleProp<ViewStyle> = [
    styles.gap10,
    styles.screen,
    { flexDirection: isLandscape ? 'row' : 'column', marginTop },
  ];

  return (
    <GradientScreen
      showStatusBar={isLandscape}
      style={screenStyles}
    >
      <View style={[styles.gap10, { maxWidth: isLandscape ? '50%' : '100%' }]}>
        <DetailsHeader />
        <DetailsTitle />
        {isLandscape && <DetailsTags />}
      </View>
      <ScrollView
        style={globalStyles.flex1}
        contentContainerStyle={styles.gap15}
        showsVerticalScrollIndicator={false}
      >
        {!isLandscape && <DetailsTags />}
        <Summary />
        <TastesInfo />
        <Equipments />
        <Instructions />
        <SimilarRecipes />
      </ScrollView>
      <FloatingActionButton
        icon={{ family: IconFamily.fontisto, name: 'date' }}
        iconColor={Colors.white}
        size={FabSize.normal}
        borderRadius={FabBorderRadius.round}
        onPress={() => Dialog.show({ child: <MealPlanDialog />, borderRadius: 30 })}
      />
    </GradientScreen>
  );
};

export default Details;
