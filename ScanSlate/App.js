import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigations/MainNavigation';

export default function App() {
  return (
          <NavigationContainer>
            <MainNavigation/>
          </NavigationContainer>
  );
}