import './App.scss';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'

import LoginPage from './components/LoginPage'
import MainPage from './components/MainPage'
import UserDecks from "./components/UserDecks";
import Playground from './components/Playground'
import SettingPage from "./components/SettingPage";
import Header from "./components/Header";

function App() {

    const [ userProfile, setUserProfile ] = useState({})
    const [ userTargetLanguages, setUserTargetLanguages ] = useState([])
    const [ systemTargetLanguages, setSystemTargetLanguages ] = useState([])

    return (
    <div className="App">
      <BrowserRouter>

        <Switch>


            <Route exact path="/" >
                <Header userProfile={userProfile} />
                <MainPage
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    userTargetLanguages={userTargetLanguages}
                    setUserTargetLanguages={setUserTargetLanguages}
                    systemTargetLanguages={systemTargetLanguages}
                    setSystemTargetLanguages={setSystemTargetLanguages}
                />

            </Route>

            <Route exact path="/login">
                <LoginPage />
            </Route>

            <Route path="/demo/:accessCode">
                <LoginPage />
            </Route>

            <Route path="/user-decks">
                <UserDecks  />
            </Route>

            <Route path="/playground">
                <Playground />
            </Route>

            <Route path="/settings">
                <Header userProfile={userProfile} />
                <SettingPage
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    systemTargetLanguages={systemTargetLanguages}
                    setSystemTargetLanguages={systemTargetLanguages}
                />
            </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
