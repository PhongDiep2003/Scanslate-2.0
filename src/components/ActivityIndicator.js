/*
  This file creates loading animation for the UI 
*/
import React from 'react';
import LottieView from 'lottie-react-native'
import { colors } from '../../base';
//main file
function ActivityIndicator({visible = false}) {
  if (!visible) return null
  return (
   <LottieView 
              source={require('../../assets/animations/loadingAnimation.json')}
              autoplay
              loop
              style ={{backgroundColor: colors.primary}}
              />
  );
}
export default ActivityIndicator;