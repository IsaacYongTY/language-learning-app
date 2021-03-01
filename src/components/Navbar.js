import React from 'react'
import {NavLink} from "react-router-dom";
import { Row, Col } from 'react-bootstrap'
import '../scss/_Navbar.scss'
const Navbar = (props) => {

    return (
        <div className="navbar w-75">
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/flashcard">Flash Cards</NavLink>
            <NavLink to="/playground">Playground</NavLink>
            <NavLink to="/settings">Settings</NavLink>
        </div>
    )
}

export default Navbar
