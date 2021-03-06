import React  from 'react'

import WordCard from './WordCard'

import '../../scss/_WordCards.scss'
import { Row } from 'react-bootstrap'

const WordCards = ({ data, filter, userTargetLanguages }) => {

    return (
        <Row className="word-cards">
            {
                data.filter(word => word.category === filter).map(word => (
                    <WordCard
                        word={word}
                        userTargetLanguages={userTargetLanguages}
                    />
                ))
            }
        </Row>
    )
}

export default WordCards
