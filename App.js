/*
  This file initializes the main app
*/
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigations/MainNavigation';
import { PaperProvider } from 'react-native-paper'; //import PaperProvider components to wrap the entire application so that every child components inside this wrapper can use pre-built components from react-native-paper library
export default function App() {
  return (
        <PaperProvider>
          <NavigationContainer>
            <MainNavigation/>
          </NavigationContainer>
        </PaperProvider>
  );
}