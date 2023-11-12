import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system'
import {useState, useEffect} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const useClassification = (url) => {
  const [isTfReady, setIsTfReady] = useState(false)
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
          setResult(prediction)
        } catch(error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }
      performClassification()
  },[])

  return {isTfReady, result, isLoading}
}
export default useClassification;