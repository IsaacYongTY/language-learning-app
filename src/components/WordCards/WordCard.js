import React, { useState, useEffect } from 'react'
import { Col, Card } from 'react-bootstrap'
import DisplayLanguageBar from './DisplayLanguageBar'
import LanguageSection from './LanguageSection'
import '../../scss/_WordCard.scss'

const WordCard = ( { word, defaultTargetLanguages }) => {

    const [displayLanguage, setDisplayLanguage] = useState([])

    const translation = word.languages.map(translatedWord => (
        displayLanguage.includes(translatedWord.id) &&

        <LanguageSection translatedWord={translatedWord}/>
    ))


    return (
        <Col md={4} lg={3}>
            <Card>

                    <h4 className="text-center my-2">{word.id.toUpperCase()}</h4>
                <div className="image-container">


                    <Card.Img className="mx-0 my-0" src={word.imageUrl} />
                </div>
                <Card.Body>
                    <DisplayLanguageBar
                        displayLanguage={displayLanguage}
                        setDisplayLanguage={setDisplayLanguage}
                        defaultTargetLanguages={defaultTargetLanguages}
                    />
                    {translation}
                </Card.Body>



            </Card>
        </Col>
    )
}

export default WordCard
