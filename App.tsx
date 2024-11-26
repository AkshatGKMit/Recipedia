import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GradientScreen from '@components/gradientScreen';
import Splash from '@screens/splash/Splash';
import Dashboard from '@screens/dashboard/Dashboard';
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
      <GradientScreen>{isSplash ? <Splash /> : <Dashboard />}</GradientScreen>
    </SafeAreaProvider>
  );
};

export default App;
