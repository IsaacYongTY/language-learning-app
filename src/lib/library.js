import ipaDictEnUs from 'ipa-dict/lib/en_US'
import ipaDictEs from 'ipa-dict/lib/es_ES'
import ipaDictZhHans from 'ipa-dict/lib/zh_hans'
import ipaDictVi from 'ipa-dict/lib/vi_S'
import ipaDictFr from 'ipa-dict/lib/fr_FR'
import ipaDictJa from 'ipa-dict/lib/ja'
import ipaDictKo from 'ipa-dict/lib/ko'

import firebase from './firebase'

const db = firebase.firestore()
const storage = firebase.storage()

export const capitalizeWord = (words) => words.split(' ').map( word => word.split('').map((char, index) => !index ? char.toUpperCase() : char).join('')).join(' ')


export const convertToIpa = (words, targetLanguage) => {

    const ipaDict = {
        en: ipaDictEnUs,
        es: ipaDictEs,
        zh: ipaDictZhHans,
        vi: ipaDictVi,
        fr: ipaDictFr,
        ja: ipaDictJa,
        ko: ipaDictKo
    }
    console.log(words)
    console.log(targetLanguage)
    return words.split(' ').map(word => ipaDict[targetLanguage]?.get(word)).join(' ')
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


    setTranslatedText(prevState => (
        [
            ...prevState,
            {
                id: target,
                word: translations.join(','),
                ipa: convertToIpa(translations.join(','), target)
            }
        ]
    ))
}


export const addToStorage = async (collection, blob, id, data) => {

    const storageRef = storage.ref()

    await storageRef.child(`default-deck/${id}/${id}.jpg`).put(blob)

    const imageUrl = await storageRef.child(`default-deck/${id}/${id}.jpg`).getDownloadURL()

    data[`imageUrl`] = imageUrl

    return await db.collection(collection).doc(id).set(data)

}

export const getUserProfile = async (collection, uid, setUserProfile) => {


    // db.collection(collection).doc(uid).onSnapshot(doc => {
    //     setUserProfile(doc.data())
    //     result = doc.data()
    //
    // })

    return db.collection(collection).doc(uid).get().then(doc => {
        return doc.data()
    })


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

export const saveUserTargetLanguages = (collection, id, userTargetLanguages) => {
   db.collection(collection).doc(id).update({ userTargetLanguages }).then((response) => {
       console.log(response)

       return { status: 201}
   }).catch(error => {
       console.log('Failed')
       return { status: 500}
   })




}


