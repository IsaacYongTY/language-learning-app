import React, { useEffect, useState } from 'react'
import Header from "./Header";
import { Container, Button, Badge, Row, Col, Form } from "react-bootstrap";
import {capitalizeWord, saveUserTargetLanguages} from "../lib/library";


const SettingPage = ({userProfile, setUserProfile, systemTargetLanguages, setSystemTargetLanguages}) => {


    const [ selectedTargetLanguages, setSelectedTargetLanguages ] = useState([...userProfile.userTargetLanguages])
    const [ isMaxed, setIsMaxed ] = useState(false)

    useEffect(() => {
        console.log(userProfile)
        console.log(selectedTargetLanguages)
        console.log(systemTargetLanguages[1].emoji)
    },[selectedTargetLanguages])

    let { name } = userProfile

    const maxLanguageCount = 5

    const handleSelectLanguages = (lang) => {

        if(selectedTargetLanguages.length === maxLanguageCount && !selectedTargetLanguages.includes(lang.id)) {
            setIsMaxed(true)
            return
        }

        selectedTargetLanguages.includes(lang.id)
            ?
            setSelectedTargetLanguages(prevState => prevState.filter(selectedLang => selectedLang !== lang.id))
            :
            setSelectedTargetLanguages(prevState => [...prevState, lang.id])

        setIsMaxed(false)

    }

    const handleSaveSettings = () => {
        saveUserTargetLanguages('users', userProfile.id, selectedTargetLanguages)
    }
    const generateLanguageCol = (supportedLanguages) => {


        return supportedLanguages.map(lang => {

                return (
                    <>
                        <Col>
                            <div className="mb-3">
                                <Form.Check>
                                    <Form.Check.Input
                                        disabled={!lang.isSupported}
                                        checked={selectedTargetLanguages.includes(lang.id)}
                                        onClick={() => handleSelectLanguages(lang)}
                                    />
                                    <Form.Check.Label>{`${lang.name}`} <Badge
                                        variant="secondary">{lang.id.toUpperCase()}</Badge></Form.Check.Label>
                                    {!lang.isSupported && <span className="error-message">(coming soon)</span>}
                                </Form.Check>
                            </div>
                        </Col>



                    </>
                )

        })
    }

    let supportedLanguageSingleCols = (supportedLanguages) => {

        let langPerRow = 5
        let resultArray = []

        return supportedLanguages.reduce((acc, element, index, array ) => {

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
        <>

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





            </Container>
        </>

    )
}

export default SettingPage
