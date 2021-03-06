import React, { useState, useEffect } from 'react'
import firebase from '../lib/firebase'
import { useHistory } from 'react-router-dom'

import WordCards from './WordCards/WordCards'
import SearchBar from "./SearchBar";
import AddCardAdminModal from './AddCardAdminModal'

import {getUserProfile, getCollectionData, getTargetLanguages} from '../lib/library'

import { Container } from 'react-bootstrap'
import CategoryBar from "./CategoryBar";

const MainPage = ({userProfile, setUserProfile, userTargetLanguages, setUserTargetLanguages, systemTargetLanguages, setSystemTargetLanguages}) => {

    const [ data, setData ] = useState([])
    const [ filteredData, setFilteredData ] = useState([])

    const [ isLogin, setIsLogin ] = useState(false)
    const [ showModal,setShowModal ] = useState(false)

    const [ filter, setFilter ] = useState('')

    const categories = [
        'animals',
        'number',
        'objects',
        'colors',
        'transportation',
        'location',
        'beverages',
        'food',
        'music'
    ]



    const history = useHistory()

    useEffect(() => {
        if(!isLogin) {
            firebase.auth().onAuthStateChanged(user => {


                if (!user) {
                    history.push('/login')
                } else {

                    getUserProfile('users', user.uid, setUserProfile).then((response) => {
                        setUserProfile(response)
                        setUserTargetLanguages(response.userTargetLanguages)
                    })

                    getTargetLanguages('target-languages').then((response) => {
                        console.log(response)
                        setSystemTargetLanguages(response)
                    })

                    getCollectionData('default-deck', setData)

                    setIsLogin(true)

                }
            })
        }
    }, [])


    return (
        <div>
            <Container fluid className="w-75">
                <SearchBar
                    data={data}
                    setFilteredData={setFilteredData}
                    setShowModal={setShowModal}
                    userProfile={userProfile}
                />
                <CategoryBar
                    categories={categories}
                    filter={filter}
                    setFilter={setFilter}
                />
                <WordCards
                    data={filteredData.length > 0 ? filteredData : data}
                    userTargetLanguages={userTargetLanguages}
                    filter={filter}
                />
            </Container>

            <AddCardAdminModal
                showModal={showModal}
                setShowModal={setShowModal}
                userProfile={userProfile}
                userTargetLanguages={userTargetLanguages}
                systemTargetLanguages={systemTargetLanguages}
                categories={categories}
            />
        </div>
    )
}

export default MainPage
