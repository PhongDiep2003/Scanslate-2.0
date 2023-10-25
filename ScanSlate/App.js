import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';

export default function App() {
  return (
          <NavigationContainer>
            <BottomTabNavigator/>
          </NavigationContainer>
  );
}