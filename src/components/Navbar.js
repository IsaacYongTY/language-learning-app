import React from 'react'
import {NavLink} from "react-router-dom";

const Navbar = (props) => {

    return (
        <div>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/flashcard">Flash Cards</NavLink>
            <NavLink to="/playground">Playground</NavLink>
        </div>
    )
}

export default Navbar
