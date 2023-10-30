import React from 'react';
import { View, StyleSheet, Text} from 'react-native';

function Setting(props) {
  return (
    <View style={styles.container}>
      <Text>Setting</Text>
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

export default Setting;