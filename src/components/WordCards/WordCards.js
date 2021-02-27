import React, { useState } from 'react'

import '../../scss/_WordCards.scss'
import WordCard from './WordCard'
import { Row } from 'react-bootstrap'
const WordCards = ({ data }) => {

    return (
        <Row className="word-cards">
            {
                data.map(word => (
                    <WordCard word={word}/>

                ))
            }
        </Row>


    )
}

export default WordCards
