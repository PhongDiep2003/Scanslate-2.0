import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Image, Pressable, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import Logo from '../../images/ScanSlateLogo.png'
import { Text, TextInput, Button } from 'react-native-paper';
import { colors } from '../../base';
function Login({navigation}) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  return (
    <Pressable onPress={Keyboard.dismiss} style={{flex: 1}}>
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
        placeholder='Enter your username'
        clearButtonMode='always'
        value={userName}
        onChangeText={newText => setUserName(newText)}
        style={styles.textInput}
        />

        {/* Passwore Input */}
        <TextInput
        right={<TextInput.Icon 
                                icon="eye" 
                                onPress={() => setPasswordVisibility(prev => !prev)}
                                style={styles.visibilityIcon}
                                />}
        placeholder='Enter your password'
        clearButtonMode='always'
        value={password}
        onChangeText={newText => setPassword(newText)}
        secureTextEntry={passwordVisibility}
        style={styles.textInput}
      />

      {/* Sign up text */}
      <Pressable
                  style={styles.signUpTextContainer}
                  onPress={() => navigation.navigate('Sign up')}>
        <Text 
              variant='labelLarge'
        >Sign up?</Text>
      </Pressable>

      {/* Login Button */}
      <Button 
              mode="contained" 
              onPress={() => navigation.navigate('BottomTabView')}
              buttonColor={colors.bottom_tab}
              style={styles.loginButton}
              textColor='black'
              labelStyle={styles.loginButtonText}
              >
          Login 
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
    alignItems:'center'
  },
  logo: {
   width:150,
   height:150,
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
  signUpTextContainer: {
    width:'80%',
    alignItems:'flex-end',
    marginTop: 10,
  },
  // signUpText: {
  //   fontWeight:'300'
  // }
  loginButton: {
    width: '80%',
    height: '7%',
    borderWidth:1,
    borderColor:'black',
    marginTop:10,
    justifyContent:'center'
  },  
  loginButtonText: {
    color:'black',
    fontWeight:'bold',
    fontSize: 20
    
  }
});

export default Login;