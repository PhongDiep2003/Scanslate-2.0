/*
  This file creates the UI for password setting page
*/
import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../../base';
import { auth } from '../../backend/firebase';
import { updatePassword } from 'firebase/auth';
function PasswordSetting({navigation}) {
  //this function updates user's current password to a new password
  const changePassword = async () => {
    if (!newPassword) {
      alert("You haven't entered your new password")
      return
    }
    const user = auth.currentUser
    try {
      await updatePassword(user, newPassword)
      alert('Password is updated successfully')
      setNewPassword('')
      navigation.navigate('Setting')

    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        alert('Please log out and log in again to change password')
      } else {
        console.log(error)
      }
    }
  }
  //a variable that stores input for password
  const [newPassword, setNewPassword] = useState('')
  return (
    <View style={styles.container}>
      {/* Change Password Field */}
      <View style={styles.textField}>
            <TextInput style={styles.textFieldTitle}
                      placeholder='Enter your new password'
                      secureTextEntry
                      clearButtonMode='always'
                      value={newPassword}
                      onChangeText={(text) => setNewPassword(text)}
                      maxLength={40}/>
       </View>
       {/* Change Password button */}
      <TouchableOpacity style={styles.changePasswordBtn} onPress={changePassword}>
        <Text style={{fontSize:20, fontWeight:'bold'}}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.primary,
    paddingTop:20,
    alignItems:'center'
  },
  textField: {
    width: Dimensions.get('window').width - 10,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.bottom_tab,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal: 20
  },
  textFieldTitle: {
    alignSelf:'center', 
    marginLeft:10, 
    fontSize:18,
    width:'100%'
  },
  changePasswordBtn: {
    width:'60%',
    height:'8%',
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 25,
    borderWidth:1,
    borderColor:'black',
    backgroundColor:'#FC7878',
    marginTop:40,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  }
});

export default PasswordSetting;