import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GradientScreen from '@components/gradientScreen';
import Splash from '@screens/splash/Splash';
import Dashboard from '@screens/dashboard/Dashboard';
import { AppConstants } from '@constants';
import { Colors } from '@themes';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from '@navigation/Navigator';

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
