import React, { useEffect } from 'react'
import Header from "./Header";
import { Container, Button, Badge, Row, Col, Form } from "react-bootstrap";
import { capitalizeWord } from "../lib/library";


const SettingPage = ({userProfile, setUserProfile}) => {

    useEffect(() => {
        console.log(userProfile)
    })
    let { name } = userProfile

    let supportedLanguages = [
        {'en': 'english' },
        {'zh': 'chinese simplified'},
        {'vi': 'vietnamese'},
        {'es': 'spanish'},
        {'ma': 'malay'},
        {'ja': 'japanese'},
        {'ig': 'igbo'}]


    const generateLanguageCol = (supportedLanguages) => {


        return supportedLanguages.map(lang => {
            for (const element in lang) {
                return (
                    <>
                        <Col>
                            <div className="mb-3">
                                <Form.Check>
                                    <Form.Check.Input/>
                                    <Form.Check.Label>{`${capitalizeWord(lang[element])}`} <Badge
                                        variant="secondary">{element.toUpperCase()}</Badge></Form.Check.Label>
                                </Form.Check>
                            </div>
                        </Col>



                    </>
                )
            }
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
            <Header />
            <Container className="w-75 mt-5">

                <p>Name: {name} <Button>Change Name</Button></p>
                <p>Default Target Languages (maximum 5):</p>

                <Row>
                    {
                        supportedLanguageSingleCols(supportedLanguages)
                            .map( col => (
                                <Col lg={3}>
                                    {generateLanguageCol(col)}
                                </Col>
                            ))
                    }
                </Row>

                <Button>Save Settings</Button>





            </Container>
        </>

    )
}

export default SettingPage
