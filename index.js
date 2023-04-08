/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    dark: false,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#f53d3d',
      secondary: '#f1c40f',
      tertiary: '#a1b2c3',
      // background: '#121212',
      background: '#242f3e',
      surface: '#212121',
      text: '#ffffff',
      placeholder: '#757575',
    },
  };

const RNPaper = () => {
    <SafeAreaProvider>
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    </SafeAreaProvider>
}

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
