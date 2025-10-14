import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import HomeNav from './src/navigations/HomeNav';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeNav />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
