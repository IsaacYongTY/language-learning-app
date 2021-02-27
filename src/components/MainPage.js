import React, { useState, useEffect } from 'react'
import Header from './Header'
import firebase from '../lib/firebase'
import { useHistory } from 'react-router-dom'
import { mockData } from '../lib/mockData'
import WordCards from './WordCards/WordCards'
import SearchBar from "./SearchBar";

const MainPage = (props) => {

    const [ data, setData ] = useState(mockData)
    const [ isLogin, setIsLogin ] = useState(false)
    const history = useHistory()

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
                    <SearchBar data={data} setData={setData} />
                    <WordCards data={data} />


                </div>
            )


    )
}

export default MainPage
