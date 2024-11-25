import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Colors } from '@themes';
import GradientScreen from '@components/gradientScreen';
import { useEffect, useState } from 'react';
import Splash from '@screens/splash/Splash';
import Dashboard from '@screens/dashboard/Dashboard';

const App = () => {
  const [isSplash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);
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
