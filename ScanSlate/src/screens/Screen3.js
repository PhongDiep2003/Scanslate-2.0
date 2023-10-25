import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function Screen3(props) {
  return (
    <View style={styles.container}>
      <Text>Screen 3</Text>
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

export default Screen3;