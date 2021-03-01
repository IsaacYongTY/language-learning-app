import ipaDictEnUs from 'ipa-dict/lib/en_US'
import ipaDictEs from 'ipa-dict/lib/es_ES'
import ipaDictZhHans from 'ipa-dict/lib/zh_hans'
import ipaDictVi from 'ipa-dict/lib/vi_S'
import firebase from './firebase'

const db = firebase.firestore()
const storage = firebase.storage()

export const capitalizeWord = (word) => word.split('').map((char, index) => !index ? char.toUpperCase() : char).join('')

export const ipaDict = {
    en: ipaDictEnUs,
    es: ipaDictEs,
    zh: ipaDictZhHans,
    vi: ipaDictVi
}

export const convertToIpa = (words, targetLanguage) => {

    return words.split(' ').map(word => ipaDict[targetLanguage].get(word)).join(' ')
}

export const getUserProfile = async (collection, uid) => {

    const collectionData = await db.collection(collection).doc(uid).get()

    if(collectionData.exists) {
        return collectionData.data()
    }   else {
        //throw error
    }

}

const {Translate} = require('@google-cloud/translate').v2;
const CREDENTIALS = JSON.parse(process.env.REACT_APP_GOOGLE_APPLICATION_CREDENTIALS)

const translate = new Translate(
    {
        credentials: CREDENTIALS,
        projectId: CREDENTIALS.project_id
    }

);

export async function translateText(text,target, setTranslatedText) {

    let [translations] = await translate.translate(text, target);

    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:');
    translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`);
    });

    setTranslatedText(prevState => ({...prevState, [target]: translations.join(',') }))
}

export const addToStorage = async (collection, file, id, data) => {
    console.log()
    const storageRef = storage.ref()

    await storageRef.child(`default-deck/${id}/${id}.jpg`).put(file)

    const imageUrl = await storageRef.child(`default-deck/${id}/${id}.jpg`).getDownloadURL()



        data[`imageUrl`] = imageUrl



     await db.collection(collection).doc(id).set(data)

}


export const getCollectionData = async (collection, setData) => {

    const collectionData = await db.collection(collection)

    collectionData.onSnapshot((querySnapshot) => {
        let resultArray = []
            console.log(querySnapshot.size)
         querySnapshot.forEach(doc => {
            console.log(doc.data())
             resultArray.push(doc.data())
         })

        setData(resultArray)



    })



}