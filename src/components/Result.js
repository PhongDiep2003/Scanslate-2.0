import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Image, Text} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useClassification from '../hooks/useClassification';
import { colors } from '../../base';
import Modal from './Modal';
import { auth, db, ref, get, set, push, query, orderByChild, equalTo, update} from '../../backend/firebase';

function Result({route, navigation}) {
  const insets = useSafeAreaInsets()
  const {url} = route.params
  const [existingFlashCard, setExistingFlashCard] = useState(null)
  const {isLoading, result, label} = useClassification(url)
  const [modalForDuplicateResult, setModalForDuplicateResult] = useState(false)
  const userFlashCardRef = ref(db, 'users/' + auth.currentUser.uid + '/flashcards')

  // this function is delcared here to get a global-scope property 
  const modalForDuplicateResultOkBtn = async () => {
        /* 
          Code to replace image GOES HERE...
        */
        try {
            if (existingFlashCard) {
              existingFlashCard.forEach(async (child) => {
                const key = child.key;
                const itemRef = ref(db, `users/${auth.currentUser.uid}/flashcards/${key}`);
                await update(itemRef, {imageUrl: url})
                alert('Image is updated successfully')
              });
            }
        } catch (error) {
          console.log(error)
          alert('Update image failed')
        } finally {
          setModalForDuplicateResult(false)
        }
  }

  const modalForDuplicateResultCancelBtn = async () => setModalForDuplicateResult(false)

  const createFlashCard = async (flashcardObject) => {
   try {
     /* 
      Code to create new flashcard GOES HERE...
      display a popup to indicate the flashcard is created successfully 
    */
      await push(userFlashCardRef, flashcardObject);
      alert('Flashcard is created successfully')
   } catch (error) {
    console.log(error)
    alert('Create flashcard failed')
   }
  }

  const checkAndHandleResult = async () => {
    try {
        /* 
        Code to send result to backend for checking its existence GOES HERE...
      */
      // query for the result in the database to check for its existence 
      const queryForFlashcard = query(userFlashCardRef, orderByChild('translatedWord'), equalTo(result))
      const existingFlashcardRef = await get(queryForFlashcard)
      //if the result (flashcard) is already existed
      if (!existingFlashcardRef.exists()) {
        // if flashcard is not existed
        const newFlashcardObject = {
          'imageUrl': url,
          'translatedWord': result,
          'totalQuizCount': 0,
          'totalScore': 0,
          'correctPercentage': '0%'
        }
        createFlashCard(newFlashcardObject)
      } else {
        // otherwise
        // pop up a modal to ask if a user want to replace the image of their current flashcard to a new image
        setExistingFlashCard(existingFlashcardRef)
        setModalForDuplicateResult(true)
      }
      
    } catch(error) {
      console.log(error)
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
    if (result) {
      checkAndHandleResult()
    }
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
                        <Text style={styles.predictedResult}>{label} : {result}</Text>
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
    fontWeight: '700'
  }
});

export default Result;