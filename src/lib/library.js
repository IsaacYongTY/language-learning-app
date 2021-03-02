import ipaDictEnUs from 'ipa-dict/lib/en_US'
import ipaDictEs from 'ipa-dict/lib/es_ES'
import ipaDictZhHans from 'ipa-dict/lib/zh_hans'
import ipaDictVi from 'ipa-dict/lib/vi_S'
import firebase from './firebase'

const db = firebase.firestore()
const storage = firebase.storage()

export const capitalizeWord = (words) => words.split(' ').map( word => word.split('').map((char, index) => !index ? char.toUpperCase() : char).join('')).join(' ')

export const ipaDict = {
    en: ipaDictEnUs,
    es: ipaDictEs,
    zh: ipaDictZhHans,
    vi: ipaDictVi
}

export const convertToIpa = (words, targetLanguage) => {

    return words.split(' ').map(word => ipaDict[targetLanguage].get(word)).join(' ')
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

export const getUserProfile = async (collection, uid, setUserProfile) => {

    let result = ''
    db.collection(collection).doc(uid).onSnapshot(doc => {
        setUserProfile(doc.data())
        result = doc.data()

    })

    return result
}

export const getCollectionData = async (collection, setData) => {

    db.collection(collection).onSnapshot((querySnapshot) => {
        let resultArray = []

         querySnapshot.forEach(doc => {
             resultArray.push(doc.data())
         })

        setData(resultArray)

    })
}

export const getTargetLanguages = async (collection) =>  await db.collection(collection).get().then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))

export const saveUserTargetLanguages = async (collection, id, userTargetLanguages) => await db.collection(collection).doc(id).update({ userTargetLanguages })


