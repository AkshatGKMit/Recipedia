import { StatusBar, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AppName } from '@constants';
import { Colors, globalStyles } from '@themes';
import GradientScreen from '@components/gradientScreen';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor={Colors.transparent}
      />
      <GradientScreen>
        <Text>{AppName}</Text>
      </GradientScreen>
    </SafeAreaProvider>
  );
};

export default App;
