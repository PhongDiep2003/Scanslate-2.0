/*
  This file creates the UI that displays the generated label from the classification model for the taken picture
*/
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Image, Text} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useClassification from '../hooks/useClassification';
import { colors } from '../../base';
import Modal from './Modal';
import { auth, db, ref, get, push, query, orderByChild, equalTo, update} from '../../backend/firebase';
//main file 
function Result({route, navigation}) {
  const insets = useSafeAreaInsets()
  const {url} = route.params
  const [existingFlashCard, setExistingFlashCard] = useState(null)
  const {isLoading, label, result} = useClassification(url)
  const [modalForDuplicateResult, setModalForDuplicateResult] = useState(false)
  const userFlashCardRef = ref(db, 'users/' + auth.currentUser.uid + '/flashcards')

  // this function is delcared here to get a global-scope property 
  //this function updates flashcard's current image with a new image if duplicate is found
  const modalForDuplicateResultOkBtn = async () => {
        /* 
          Code to replace image GOES HERE...
        */
        try {
            if (existingFlashCard) {
              //loop through all the existing flashcards, look for the duplicated flashcard and update it
              existingFlashCard.forEach(async (child) => {
                const key = child.key;
                const itemRef = ref(db, `users/${auth.currentUser.uid}/flashcards/${key}`);
                await update(itemRef, {imageUrl: url})
                alert('Image is updated successfully')
              });
            }
        } catch (error) {
          //log error in the console if something goes wrong 
          console.log(error)
          alert('Update image failed')
        } finally {
          setModalForDuplicateResult(false)
        }
  }
  //this function will be called when the cancel button of the modal for duplicate flashcard is pressed 
  const modalForDuplicateResultCancelBtn = async () => setModalForDuplicateResult(false)
  //this function creates flashcard
  const createFlashCard = async (flashcardObject) => {
   try {
     /* 
      Code to create new flashcard GOES HERE...
    */
      //use push() function from firebase/database to create flashcard
      await push(userFlashCardRef, flashcardObject);
      alert('Flashcard is created successfully')
   } catch (error) {
    //log error in the console if something goes wrong 
    console.log(error)
    alert('Create flashcard failed')
   }
  }
  //this function will detect duplicate flashcard
  const checkAndHandleResult = async () => {
    try {
        /* 
        Code to send result to backend for checking its existence GOES HERE...
      */
      // query for the result in the database to check for duplicate
      const queryForFlashcard = query(userFlashCardRef, orderByChild('translatedWord'), equalTo(result))
      const existingFlashcardRef = await get(queryForFlashcard)
      if (!existingFlashcardRef.exists()) {
        //if duplicate is not found
        const newFlashcardObject = {
          'imageUrl': url,
          'translatedWord': result,
          'totalQuizCount': 0,
          'totalScore': 0,
          'correctPercentage': '0%'
        }
        //create flashcard
        createFlashCard(newFlashcardObject)
      } else {
        //if duplicate is found
        setExistingFlashCard(existingFlashcardRef)
        //pop up a modal to ask if a user want to replace the image of their current flashcard to a new image
        setModalForDuplicateResult(true)
      }
    } catch(error) {
      console.log(error)
    }
    
  }
  //navigate to Camera View 
  const navigateToHomePage = () => {
    navigation.navigate('BottomTabView')
  }
  //this function will be invoked after all components finished rendering
  useEffect(() => {
    //check for duplicate right away after the result is sent back from the model
    if (result) {
      checkAndHandleResult()
    }
  },[result])
  
  //if there is no image uri get passed to this page, then go back to camera view. This code ensures that there's always an image uri get sent to the classificaiton model 
  if (!url) {
    navigation.pop(1);
  }
  return (
    //display the loading UI if the result hasn't been sent back from the classification model 
    isLoading ?
                <View style={[styles.container,{backgroundColor: colors.primary}]}>
                    <ActivityIndicator animating={true} color={colors.bottom_tab} size={'large'}  />
                </View>
              : //if result has been sent back, display result 
                
                <View style={[styles.container, {
                                                    paddingTop: insets.top,
                                                    paddingBottom: insets.bottom,
                                                    paddingLeft: insets.left,
                                                    paddingRight: insets.right,
                                                  }]}>
                      <StatusBar barStyle="light-content" animated />
                      {url && <Image source={{uri: url}} style={styles.image} resizeMode='cover'/>}
                      <View style={styles.predictionView}>
                        <Text style={styles.predictedResult}>{label} : {result}</Text>
                      </View>
                      <Button mode='contained' onPress={navigateToHomePage} buttonColor={'black'} textColor={colors.active_tab} labelStyle={styles.finish}>Finish</Button>
                      <Modal 
                              visible={modalForDuplicateResult} 
                              title={`"${result}" is already in your deck`}
                              content={`Click "Ok" to replace image or "No" to close modal`}
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
    color: colors.active_tab,
    flexWrap: 'wrap',
    flex: 1
    
  },
  finish: {
    fontSize: 15, 
    fontWeight: '700'
  }
});

export default Result;