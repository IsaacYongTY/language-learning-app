import React, { useState } from 'react'
import firebase from '../lib/firebase'
import { useHistory } from 'react-router-dom'

const LogoutButton = (props) => {

    const history = useHistory()
    const handleLogout = () => {
        firebase.auth().signOut().then((response) => {
            console.log(response)

            history.push('/login')

        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default LogoutButton
