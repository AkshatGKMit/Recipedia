import { Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AppName } from '@constants';
import { globalStyles } from '@themes';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.screen}>
        <Text>{AppName}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
