/*
  This is a custome hook that will take a passed url, send it to the classfication model as well as call the getTranslation function to get the final label in the user's desired language
*/
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system'
import {useState, useEffect} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import getTranslation from './utilities/getTranslation';
import AsyncStorage from '@react-native-async-storage/async-storage';
const useClassification = (url) => {
  const [isTfReady, setIsTfReady] = useState(false)
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [label, setLabel] = useState('')
  //prepare and load model
  const prepare = async () => {
    try {
      await tf.ready()
      const imageClassifyModel = await mobilenet.load()
      setIsTfReady(true)
      return imageClassifyModel
    } catch(error) {
      throw new Error("Couldn't initilize classification model")
    }
  }
  //classify image
  const classifyImage = async (url, model) => {
    try {
      const response = await FileSystem.readAsStringAsync(url, { encoding: FileSystem.EncodingType.Base64})
      const imageData = new Uint8Array(Buffer.from(response, 'base64'))
      const imageTensor = decodeJpeg(imageData)
      const prediction = await model.classify(imageTensor)
      return prediction
    } catch(error) {
      throw new Error("Failed to classify image")
    }
  }

  useEffect(() => {
      const performClassification = async () => {
        try {
          setIsLoading(true)
          const imageClassifyModel = await prepare()
          const prediction = await classifyImage(url, imageClassifyModel)
          setLabel(prediction[0]?.className.split(', ')[0].trim().toLowerCase())
          if (prediction) {
            const translatedLanguage = await AsyncStorage.getItem('language')
            //if user's desired language is english, then no need to send the label to translation API
            if (translatedLanguage === 'en') {
              setResult(label);
            }
            else {
              //call getTranslation() function to get translation for the label 
              const translatedWord = await getTranslation(prediction[0]?.className.split(', ')[0].trim().toLowerCase(), translatedLanguage)
              setResult(translatedWord.trim().toLowerCase())
            }
          }
        } catch(error) {
          console.log(error)
        } finally {
          //remove the loading UI after everything is done
          setIsLoading(false)
        }
      }
      performClassification()
  },[])

  return {isTfReady, result, isLoading, label}
}
export default useClassification;