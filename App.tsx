import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import Splash from '@screens/splash/Splash';
import Navigator from '@navigation/Navigator';
import { AppConstants } from '@constants';
import { Colors } from '@themes';

const App = () => {
  const [isSplash, setSplash] = useState(true);

  const { splashScreenDuration } = AppConstants;

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, splashScreenDuration);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        animated
        backgroundColor={Colors.transparent}
      />
      <NavigationContainer>{isSplash ? <Splash /> : <Navigator />}</NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
