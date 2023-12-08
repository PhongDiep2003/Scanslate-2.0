/*
  This file creates the UI for Quiz page 
*/
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons'; 
import { colors } from '../../base';
import QuizCard from '../components/QuizCard';
import { db, get, auth, ref } from '../../backend/firebase';
function Quiz({navigation}) {
  //a variable that stores a list of flashcards
  const [flashcards, setFlashcards] = useState([])
  //a variable that keeps track of the flashcard the user is currently at
  const [index, setIndex] = useState(0)
  const insets = useSafeAreaInsets()
  const [isCorrect, setIsCorrect] = useState('')

  //this function retrieves all users' flashcards
  const retrieveFlashcards = async () => {
    try {
      const flashcardsRef = ref(db, 'users/' + auth.currentUser.uid + '/flashcards');
      const flashcards = await get(flashcardsRef)
      const flashcardArr = []
      if (flashcards.exists()) {
        flashcards.forEach((child) => {
          const key = child.key
          const {imageUrl, translatedWord, totalQuizCount, totalScore} = child.val()
          const flashcardObject = {
            id: key,
            title: translatedWord,
            imageUrl,
            totalQuizCount,
            totalScore
          }
          flashcardArr.push(flashcardObject)
        })
        setFlashcards(flashcardArr)
      }
    } catch(error) {
      console.log(error)
    }
  }
  //this function will be invoked after all components finished rendering
  useEffect(() => {
    retrieveFlashcards()
  }, [navigation])

  //this function checks if the user's answer matches with the actual answer of the flashcard and return an object that indicate whether the user's asnwer is correct or not
  const handleSubmit = (answer) => {
    /*Code for handling submission GOES HERE... */
    if (answer === flashcards[index]?.title) {
      return {
        isCorrect: true,
        score: 1
      }
    }
    return {
      isCorrect: false,
      score: 0
    }
  }
  //this function goes back to the previous quiz card
  const backButton = () => {
    //can't go back if on first flashcard
    if (index > 0) {
      setIndex(prev => prev - 1) 
      //clear prior answer of previous flashcard before moving to other flashcards
      setIsCorrect('')
    }
  }
  //this function goes to the next quiz card
  const forwardButton = () => {
    //can't go next if on last flashcard
    if (index < flashcards.length - 1) {
      setIndex(prev => prev + 1)
      //clear prior answer of previous flashcard before moving to other flashcards
      setIsCorrect('')
    }
  }
  
  return (
    <Pressable 
                onPress={Keyboard.dismiss}
                style={{flex:1}}
                >
        <View 
                style={[styles.container, {
                  paddingTop: insets.top,
                  paddingBottom: insets.bottom,
                  paddingLeft: insets.left,
                  paddingRight: insets.right,
                }]}>
          <View style={styles.settingAndExitingNavigateBtnContainer}>
              {/* Icon for exiting quiz mode */}
              <Pressable 
                          style={styles.exitingIconContainer}
                          onPress={() => navigation.navigate('Quiz Entry')}>
                  <AntDesign name="close" size={30} color="black" />
              </Pressable>
              {/* Icon for setting */}
              <Pressable 
                          style={styles.settingIconContainer}
                          onPress={() => navigation.navigate('Setting')}>
                  <AntDesign name="user" size={30} color="black" />
              </Pressable>
          </View>
          {/* if there is no flashcards, display "Your deck is empty", otherwise display quiz cards*/}
          {flashcards.length == 0 
                            ? 
                              <View style={{justifyContent:'center', alignItems:'center', flex: 1}}> 
                                <Text style={styles.notFoundText}>Your deck is empty</Text> 
                              </View>
                              
                            :
                              <>
                                {/* Quiz Card */}
                                <KeyboardAvoidingView 
                                                      behavior={Platform.OS === 'ios' ? 'position' : 'height'} 
                                                      contentContainerStyle={ Platform.OS === 'ios' ? styles.keyboardAvoidingView : null}
                                                      style={Platform.OS === 'android' ? styles.keyboardAvoidingView : null} 
                                                      keyboardVerticalOffset={-100}>
                                  <QuizCard 
                                            imageUrl={flashcards[index]?.imageUrl}
                                            id={flashcards[index]?.id}
                                            totalQuizCount={flashcards[index]?.totalQuizCount}
                                            totalScore={flashcards[index]?.totalScore}
                                            onSubmit={handleSubmit}
                                            isCorrect={isCorrect}
                                            setIsCorrect={setIsCorrect}
                                             />
                                </KeyboardAvoidingView>
                                {/* Back Button */}
                                <TouchableOpacity style={[styles.navigateButton, {bottom:0,
                                                                          left:0,
                                                                          marginLeft:10,}]}
                                          onPress={backButton}
                                          >
                                          <AntDesign name="arrowleft" size={50} color="black" style={styles.backButton}/>
                                </TouchableOpacity>
                                {/* Forward Button */}
                                <TouchableOpacity style={[styles.navigateButton, {bottom:0,
                                                                          right:0,
                                                                          marginRight:10}]}
                                          onPress={forwardButton}
                                          >
                                          <AntDesign name="arrowright" size={50} color="black" style={styles.backButton}/>
                                </TouchableOpacity>
                              </>
          }
        </View>
    </Pressable>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.primary,
  },
  keyboardAvoidingView: {
    width:'100%', 
    height:'100%', 
    alignItems:'center', 
  },
  settingAndExitingNavigateBtnContainer: {
    flexDirection:'row', 
    justifyContent:'space-between', 
    marginBottom:20
  },
  settingIconContainer: {
    backgroundColor: colors.bottom_tab,
    padding: 5,
    borderRadius:100,
  },
  exitingIconContainer: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius:100,
  },
  navigateButton: {
    backgroundColor: colors.bottom_tab,
    marginBottom:10,
    borderRadius:100,
    position:'absolute',
    width:'20%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center'
  },
  notFoundText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#424656',
  }
});

export default Quiz;