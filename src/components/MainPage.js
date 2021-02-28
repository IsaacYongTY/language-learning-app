import React, { useState, useEffect } from 'react'
import Header from './Header'
import firebase from '../lib/firebase'
import { useHistory } from 'react-router-dom'
import { mockData } from '../lib/mockData'
import WordCards from './WordCards/WordCards'
import SearchBar from "./SearchBar";
import { Modal, Button, Form, Container, Row } from 'react-bootstrap'
import AddCardAdminModal from './AddCardAdminModal'
import { getUserProfile } from '../lib/library'


const MainPage = (props) => {

    const [ data, setData ] = useState(mockData)
    const [ isLogin, setIsLogin ] = useState(false)
    const [ showModal,setShowModal ] = useState(false)

    const [ userProfile, setUserProfile ] = useState({})
    const [ defaultTargetLanguages, setDefaultTargetLanguages ] = useState([])

    const history = useHistory()





    useEffect(() => {
        firebase.auth().onAuthStateChanged( user => {


            if(!user) {
                history.push('/login')
            } else {

                getUserProfile('users', user.uid, setUserProfile).then((userProfile) => {
                    setUserProfile(userProfile)
                    setDefaultTargetLanguages(userProfile.defaultTargetLanguages)
                    setIsLogin(true)
                })


            }
        })

    }, [])






    return (

            isLogin && (
                <div>
                    <Header />
                    {`Hi, ${userProfile.name}!`}
                    <Container fluid >
                        <SearchBar data={data} setData={setData} setShowModal={setShowModal}/>
                        <WordCards data={data} defaultTargetLanguages={defaultTargetLanguages}/>
                    </Container>

                    <AddCardAdminModal showModal={showModal} setShowModal={setShowModal}/>

                </div>
            )


    )
}

export default MainPage
