import React, { useState } from 'react'
import { languageInfo } from "../../lib/mockData";
import { Card, Badge } from 'react-bootstrap'
import { capitalizeWord, ipaDict } from "../../lib/library";
import ipaDictEN from 'ipa-dict/lib/en_US'
import ipaDictZhHans from 'ipa-dict/lib/zh_hans'


const LanguageSection = ({ language }) => {


    console.log(ipaDict.en.get('cat'))
    const languageParams = languageInfo.find(element => element['code'] === language['code'])
    console.log(languageParams)
    let { isGender, writingSystem, languageName } = languageParams
    languageName = capitalizeWord(languageName)
    return (
        <div>
            <p><Badge>{languageName}</Badge> {language.word} <span>{ipaDict[language.code].get(language.word)}</span></p>

            <p>{ isGender && `Feminine: ${language.feminine}`}</p>
            <p>{ writingSystem !== 'latin' && `Romanized: ${language.romanized}` }</p>
            <hr />
        </div>
    )
}

export default LanguageSection
