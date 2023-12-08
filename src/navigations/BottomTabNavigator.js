/*
  This file initializes the navigation and the UI for bottom tab bar of the applicaiton 
*/
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewFlashCards from '../screens/ViewFlashCards';
import Camera_View from '../components/Camera_View';
import { Feather, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import {View } from 'react-native';
import { navigation_styles as styles } from './navigationStyle';
import QuizEntry from '../screens/QuizEntry';
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
      <Tab.Screen name="Screen_1" component={ViewFlashCards} options={{
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
      <Tab.Screen name="Quiz Entry" component={QuizEntry} options={{
        tabBarIcon : ({focused}) => <TabBarIconContainer focused={focused}>
                                       <SimpleLineIcons name="pencil" size={50} color="black" />
                                    </TabBarIconContainer>
        
      }}/>
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;