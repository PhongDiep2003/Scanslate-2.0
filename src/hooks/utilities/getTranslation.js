import axios from 'axios';
const options = {
  method: 'GET',
  url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
  headers: {
    'X-RapidAPI-Key': "80b8dcb7bcmshd1d71ec98c1a4f8p15e688jsn4a5be83f4daf",
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