
import React, { useState, useEffect } from 'react'
import '../scss/_LoginPage.scss'
import firebase from '../lib/firebase'
import { useHistory, useParams } from 'react-router-dom'
import {Card, FormControl, Button, Container} from "react-bootstrap";


const LoginPage = (props) => {

    const [ userInput, setUserInput ] = useState({})

    const history = useHistory()
    const { accessCode } = useParams()

    console.log(accessCode)
    useEffect(() => {
        if(accessCode == process.env.REACT_APP_DEMO_ACCESS_CODE) {
            console.log('in')
            console.log(process.env.REACT_APP_DEMO_PASSWORD)
            setUserInput({
                email: process.env.REACT_APP_DEMO_EMAIL,
                password: process.env.REACT_APP_DEMO_PASSWORD
            })
        }
    },[])

    const handleUserInput = (e) => {

        console.log(userInput)
        setUserInput(prevState => ({ ...prevState, [e.target.name]: e.target.value} ))

    }
    const handleLogin = () => {

        let { email, password } = userInput



        console.log(userInput)
        firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
            console.log('login successful')

            console.log(response)
            history.push('/')
        }).catch((error) => {

            console.log('Caught error')

            return error.code

        })

    };


    const handleTest = () => {

        return userInput
    }

    return (

        <Container className="login-page">
            <Card className="login-card ">
                <Card.Title><h2>Welcome!</h2></Card.Title>
                <Card.Body>
                    <label>E-mail:</label>
                    <FormControl className="mb-3" type="email" name="email" value={userInput?.email} onChange={(e) => handleUserInput(e)} />
                    <label>Password:</label>
                    <FormControl className="mb-3" type="password" name="password" value={userInput?.password} onChange={(e) => handleUserInput(e)}/>
                    <Button className="login-button my-1" id="login-button" onClick={() => handleLogin(userInput)}>Submit</Button>
                    <Button className="test-button" onClick = {handleTest}>Test</Button>
                </Card.Body>
            </Card>
        </Container>

    )
}

export default LoginPage
