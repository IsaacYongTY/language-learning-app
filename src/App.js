import './App.scss';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import MainPage from './components/MainPage'
import FlashCards from "./components/FlashCards";
import Playground from './components/Playground'
import SettingPage from "./components/SettingPage";
import React, { useState, useEffect } from "react";
import firebase from "./lib/firebase";
import {getCollectionData, getUserProfile} from "./lib/library";

function App() {

    const [ userProfile, setUserProfile ] = useState({})
    const [ defaultTargetLanguages, setDefaultTargetLanguages ] = useState([])
    const history = useHistory()



    return (
    <div className="App">
      <BrowserRouter>
        <Switch>


            <Route exact path="/" >
                <MainPage
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    defaultTargetLanguages={defaultTargetLanguages}
                    setDefaultTargetLanguages={setDefaultTargetLanguages}
                />

            </Route>

            <Route path="/login">
                <LoginPage />
            </Route>

            <Route path="/flashcard">
                <FlashCards  />
            </Route>

            <Route path="/playground">
                <Playground />
            </Route>

            <Route path="/settings">
                <SettingPage userProfile={userProfile} setUserProfile={setUserProfile} />
            </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
