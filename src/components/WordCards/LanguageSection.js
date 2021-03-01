import React from 'react'
import { languageInfo } from "../../lib/mockData";
import { Badge } from 'react-bootstrap'

const LanguageSection = ({ language }) => {

    const languageParams = languageInfo.find(element => element['id'] === language['id'])
    console.log(languageParams)
    let { isGender, writingSystem, name } = languageParams

    return (
        <div>
            <p><Badge>{name}</Badge> {language.word} <span>{language.ipa}</span></p>

            <p>{ isGender && `Feminine: ${language.feminine}`}</p>
            <p>{ writingSystem !== 'latin' && `Romanized: ${language.romanized}` }</p>
            <hr />
        </div>
    )
}

export default LanguageSection
