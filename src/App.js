import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import MainPage from './components/MainPage'
import FlashCards from "./components/FlashCards";
import Playground from './components/Playground'
import React from "react";

function App() {

    return (
    <div className="App">
      <BrowserRouter>
        <Switch>


            <Route exact path="/" >
                <MainPage />

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

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
