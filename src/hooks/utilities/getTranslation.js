/*
  This file create a function that send the label generated from the classification model to the translation API to get the translated label 
*/
import {API_TRANSLATION_KEY} from '@env'
import axios from 'axios';
const options = {
  method: 'GET',
  url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
  headers: {
    'X-RapidAPI-Key': API_TRANSLATION_KEY,
    'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
  }
};
export default getTranslation = async (word, translatedLanguage) => {
  try {
    const response = await axios.request({
      ...options,
      params: {
        langpair: `en|${translatedLanguage}`,
        q: word,
        mt: '1',
        onlyprivate: '0',
        de: 'a@b.c'
      },
    });
    return response.data.matches[0].translation
  } catch (error) {
    console.error(error);
  }

} 