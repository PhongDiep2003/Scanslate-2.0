import React, {useState} from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons'; 
import { colors } from '../../base';
import QuizCard from '../components/QuizCard';
function Quiz({navigation}) {
  const handleSubmit = () => {
    /*Code for handling submission GOES HERE... */
    console.log('answer is submitted')
  }
  const backButton = () => {
    if (index > 0) setIndex(prev => prev - 1)
  }
  const forwardButton = () => {
    if (index < data.length - 1) setIndex(prev => prev + 1)
  }
  /*Fake data */
  const data = [
    {
      imageUrl: 'file:///var/mobile/Containers/Data/Application/7DA7B9D1-635B-4D08-9C7E-6F8D3D990D0B/Library/Caches/ExponentExperienceData/%2540anonymous%252FScanSlate-4591f8de-6b03-4a48-8022-c9c819e2e138/Camera/A9EC2DAD-3FC8-414C-A928-62B872FC0DEB.jpg'
    },
    {
      imageUrl: 'file:///var/mobile/Containers/Data/Application/7DA7B9D1-635B-4D08-9C7E-6F8D3D990D0B/Library/Caches/ExponentExperienceData/%2540anonymous%252FScanSlate-4591f8de-6b03-4a48-8022-c9c819e2e138/Camera/2D359EDA-05FB-4807-B1A2-D08117B95306.jpg'
    },
    {
      imageUrl: 'file:///var/mobile/Containers/Data/Application/7DA7B9D1-635B-4D08-9C7E-6F8D3D990D0B/Library/Caches/ExponentExperienceData/%2540anonymous%252FScanSlate-4591f8de-6b03-4a48-8022-c9c819e2e138/Camera/051CF4B1-00B2-4EC4-AC88-FB8576A53C3A.jpg'
    }
  ]
  const [index, setIndex] = useState(0)
  const insets = useSafeAreaInsets()
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
          {data.length == 0 
                            ? 
                              <Text style={styles.notFoundText}>Your deck is empty</Text> 
                            :
                              <>
                                {/* Quiz Card */}
                                <KeyboardAvoidingView 
                                                      behavior={Platform.OS === 'ios' ? 'position' : 'height'} 
                                                      contentContainerStyle={ Platform.OS === 'ios' ? styles.keyboardAvoidingView : null}
                                                      style={Platform.OS === 'android' ? styles.keyboardAvoidingView : null} 
                                                      keyboardVerticalOffset={-100}>
                                  <QuizCard 
                                            imageUrl={data[index]?.imageUrl}
                                            onSubmit={handleSubmit} />
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
    borderRadius:'100%',
  },
  exitingIconContainer: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius:'100%',
  },
  navigateButton: {
    backgroundColor: colors.bottom_tab,
    marginBottom:10,
    borderRadius:'100%',
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