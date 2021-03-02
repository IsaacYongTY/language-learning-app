import React  from 'react'
import '../scss/_Header.scss'
import { Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import Navbar from './Navbar'
import HeaderDropdownMenu from "./HeaderDropdownMenu";

const Header = ({ userProfile }) => {

    console.log(userProfile)
    return (
        <Row className="header">
            <Col md={1} className="logo">SANBAI</Col>
            <Col md={9}>
                <Navbar />
            </Col>


            <Col className="d-flex justify-content-end">
                <HeaderDropdownMenu
                    userProfile={userProfile}
                />
            </Col>


        </Row>
    )
}

export default Header
