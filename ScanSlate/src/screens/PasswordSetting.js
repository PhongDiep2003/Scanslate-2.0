import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../base';

function PasswordSetting(props) {
  const changePassword = () => {
    /* Code to change password GOES HERE...*/
    console.log('password is updated')
  }
  //later we will replace the currentPassword with actual password located payload in auth token 
  const currentPassword = 'scanslate123'
  return (
    <View style={styles.container}>
      {/* Change Password Field */}
      <View style={styles.textField}>
            <Text style={styles.textFieldTitle}>Change Password:  {currentPassword}</Text>
       </View>
       {/* Logout button */}
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
    fontSize:18
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