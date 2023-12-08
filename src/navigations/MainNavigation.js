/*
  This file initializes the navigation of the entire application 
*/
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Setting from "../screens/Setting";
import BottomTabNavigator from "./BottomTabNavigator";
import Result from "../components/Result";
import Quiz from "../screens/Quiz";
import Profile from "../screens/Profile";
import PasswordSetting from "../screens/PasswordSetting";
import Header from "./Header";
const Stack = createStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Log in">
      <Stack.Screen name="Sign up" component={Signup} options={{headerShown:false}}/>
      <Stack.Screen name="Log in" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Setting" component={Setting} options={{
        header: ({navigation}) => <Header title={'Setting'}  navigation={navigation}/>
      }}/>
      <Stack.Screen name="BottomTabView" component={BottomTabNavigator} options={{headerShown:false}}/>
      <Stack.Screen name="ClassifyImage" component={Result} options={{headerShown:false}} />
      <Stack.Screen name="Quiz Page" component={Quiz} options={{headerShown:false}} />
      <Stack.Screen name="Profile" component={Profile} options={{
        header: ({navigation}) => <Header title={'Profile'}  navigation={navigation}/>
      }}/>
      <Stack.Screen name="Password Setting" component={PasswordSetting} options={{
        header: ({navigation}) => <Header title={'Password Setting'}  navigation={navigation}/>
      }} />
    </Stack.Navigator> 
  )
}

export default MainNavigation;