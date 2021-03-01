import React from 'react'
import { languageInfo } from "../../lib/mockData";
import { Badge } from 'react-bootstrap'

const LanguageSection = ({ translatedWord }) => {

    const languageParams = languageInfo.find(element => element['id'] === translatedWord['id'])

    let { isGender, writingSystem, name } = languageParams

    return (
        <div>
            <p><Badge>{name}</Badge> {translatedWord.word} <span>{translatedWord.ipa}</span></p>

            <p>{ isGender && `Feminine: ${translatedWord.feminine}`}</p>
            <p>{ writingSystem !== 'latin' && `Romanized: ${translatedWord.romanized}` }</p>
            <hr />
        </div>
    )
}

export default LanguageSection
