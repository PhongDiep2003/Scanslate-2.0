import React from 'react';
import { View, StyleSheet, Text, Button} from 'react-native';

function Screen3({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Screen 3</Text>
      <Button title='Setting' onPress={() => navigation.navigate('Setting')}/>
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