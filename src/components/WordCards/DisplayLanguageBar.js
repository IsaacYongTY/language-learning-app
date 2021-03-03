import React from 'react'
import { Button } from "react-bootstrap";
import '../../scss/_DisplayLanguageBar.scss'

const DisplayLanguageBar = ({displayLanguage, setDisplayLanguage, userTargetLanguages}) => {

    const handleToggleLanguage = (language) => {
        !displayLanguage.includes(language)
            ?
            setDisplayLanguage(prevState => [...prevState, language])
            :
            setDisplayLanguage(prevState => prevState.filter( selectedLanguage => selectedLanguage !== language ))
    }

    return (
        <div className="mb-4">
            {
                userTargetLanguages?.map((userLanguage => (

                <Button
                    size="sm"
                    className="mr-2"
                    key={userLanguage.id}
                    onClick={() => handleToggleLanguage(userLanguage.id)}
                    variant={displayLanguage.includes(userLanguage.id) ? "dark" :"light"}

                >
                    {userLanguage.id.toUpperCase()}
                </Button>

            )))}

        </div>
    )
}

export default DisplayLanguageBar
