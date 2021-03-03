import React, { useEffect, useState } from 'react'

import { Container, Button, Badge, Row, Col, Form, Alert } from "react-bootstrap";
import { saveUserTargetLanguages } from "../lib/library";

import '../scss/_SettingsPage.scss'


const SettingPage = ({userProfile, setUserProfile, systemTargetLanguages, setSystemTargetLanguages}) => {

    const [ selectedTargetLanguages, setSelectedTargetLanguages ] = useState([...userProfile.userTargetLanguages])
    const [ isMaxed, setIsMaxed ] = useState(false)
    const [ isAlertShow, setIsAlertShow ] = useState(false)

    useEffect(() => {

    },[selectedTargetLanguages])

    let { name } = userProfile

    const maxLanguageCount = userProfile.status === 'admin' ? 100 : 5

    const handleSelectLanguages = (lang) => {

        if(selectedTargetLanguages.length === maxLanguageCount && !selectedTargetLanguages.find(targetLanguage => targetLanguage.id === lang.id)) {
            setIsMaxed(true)
            return
        }

        selectedTargetLanguages.find(targetLanguage => targetLanguage.id === lang.id)
            ?
            setSelectedTargetLanguages(prevState => prevState.filter(selectedLang => selectedLang.id !== lang.id))
            :
            setSelectedTargetLanguages(prevState => [...prevState, lang])

        setIsMaxed(false)

    }

    const handleSaveSettings = () => {
        saveUserTargetLanguages('users', userProfile.id, selectedTargetLanguages).then((response) => {
            console.log(response)
        })
        setIsAlertShow(true)

        setTimeout(() => {
            setIsAlertShow(false)
        },3000)

    }

    const handleTest = () => {
        console.log('in')
        setIsAlertShow(true)
    }

    const generateLanguageCol = (supportedLanguages) =>
        supportedLanguages
            .map(lang => (

                <Col>
                    <div className="mb-3">
                        <Form.Check>
                            <Form.Check.Input
                                disabled={!lang.isSupported}
                                checked={selectedTargetLanguages.find(targetLanguage => targetLanguage.id === lang.id)}
                                onClick={() => handleSelectLanguages(lang)}
                            />
                            <Form.Check.Label>{`${lang.name}`} <Badge
                                variant="secondary">{lang.id.toUpperCase()}</Badge></Form.Check.Label>
                            {!lang.isSupported && <span className="error-message">(coming soon)</span>}
                        </Form.Check>
                    </div>
                </Col>

                )
        )


    let supportedLanguageSingleCols = (supportedLanguages) => {

        let langPerRow = 5
        let resultArray = []

        return supportedLanguages.reduce((acc, element, index ) => {

            resultArray.push(element)

            if(!((index + 1) % langPerRow ) || index  === supportedLanguages.length -1) {

                let finalArray = resultArray
                resultArray = []
                return  [...acc, finalArray]
            }   else {
                return [...acc]
            }

        },[]).sort((a,b) => {
            if(a.length > b.length) {
                return -1
            }   else {
                return 1
            }
        })
    }

    return (
        <Container className="w-75 mt-5">

            <p>Name: {name} <Button>Change Name</Button></p>
            <p>Default Target Languages (maximum 5): {isMaxed && <span>You have reached the maximum</span>}</p>
            {systemTargetLanguages[1].emoji}
            <Row>
                {
                    supportedLanguageSingleCols(systemTargetLanguages)
                        .map( col => (
                            <Col lg={3}>
                                {generateLanguageCol(col)}
                            </Col>
                        ))
                }
            </Row>

            <Button onClick={handleSaveSettings}>Save Settings</Button>
            <Button onClick={handleTest} className="btn-danger">Test</Button>
            <Alert
                variant="success"
                className="alert-box"
                show={isAlertShow}
                onClose={() => setIsAlertShow(false)}
                dismissible
            >
                Settings saved successfully
            </Alert>

        </Container>
    )
}

export default SettingPage
