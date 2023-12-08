/*
  This file creates a custome header for screens such as Setting, Profile,... in the app's navigation 
*/
import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { colors } from '../../base';
function Header({navigation, title}) {
  return (
    <Appbar.Header style={styles.headerContainer}>
       {/* Back Button */}
      <Appbar.BackAction onPress={() => navigation.goBack()} style={styles.backButton}/>
       {/* Title */}
      <Appbar.Content title={title} titleStyle={styles.headerTitle}/>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    alignSelf:'flex-start',
    fontSize:30,
  },
  headerContainer: {
    backgroundColor: colors.primary,
  },
  backButton: {
    marginBottom: 12
  }
});

export default Header;