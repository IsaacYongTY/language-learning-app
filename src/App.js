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

    console.log(userProfile)

    return (
    <div className="App">
      <BrowserRouter>
          <Header userProfile={userProfile} />
        <Switch>


            <Route exact path="/" >
                <MainPage
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    userTargetLanguages={userTargetLanguages}
                    setUserTargetLanguages={setUserTargetLanguages}
                    systemTargetLanguages={systemTargetLanguages}
                    setSystemTargetLanguages={setSystemTargetLanguages}
                />

            </Route>

            <Route path="/login">
                <LoginPage setUserProfile/>
            </Route>

            <Route path="/user-decks">
                <UserDecks  />
            </Route>

            <Route path="/playground">
                <Playground />
            </Route>

            <Route path="/settings">
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
