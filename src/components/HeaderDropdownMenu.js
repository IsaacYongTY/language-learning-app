import React from 'react'
import {Dropdown, DropdownButton} from "react-bootstrap";
import {useHistory, Link} from "react-router-dom";
import firebase from "../lib/firebase";

const HeaderDropdownMenu = ({ userProfile }) => {

    const history = useHistory()

    const handleToSettings = () => {
        history.push('/settings')
    }
    const handleLogout = () => {
        firebase.auth().signOut().then((response) => {
            console.log(response)
            history.push('/login')

        }).catch(error => {
            console.log(error)
        })
    }


    return (

            <DropdownButton className="shadow-none" id="dropdown-item-button" title={userProfile.name}>
                <Dropdown.Item as="button">Action</Dropdown.Item>
                <Dropdown.Item as="button" to="/settings" onClick={handleToSettings}>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button"onClick={handleLogout}>Logout</Dropdown.Item>
            </DropdownButton>

    )
}

export default HeaderDropdownMenu