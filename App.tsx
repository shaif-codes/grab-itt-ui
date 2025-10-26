import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { store } from './src/store';
import HomeNav from './src/navigations/HomeNav';
import ErrorBoundary from './src/components/ErrorBoundary';

enableScreens();

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <SafeAreaProvider>
          <HomeNav />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </Provider>
    </ErrorBoundary>
  );
}
