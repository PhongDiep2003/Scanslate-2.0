import React from 'react';
import {View, StyleSheet, Pressable, Dimensions, Platform, Linking, StatusBar, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import { useRef, useEffect } from 'react';
import { colors } from '../../base';
import Toast from 'react-native-toast-message';



// In order to render camera feed without distortion, 16:9 ratio
// should be used fo iOS devices and 4:3 ratio should be used for android
// devices.
const IS_IOS = Platform.OS === 'ios';
const CAM_PREVIEW_WIDTH = Dimensions.get('window').width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);


//a function that open the setting app in mobile device
async function openSettings() {
  try {
    await Linking.openSettings();
  } catch(error) {
    Toast.show({
      type: 'error',
      text1: 'Failed to open settings'
    })
  }
}


function Camera_View({image, setImage, navigation}) {
  // get the current insets (or padding values) needed to avoid the system UI
  const insets = useSafeAreaInsets()
  //declare a variable that represent the permission to accesscamera
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const cameraRef = useRef(null);
  //a function that will be called automatically when the page just finished loading components
  useEffect(() => {
    if (!permission || !permission?.granted) {
      requestPermission()
    }
  },[])
  // a function that will handle when users take the picture
  const takePicture = async () => {
    try {
      if (cameraRef && cameraRef?.current) {
        const image = await cameraRef.current.takePictureAsync()
        //navigate to the result page, which is the page that will handle all the classification stuffs 
        navigation.navigate('ClassifyImage', {url: image.uri})
      }
    } catch(error) {
      Toast.show({
        type: 'error',
        text1:'Failed to take picture'
      })
    }
  }

  // if hasCameraPermission is true => display camera
  // if hasCameraPermission is false => display a separated UI that requires user to grant camera permission
  return (
          permission && permission.granted ? 
                                <View style={[styles.container, { 
                                                                      paddingTop: insets.top,
                                                                      paddingBottom: insets.bottom,
                                                                      paddingLeft: insets.left,
                                                                      paddingRight: insets.right
                                                                 }]}>
                                        <StatusBar barStyle="light-content" animated />
                                        <Camera 
                                              type= {CameraType.back}
                                              ref={cameraRef}
                                              style={styles.camera}>
                                                      <View style={styles.buttonsView}>
                                                          {/* Take picture button */}
                                                          <TouchableOpacity
                                                            onPress={takePicture}> 
                                                            <Ionicons 
                                                                      name="radio-button-on-outline" 
                                                                      size={100} 
                                                                      color="white" 
                                                                      style={styles.takePictureButton}/>
                                                          </TouchableOpacity>
                                                      </View>
                                                      {/* Icon for setting */}
                                                      <Pressable style={styles.settingIconContainer}
                                                                    onPress={() => navigation.navigate('Setting')}>
                                                                <AntDesign name="user" size={30} color="black" />
                                                      </Pressable>
                                          </Camera>
                                  </View>
                              :
                              <View style={[styles.container, { 
                                                                  paddingTop: insets.top,
                                                                  paddingBottom: insets.bottom,
                                                                  paddingLeft: insets.left,
                                                                  paddingRight: insets.right,
                                                                  backgroundColor:colors.primary
                                                                }]}>
                                          <StatusBar barStyle="light-content" animated />
                                          <Button
                                                  mode="contained" 
                                                  onPress={() => openSettings()}
                                                  buttonColor={colors.bottom_tab}
                                                  textColor='black'
                                                  >
                                                      Enable Camera Permission
                                                  </Button>
                              </View>
          

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative',
    width: CAM_PREVIEW_WIDTH,
    height: CAM_PREVIEW_HEIGHT,
    backgroundColor: 'black'
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
    
  },
  settingIconContainer: {
    backgroundColor: colors.bottom_tab,
    padding: 5,
    borderRadius:'100%',
    position:'absolute',
    right: 0,
    top:0
  },
  buttonsView: {
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center', 
    width:'100%', 
    marginBottom: 100, 
    position:'relative'
  }
})
export default Camera_View;