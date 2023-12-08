/*
  This file creates the UI for profile page
*/
import React from 'react';
import { View, StyleSheet, Dimensions, Text} from 'react-native';
import { colors } from '../../base';
import { auth } from '../../backend/firebase';

function Profile() {
  //use auth property provided by firebase to get access to currentUser object to get their email
  const email = auth.currentUser.email
  const password = '************' 
  return (
    <View style={styles.container}>
      {/* Email Field */}
       <View style={styles.textField}>
            <Text style={styles.textFieldTitle}>Email:  {email}</Text>
       </View>
        {/* Password Field */}
       <View style={styles.textField}>
            <Text style={styles.textFieldTitle}>Password:  {password}</Text>
       </View>
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
    fontSize:18
  },
});

export default Profile;