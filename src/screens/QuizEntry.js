import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Image, Pressable} from 'react-native';
import { colors } from '../../base';
import QuizIcon from '../../images/quizIcon.png'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons'; 
function QuizEntry({navigation}) {
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.container, {
                                      paddingTop: insets.top,
                                      paddingBottom: insets.bottom,
                                      paddingLeft: insets.left,
                                      paddingRight: insets.right,
                                    }]}>
      <Image source={QuizIcon} style={styles.quizIcon} resizeMode='contain'/>
      <View>
        <Text style={styles.greeting}>Let's quiz your learning!</Text>
        <TouchableOpacity 
                          style={styles.startBtn}
                          onPress={() => navigation.navigate('Quiz Page')}>
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>
      </View>
      {/* Icon for setting */}
      <Pressable style={[styles.settingIconContainer, {top: insets.top, right:insets.right}]}
                 onPress={() => navigation.navigate('Setting')}>
                <AntDesign name="user" size={30} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:'center',
    backgroundColor:colors.primary,
  },
  greeting: {
    fontSize: 50,
    fontWeight: '600',
    color: '#424656',
    alignSelf:'center'
  },
  startBtn: {
    marginTop: 40,
    width: 250,
    height:80,
    backgroundColor:'#A6ABBD',
    borderWidth: 1,
    borderColor:'#424656',
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  startText: {
    fontSize:20,
    color:'#424656',
    fontWeight:'600'
  },
  quizIcon: {
    width:'60%',
    height:200,
    marginBottom:20,
    marginTop:30
  },
  settingIconContainer: {
    backgroundColor: colors.bottom_tab,
    padding: 5,
    borderRadius:100,
    position:'absolute',
  },
});

export default QuizEntry;