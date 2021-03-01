import React from 'react'
import firebase from '../lib/firebase'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

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
        <Button variant="light" onClick={handleLogout}>Logout</Button>
    )
}

export default LogoutButton
