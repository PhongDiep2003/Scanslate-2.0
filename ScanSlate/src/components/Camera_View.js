import React from 'react';
import { View, StyleSheet, Text, Pressable} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons'; 
import { useRef, useState, useEffect } from 'react';
function Camera_View({image, setImage}) {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  
  // Ask permission immediately from users for accessing camera when the page just finishes rendering 
  useEffect(() => {
    const askPermissions = async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    }
    askPermissions()
  },[])

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync()
        // setImage(data.uri)
        console.log(data.uri)
      }
      catch(e) {
        console.log(e)
      }
    }
  }

  // if hasCameraPermission is true => open the camera
  // if hasCameraPermission is false => display an alert noticing the permission hasn't been granted
  return (
    //container
    <View style={styles.container}>
        {
          hasCameraPermission ? 
                                  //Camera
                                  <Camera 
                                        type={CameraType.back} 
                                        ref={cameraRef}
                                        style={styles.camera}>
                                                {/* Take picture button */}
                                                <Pressable
                                                  onPress={takePicture}> 
                                                  <Ionicons 
                                                            name="radio-button-on-outline" 
                                                            size={100} 
                                                            color="white" 
                                                            style={styles.takePictureButton}/>
                                                </Pressable>
                                    </Camera>
                              :
                                <Text>Permission hasn't been granted</Text>
        }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex:1, 
    height:'100%',
    width:'100%',
    borderRadius:20, 
    justifyContent:'flex-end', 
    alignItems:'center'
  },
  takePictureButton: {
    marginBottom: 100 
  }
})
export default Camera_View;