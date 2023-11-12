import React from 'react';
import { View, StyleSheet, StatusBar, Image, Text} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useClassification from '../hooks/useClassification';
import { colors } from '../../base';
// import ActivityIndicator from './ActivityIndicator';
function Result({route, navigation}) {
  const insets = useSafeAreaInsets()
  const {url} = route.params
  const {isLoading, isTfReady, result} = useClassification(url)
  
  if (!url) {
    navigation.pop(1);
  }
  return (
    isLoading ?
                <View style={[styles.container,{backgroundColor: colors.primary}]}>
                    <ActivityIndicator animating={true} color={colors.bottom_tab} size={'large'}  />
                </View>
              :

                <View style={[styles.container, {
                                                    paddingTop: insets.top,
                                                    paddingBottom: insets.bottom,
                                                    paddingLeft: insets.left,
                                                    paddingRight: insets.right,
                                                  }]}>
                      <StatusBar barStyle="light-content" animated />
                      {url && <Image source={{uri: url}} style={styles.image} resizeMode='cover'/>}
                      <View style={styles.predictionView}>
                        <Text style={styles.predictedResult}>{result[0]?.className}</Text>
                      </View>
                </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignContent:'center'
  },
  image: {
    width:'100%',
    height:'100%'
  },
  predictionView: {
    position: 'absolute', 
    top: '50%',           // Position halfway down the parent
    left: '50%',          // Position halfway across the parent
    borderRadius: 100,
    padding: 10,
    opacity: 0.8,
    backgroundColor:'black',
    transform: [          // Offset by half of the child's height and width
        {translateX: -50},
        {translateY: -50}
      ]
  },
  predictedResult: {
    fontSize: 20, 
    color: colors.active_tab
  }
});

export default Result;