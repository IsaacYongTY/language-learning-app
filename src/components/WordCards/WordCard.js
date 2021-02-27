import React, { useState, useEffect } from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import DisplayLanguageBar from './DisplayLanguageBar'
import LanguageSection from './LanguageSection'

const WordCard = ( { word }) => {

    const [displayLanguage, setDisplayLanguage] = useState([])
    const [ selectedArray, setSelectedArray ] = useState([])



    const translation = word.languages.map(language => (
        displayLanguage.includes(language.code) &&

        <LanguageSection language={language}/>
    ))


    useEffect(() => {
        console.log(displayLanguage)

    },[displayLanguage])

    return (
        <Col md={4} lg={3}>
            <Card>
                <Card.Body>
                    <h4 className="text-center">{word.word.toUpperCase()}</h4>
                    <Card.Img className="image-container img-thumbnail" src={word.imageUrl}>

                    </Card.Img>
                    <DisplayLanguageBar displayLanguage={displayLanguage} setDisplayLanguage={setDisplayLanguage}/>
                    {translation}

                </Card.Body>
            </Card>
        </Col>
    )
}

export default WordCard
