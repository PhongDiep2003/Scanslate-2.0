import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from '../screens/Screen1';
import Screen3 from '../screens/Screen3';
import Camera_View from '../components/Camera_View';
import { Feather, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import {View } from 'react-native';
import { navigation_styles as styles } from './navigationStyle';
const TabBarIconContainer = ({children, focused}) => 
                                              <View style={ focused ? [styles.TabBarIconContainer, styles.TabBarIconContainer_Active] : styles.TabBarIconContainer}>
                                                {children}
                                              </View>


const Tab = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <Tab.Navigator 
      initialRouteName='CameraView'
      goBack={'none'}
      screenOptions= {
        {
          tabBarShowLabel: false,
          tabBarStyle: styles.TabBar,
          headerShown: false,
        
        }
        
      }>
      <Tab.Screen name="Screen_1" component={Screen1} options={{
        tabBarIcon : ({focused}) => <TabBarIconContainer focused={focused}>
                                      <Entypo name="text-document" size={60} color="black" />
                                    </TabBarIconContainer>
        
      }}/>
      <Tab.Screen name="CameraView" component={Camera_View} options={{
        tabBarIcon : ({focused}) => <TabBarIconContainer focused={focused}>
                                        <Feather name="camera" size={60} color="black" />
                                    </TabBarIconContainer>,
        tabBarVisible: false
        
      }}/>
      <Tab.Screen name="Screen_3" component={Screen3} options={{
        tabBarIcon : ({focused}) => <TabBarIconContainer focused={focused}>
                                       <SimpleLineIcons name="pencil" size={50} color="black" />
                                    </TabBarIconContainer>
        
      }}/>
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;