import React  from 'react'
import '../scss/_Header.scss'

import LogoutButton from './LogoutButton'
import Navbar from './Navbar'

const Header = (props) => {

    return (
        <div className="header">
            <div className="logo">SANBAI</div>
           <Navbar />


            <LogoutButton />

        </div>
    )
}

export default Header
