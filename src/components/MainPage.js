import React, { useState, useEffect } from 'react'
import Header from './Header'
import firebase from '../lib/firebase'
import { useHistory } from 'react-router-dom'
import { mockData } from '../lib/mockData'
import WordCards from './WordCards/WordCards'
import SearchBar from "./SearchBar";
import { Modal, Button, Form } from 'react-bootstrap'

const MainPage = (props) => {

    const [ data, setData ] = useState(mockData)
    const [ isLogin, setIsLogin ] = useState(false)
    const [ showModal,setShowModal ] = useState(false)
    const history = useHistory()

    const handleShowModal = () => setShowModal(true)
    const handleHideModal = () => setShowModal(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged( user => {
            console.log(user)

            if(!user) {
                history.push('/login')
            } else {
                setIsLogin(true)
            }
        })
    }, [])

    return (

            isLogin && (
                <div>
                    <Header />
                    <SearchBar data={data} setData={setData} setShowModal={setShowModal}/>
                    <WordCards data={data} />

                    <Modal show={showModal} onHide={handleHideModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add new card</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <span>Word:</span><Form.Control placeholder="testing"></Form.Control>
                            <span>Spanish:</span><Form.Control placeholder="Spanish"></Form.Control>
                            <span>Chinese:</span><Form.Control placeholder="Chinese"></Form.Control>
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
