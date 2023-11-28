import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Image, Pressable, View, ScrollView, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import Logo from '../../images/ScanSlateLogo.png'
import { Text, TextInput, Button, List } from 'react-native-paper';
import { colors } from '../../base';
import supportedLanguages from '../data/supportedLanguages';
import { auth } from '../../backend/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {getDatabase, ref, set} from 'firebase/database'

function Signup({navigation}) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordVisibility1, setPasswordVisibility1] = useState(true)
  const [passwordVisibility2, setPasswordVisibility2] = useState(true)
  const [expanded, setExpanded] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Select your language')
  const handleExpandingList = () => setExpanded(!expanded);

  const addUserToDatabase = async(userId) => {
    try {
      const db = getDatabase();
      set(ref(db, 'users/' + userId), {
      language: selectedLanguage,
      });
    } catch(error) {
      console.log(error)
    }
  }
  // ultilize firebase authentication to perform login and sign up
  const handleSignup = async () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    try {
      if (confirmPassword !== password) {
        alert('Confirm password does not match with password')
        return
      } else if (userName.length < 6 || password.length < 6) {
        alert('Username and password mush have a minimum length of 6')
        return
      } else if (!regex.test(userName)) {
        alert('Username is not a valid email')
        return
      }
      // create new user
      const userCredential = await createUserWithEmailAndPassword(auth, userName, password)
      console.log(userCredential.user.uid)
      addUserToDatabase(userCredential.user.uid)
      alert('New user is created successfully')
      setUserName('')
      setPassword('')
      setConfirmPassword('')
      setSelectedLanguage('Select your language')
      navigation.navigate('Log in')

    }catch(error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('This email address is already in use');
      } 
      else {
        console.error('Error creating user: ', error);
      }
    }
  }
  return (
    <Pressable 
                onPress={Keyboard.dismiss}
                style={{flex:1}}>
        
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                                  behavior={Platform.OS === 'ios' ? 'position' : 'height'} 
                                  contentContainerStyle={ Platform.OS === 'ios' ? styles.keyboardAvoidingView : null}
                                  style={Platform.OS === 'android' ? styles.keyboardAvoidingView : null} 
                                  keyboardVerticalOffset={-200}>
                  {/* Logo */}
                  <Image source={Logo} style={styles.logo} resizeMode={'contain'}></Image>
                  
                  {/* App's name */}
                  <Text variant="displayLarge" style={styles.appName}>ScanSlate</Text>

                  {/* App's slogan */}
                  <Text variant="titleSmall" style={styles.appSlogan}>SCAN NOW, LEARN LATER</Text>

                  {/* Username Input */}
                  <TextInput
                  placeholder='Enter your email'
                  clearButtonMode='always'
                  keyboardType='email-address'
                  value={userName}
                  onChangeText={newText => setUserName(newText)}
                  style={styles.textInput}
                  />

                  {/* Passwore Input */}
                  <TextInput
                  right={<TextInput.Icon 
                                          icon="eye" 
                                          onPress={() => setPasswordVisibility1(prev => !prev)}
                                          style={styles.visibilityIcon}
                                          />}
                  placeholder='Enter your password'
                  clearButtonMode='always'
                  value={password}
                  onChangeText={newText => setPassword(newText)}
                  secureTextEntry={passwordVisibility1}
                  style={styles.textInput}
                />

                {/* Confirm Password Input */}
                <TextInput
                  right={<TextInput.Icon 
                                          icon="eye" 
                                          onPress={() => setPasswordVisibility2(prev => !prev)}
                                          style={styles.visibilityIcon}
                                          />}
                  placeholder='Confirm your password'
                  clearButtonMode='always'
                  value={confirmPassword}
                  onChangeText={newText => setConfirmPassword(newText)}
                  secureTextEntry={passwordVisibility2}
                  style={styles.textInput}
                />

                {/* Expandable Language List  */}
                <View style={styles.languagesListContainer}>
                  <List.Accordion
                    title={selectedLanguage}
                    style={styles.languagesList}
                    expanded={expanded}
                    onPress={handleExpandingList}
                    >
                    <ScrollView style={styles.scrollViewForLanguagesList}>
                      {supportedLanguages.map((language, i) => 
                                                                <List.Item 
                                                                          title ={language.language} 
                                                                          onPress={
                                                                                () => {
                                                                                  setSelectedLanguage(language.value)
                                                                                  handleExpandingList()
                                                                                }
                                                                              }
                                                                            key={i.toString()}
                                                                          />)}
                    </ScrollView>
                  </List.Accordion>
                </View>
                {/* Signup Button */}
                <Button 
                        mode="contained" 
                        onPress={handleSignup}
                        buttonColor={colors.bottom_tab}
                        style={styles.loginButton}
                        textColor='black'
                        labelStyle={styles.loginButtonText}
                        >
                    Sign up
                </Button>
            </KeyboardAvoidingView>
        </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  keyboardAvoidingView: {
    width:'100%', 
    height:'100%', 
    alignItems:'center',
  },
  logo: {
   width: 150,
   height: 150,
   marginTop:40
  },
  appName: {
    fontWeight: 'bold',
    marginTop:10,
    shadowColor: '#c5c5c5',
    shadowOpacity:2,
    shadowOffset: {width: 0, height:5},
    elevation: 10,
  },
  appSlogan: {
    color: '#9370DB'
  },
  textInput: {
    backgroundColor: colors.bottom_tab,
    width: '80%',
    height: 50,
    marginTop: 20,
    paddingTop:3,
    borderWidth: 1,
    borderColor:'black'
  },
  visibilityIcon: {
    top: 3
  },
  languagesListContainer: {
    width:'80%', 
    marginTop:20, 
    backgroundColor:'white'
  },
  languagesList: {
    backgroundColor:colors.bottom_tab, 
    borderWidth: 1,
    borderColor:'black' 
  },
  scrollViewForLanguagesList: {
    width:'100%', 
    height: 150
  },
  loginButton: {
    width: '80%',
    height: '7%',
    borderWidth:1,
    borderColor:'black',
    marginTop:20,
    justifyContent:'center'
  },  
  loginButtonText: {
    color:'black',
    fontWeight:'bold',
    fontSize: 20 
  }


});

export default Signup;