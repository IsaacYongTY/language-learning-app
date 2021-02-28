import React, { useState } from 'react'
import {Button} from "react-bootstrap";
import '../../scss/_DisplayLanguageBar.scss'
const DisplayLanguageBar = ({displayLanguage, setDisplayLanguage}) => {

    const handleToggleLanguage = (language) => {

        !displayLanguage.includes(language) ?

            setDisplayLanguage(prevState => [...prevState, language])
            :
            setDisplayLanguage(prevState => prevState.filter( selectedLanguage => selectedLanguage !== language ))

    }

    const defaultLanguageSet = ['en', 'es', 'zh']

    return (
        <div className="mb-4">
            {
                defaultLanguageSet.map((defaultLanguage => (

                <Button
                    onClick={() => handleToggleLanguage(defaultLanguage)}
                    variant={displayLanguage.includes(defaultLanguage) ? "dark" :"light"}
                >
                    {defaultLanguage.toUpperCase()}
                </Button>

            )))}

        </div>
    )
}

export default DisplayLanguageBar
