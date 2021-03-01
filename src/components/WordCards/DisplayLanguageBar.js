import React from 'react'
import { Button } from "react-bootstrap";
import '../../scss/_DisplayLanguageBar.scss'

const DisplayLanguageBar = ({displayLanguage, setDisplayLanguage, defaultTargetLanguages}) => {

    const handleToggleLanguage = (language) => {

        !displayLanguage.includes(language) ?

            setDisplayLanguage(prevState => [...prevState, language])
            :
            setDisplayLanguage(prevState => prevState.filter( selectedLanguage => selectedLanguage !== language ))

    }

    return (
        <div className="mb-4">
            {
                defaultTargetLanguages?.map((defaultLanguage => (

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
