import React  from 'react'
import '../scss/_Header.scss'
import { Row, Col } from 'react-bootstrap'
import LogoutButton from './LogoutButton'
import Navbar from './Navbar'

const Header = (props) => {

    return (
        <Row className="header">
            <Col md={1} className="logo">SANBAI</Col>
            <Col md={10}>
                <Navbar />
            </Col>


            <Col className="d-flex justify-content-end ">
                <LogoutButton />
            </Col>


        </Row>
    )
}

export default Header
