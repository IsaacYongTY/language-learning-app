import React, { useState, useEffect } from 'react'
import firebase from '../lib/firebase'
import { useHistory } from 'react-router-dom'

import Header from './Header'
import WordCards from './WordCards/WordCards'
import SearchBar from "./SearchBar";
import AddCardAdminModal from './AddCardAdminModal'

import { getUserProfile, getCollectionData } from '../lib/library'

import { Container } from 'react-bootstrap'

const MainPage = ({userProfile, setUserProfile, defaultTargetLanguages, setDefaultTargetLanguages}) => {

    const [ data, setData ] = useState([])
    const [ filteredData, setFilteredData ] = useState([])

    const [ isLogin, setIsLogin ] = useState(false)
    const [ showModal,setShowModal ] = useState(false)




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

                    console.log(userProfile)


                    getCollectionData('default-deck', setData)



                })


            }
        })

    }, [])

    const fetchData = async () => {
        let result = await getCollectionData('default-deck', setData)
        console.log(result)
    }

    return (

            // isLogin && (
                <div>
                    <Header />

                    <Container fluid className="w-75">
                        <SearchBar
                            data={data}
                            setFilteredData={setFilteredData}
                            setShowModal={setShowModal}
                        />
                        <WordCards
                            data={filteredData.length > 0 ? filteredData : data}
                            defaultTargetLanguages={defaultTargetLanguages}
                        />
                    </Container>

                    <AddCardAdminModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />

                </div>
            // )


    )
}

export default MainPage
