import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Setting from "../screens/Setting";
import BottomTabNavigator from "./BottomTabNavigator";
import Result from "../components/Result";
import Quiz from "../screens/Quiz";
const Stack = createStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Log in">
      <Stack.Screen name="Sign up" component={Signup} options={{headerShown:false}}/>
      <Stack.Screen name="Log in" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Setting" component={Setting}/>
      <Stack.Screen name="BottomTabView" component={BottomTabNavigator} options={{headerShown:false}}/>
      <Stack.Screen name="ClassifyImage" component={Result} options={{headerShown:false}} />
      <Stack.Screen name="Quiz Page" component={Quiz} options={{headerShown:false}} />
    </Stack.Navigator> 
  )
}

export default MainNavigation;