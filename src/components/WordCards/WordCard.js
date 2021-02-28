import React, { useState, useEffect } from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import DisplayLanguageBar from './DisplayLanguageBar'
import LanguageSection from './LanguageSection'
import '../../scss/_WordCard.scss'

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

                    <h4 className="text-center my-2">{word.word.toUpperCase()}</h4>
                    <Card.Img className="image-container mx-0 my-0" src={word.imageUrl}>

                    </Card.Img>
                <Card.Body>
                    <DisplayLanguageBar displayLanguage={displayLanguage} setDisplayLanguage={setDisplayLanguage}/>
                    {translation}
                </Card.Body>



            </Card>
        </Col>
    )
}

export default WordCard
