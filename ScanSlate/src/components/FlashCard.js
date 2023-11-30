import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text, Pressable} from 'react-native';
import { colors } from '../../base';
const { width, height } = Dimensions.get('window');
import { Feather } from '@expo/vector-icons';

const FlashCard = ({ id, imageUrl, title, onDelete, correctPercentage}) => {

  return(
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.cardImage}
        resizeMode='contain'
      />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.quizScore}>Quiz Score: {correctPercentage}</Text>
      </View>

      <Pressable style={styles.deleteIconContainer}
                onPress={onDelete}>
            <Feather name="trash-2" size={30} color="black" />
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    width: width - 40 , // Take up the whole width of the screen minus some margin
    margin:20,
    borderRadius: 20,
    backgroundColor: colors.flashCard, // Adjust the background color as needed
    alignItems: 'center',
    paddingTop: 50,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
    borderColor: '#000',
    borderWidth:1,
    height: height - 110
  },
  cardImage: {
    width: '100%',
    height: '70%', // Adjust the height as needed
    
  },
  cardTextContainer: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardCorrect: {
    fontSize: 18,
    textAlign: 'center',
  },
  deleteIconContainer: {
    backgroundColor: '#FC7878',
    padding: 5,
    borderRadius:'100%',
    position:'absolute',
    top: 0,              // Align to the top of the container
    right: 0,            // Align to the right of the container
  },
  quizScore: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default FlashCard;