/*
  This file creates the UI for the setting page
*/
import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import { colors } from '../../base';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { auth } from '../../backend/firebase';
import {signOut} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
function Setting({navigation}) {
  //this function logs out of the current account and deletes everything that is stored in local storage
  const logout = async () => {
    try {
      await signOut(auth)
      await AsyncStorage.removeItem('language')
      navigation.navigate('Log in')
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.accountText}>Account</Text>
      <View style={styles.textFieldsContainer}>
          {/* Profile */}
          <TouchableOpacity style={styles.textField} onPress={() => navigation.navigate('Profile')}>
            <View style={styles.textFieldLeftInfo}>
              <AntDesign name="user" size={24} color="black" />
              <Text style={styles.textFieldTitle}>Profile</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
          {/* Change Password */}
          <TouchableOpacity style={styles.textField} onPress={() => navigation.navigate('Password Setting')}>
            <View style={styles.textFieldLeftInfo}>
              <Ionicons name="lock-closed-outline" size={24} color="black" />
              <Text style={styles.textFieldTitle}>Change Password</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
      </View>
      {/* Logout button */}
      <TouchableOpacity style={styles.logOutBtn} onPress={logout}>
        <Text style={{fontSize:20, fontWeight:'bold'}}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingLeft:10
  },
  accountText: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 20
  },
  textFieldsContainer: {
    width:'100%',
    alignItems:'center',
  },
  textField: {
    width: Dimensions.get('window').width - 20,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.bottom_tab,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal: 20
  },
  textFieldLeftInfo: {
    flexDirection:'row'
  },
  textFieldTitle: {
    alignSelf:'center', 
    marginLeft:10, 
    fontSize:18
  },
  logOutBtn: {
    width:'40%',
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

export default Setting;