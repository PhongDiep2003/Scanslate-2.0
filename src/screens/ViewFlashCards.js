/*
  This file creates the UI that displays flashcards
*/
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text, FlatList} from 'react-native';
import FlashCard from '../components/FlashCard';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from '../../base';
import { AntDesign } from '@expo/vector-icons'; 
import { db,get, auth, ref, remove } from '../../backend/firebase';

const ViewFlashCards = ({navigation}) => {
  // a variable that stores a list of flashcards
  const [flashcards, setFlashcards] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const insets = useSafeAreaInsets()
  
  //this function retrieves all the flashcards from the database
  const retrieveFlashcards = async () => {
    try {
      const flashcardsRef = ref(db, 'users/' + auth.currentUser.uid + '/flashcards');
      const flashcards = await get(flashcardsRef) 
      const flashcardArr = []
      if (flashcards.exists()) {
      flashcards.forEach((child) => {
        const key = child.key
        const {imageUrl,translatedWord, correctPercentage} = child.val()
        const flashcardObject = {
          id: key,
          title: translatedWord,
          imageUrl,
          correctPercentage

        }
        flashcardArr.push(flashcardObject)
      })
      setFlashcards(flashcardArr)
    }

    } catch(error) {
      console.log(error)
      alert('Retrieve flashcards failed')
    }
    
  }
  //this function performs flashcard deletion
  const deleteFlashcard = async (card) => {
    try {
      /* Code to delete flashcard GOES HERE...*/
      const flashCardRef = ref(db, 'users/' + auth.currentUser.uid + '/flashcards/' + card.id)
      await remove(flashCardRef)
      setFlashcards(flashcards.filter(flashcard => flashcard.id !== card.id));
      alert('Flashcard is removed successfully')
    }
    catch(error) {
      console.log(error)
      alert('Delete flashcard failed')
    }

  }
  //this file will be invoked after all components finished rendering
  useEffect(() => {
    retrieveFlashcards()
  },[navigation])
  return (
          <View style={[styles.container, {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          }]}>
                <FlatList
                  data={flashcards}
                  renderItem={({item}) => <FlashCard {...item}
                              onDelete={() => deleteFlashcard(item)} /> }
                  pagingEnabled
                  keyExtractor={card => card.id }
                  horizontal
                  style={styles.scrollView}
                  onRefresh={retrieveFlashcards}
                  refreshing={refreshing}
                  />
                {/* Icon for setting */}
                <Pressable 
                            style={[styles.settingIconContainer, {top: insets.top, right:insets.right}]}
                            onPress={() => navigation.navigate('Setting')}>
                                  <AntDesign name="user" size={30} color="black" />
                </Pressable>

                {flashcards.length === 0 && 
                <Text style={styles.notFoundText}>
                              No flashcards
                </Text>}
          </View>
      
        );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.primary
  },
  scrollView: {
    flex: 1,
  },
  settingIconContainer: {
    backgroundColor: colors.bottom_tab,
    padding: 5,
    borderRadius: 100,
    position:'absolute',
  },
  notFoundText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#424656',
    position:'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -120 }]
  }
});


export default ViewFlashCards;