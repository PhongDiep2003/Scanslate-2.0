import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';

function Modal({visible,title, content, ok, cancel}) {
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
            <Text 
                  variant="bodyMedium">
                      {content}
            </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={cancel}>Cancel</Button>
          <Button onPress={ok}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

// const styles = StyleSheet.create({
//   container: {}
// });

export default Modal;