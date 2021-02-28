import React, { useState, useEffect } from 'react'
import Header from './Header'
import firebase from '../lib/firebase'
import { useHistory } from 'react-router-dom'
import { mockData } from '../lib/mockData'
import WordCards from './WordCards/WordCards'
import SearchBar from "./SearchBar";
import { Modal, Button, Form, Container, Row } from 'react-bootstrap'

const {Translate} = require('@google-cloud/translate').v2;

const MainPage = (props) => {

    const [ data, setData ] = useState(mockData)
    const [ isLogin, setIsLogin ] = useState(false)
    const [ showModal,setShowModal ] = useState(false)
    const [ toTranslateText, setToTranslateText ] = useState('')
    const [ translatedText, setTranslatedText ] = useState({})
    const history = useHistory()

    const handleShowModal = () => setShowModal(true)
    const handleHideModal = () => setShowModal(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged( user => {

            if(!user) {
                history.push('/login')
            } else {
                setIsLogin(true)
            }
        })

    }, [])



    const CREDENTIALS = JSON.parse(process.env.REACT_APP_CREDENTIALS)

    const translate = new Translate(
        {
            credentials: CREDENTIALS,
            projectId: CREDENTIALS.project_id
        }

    );



    async function translateText(text,target) {

        let [translations] = await translate.translate(text, target);
        console.log(translations)
        translations = Array.isArray(translations) ? translations : [translations];
        console.log('Translations:');
        translations.forEach((translation, i) => {
            console.log(`${text[i]} => (${target}) ${translation}`);
        });
        setTranslatedText(prevState => ({...prevState, [target]: translations }))
    }


    const handleTranslateTextInput = (e) => {
        console.log(e.target.value)
        setToTranslateText(e.target.value)
    }

    const handleTranslateText = (text, target) => {

        target.forEach( targetLanguage => translateText(text, targetLanguage))

    }

    return (

            isLogin && (
                <div>
                    <Header />
                    <Container fluid >




                    <SearchBar data={data} setData={setData} setShowModal={setShowModal}/>
                    <WordCards data={data} />

                    </Container>

                    <Modal show={showModal} onHide={handleHideModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add new card</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <span>Word:</span><Form.Control onChange={(e) => handleTranslateTextInput(e)} placeholder="testing"></Form.Control>
                            <span>Spanish:</span><Form.Control value={translatedText.es} placeholder="Spanish"></Form.Control>
                            <span>Chinese:</span><Form.Control value={translatedText.zh} placeholder="Chinese"></Form.Control>
                            <span>Vietnamese:</span><Form.Control value={translatedText.vi} placeholder="Vietnamese"></Form.Control>
                            <Button onClick={()=>handleTranslateText(toTranslateText, ['zh','es','vi'])}>Translate</Button>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={handleHideModal}>Close</Button>
                            <Button>Add</Button>
                        </Modal.Footer>
                    </Modal>


                </div>
            )


    )
}

export default MainPage
