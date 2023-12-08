/*
  This file creates the UI for the modal that will be popped up to notify users when duplicate flashcards are detected
*/
import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

//main file
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