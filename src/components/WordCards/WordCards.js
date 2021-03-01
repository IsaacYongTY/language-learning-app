import React  from 'react'

import WordCard from './WordCard'

import '../../scss/_WordCards.scss'
import { Row } from 'react-bootstrap'

const WordCards = ({ data, defaultTargetLanguages }) => {

    return (
        <Row className="word-cards">
            {
                data.map(word => (
                    <WordCard
                        word={word}
                        defaultTargetLanguages={defaultTargetLanguages}
                    />
                ))
            }
        </Row>
    )
}

export default WordCards
