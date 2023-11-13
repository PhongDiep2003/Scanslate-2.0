import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Image, Text} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useClassification from '../hooks/useClassification';
import { colors } from '../../base';
import Modal from './Modal';
function Result({route, navigation}) {
  const insets = useSafeAreaInsets()
  const {url} = route.params
  const {isLoading, result} = useClassification(url)
  const [modalForDuplicateResult, setModalForDuplicateResult] = useState(false)
  const modalForDuplicateResultOkBtn = async () => {
    /* 
      Code to replace image GOES HERE...
    */
    setModalForDuplicateResult(false)
  }
  const modalForDuplicateResultCancelBtn = async () => setModalForDuplicateResult(false)
  const createFlashCard = async () => {
    /* 
      Code to create new flashcard GOES HERE...
      display a popup to indicate the flashcard is created successfully 
    */
  }
  const checkResultExisting = async () => {
    if (result) {
      /* 
        Code to send result to backend for checking its existence GOES HERE...
      */
      // setModalForDuplicateResult(true)
      console.log(result)
      console.log(url)
    }
  }
  const navigateToHomePage = () => {
    navigation.navigate('BottomTabView')
  }
  useEffect(() => {
    /*
       After the model generated the result, send the result to the backend to check for its existence
       if response is true, display a popup to ask if users want to update image
       else create flashcard obj and send it to backend
    */
    checkResultExisting()
  },[result])
  
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
                        <Text style={styles.predictedResult}>{result}</Text>
                      </View>
                      <Button mode='contained' onPress={navigateToHomePage} buttonColor={'black'} textColor={colors.active_tab} labelStyle={styles.finish}>Finish</Button>
                      <Modal 
                              visible={modalForDuplicateResult} 
                              title={`"${result}" is already in your deck`}
                              content={`Click "Ok" to replace image or "No" to shut down the modal`}
                              ok={modalForDuplicateResultOkBtn}
                              cancel={modalForDuplicateResultCancelBtn}/>
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
  },
  finish: {
    fontSize: 15, 
    fontWeight:1
  }
});

export default Result;