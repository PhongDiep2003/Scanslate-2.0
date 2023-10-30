import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

function Screen1({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Screen 1</Text>
      <Button title='Setting' onPress={() => navigation.navigate('Setting')}></Button>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default Screen1;