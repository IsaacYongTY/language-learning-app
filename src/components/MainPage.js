import React, { useState, useEffect } from 'react'
import firebase from '../lib/firebase'
import { useHistory } from 'react-router-dom'

import WordCards from './WordCards/WordCards'
import SearchBar from "./SearchBar";
import AddCardAdminModal from './AddCardAdminModal'

import {getUserProfile, getCollectionData, getTargetLanguages} from '../lib/library'

import { Container } from 'react-bootstrap'

const MainPage = ({userProfile, setUserProfile, userTargetLanguages, setUserTargetLanguages, systemTargetLanguages, setSystemTargetLanguages}) => {

    const [ data, setData ] = useState([])
    const [ filteredData, setFilteredData ] = useState([])

    const [ isLogin, setIsLogin ] = useState(false)
    const [ showModal,setShowModal ] = useState(false)




    const history = useHistory()

    useEffect(() => {

        if(!isLogin) {
            firebase.auth().onAuthStateChanged( user => {


                if(!user) {
                    history.push('/login')
                } else {

                    getUserProfile('users', user.uid, setUserProfile).then((response) => {
                        console.log(response)

                    })

                    getTargetLanguages('target-languages').then((response) => {
                        setSystemTargetLanguages(response)
                    })

                    getCollectionData('default-deck', setData)

                    setIsLogin(true)

                }
            })

        }

        console.log(userProfile)
        setUserTargetLanguages(userProfile.userTargetLanguages)

    }, [userProfile])



    return (
        <div>
            <Container fluid className="w-75">
                <SearchBar
                    data={data}
                    setFilteredData={setFilteredData}
                    setShowModal={setShowModal}
                    userProfile={userProfile}
                />
                <WordCards
                    data={filteredData.length > 0 ? filteredData : data}
                    userTargetLanguages={userTargetLanguages}
                />
            </Container>

            <AddCardAdminModal
                showModal={showModal}
                setShowModal={setShowModal}
                userProfile={userProfile}
                userTargetLanguages={userTargetLanguages}
                systemTargetLanguages={systemTargetLanguages}
            />
        </div>
    )
}

export default MainPage
