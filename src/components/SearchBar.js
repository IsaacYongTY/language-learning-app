import React, { useState } from 'react'
import { Row, Form, Button, Dropdown } from 'react-bootstrap'
import { mockData } from "../lib/mockData";
import { languageInfo } from '../lib/mockData'
import {capitalizeWord} from "../lib/library";


const SearchBar = ( { data, setData }) => {

    const [ selectedLanguage, setSelectedLanguage ] = useState('en')


    let { languageName } = languageInfo.find( element => element.code === selectedLanguage)
    languageName = capitalizeWord(languageName)

    const handleSearch = (e) => {
        console.log(e.target.value)
        e.target.value ? setData(mockData.filter(word => word.word.includes(e.target.value))) : setData(mockData)
    }

    return (
        <Row className="m-3">
            <Form.Control
                className="col-6 mr-3"
                onChange={e => handleSearch(e)}
                placeholder="Search for..."
            />
            {/*<Dropdown>*/}
            {/*    <Dropdown.Toggle>{languageName}</Dropdown.Toggle>*/}

            {/*    <Dropdown.Menu>*/}
            {/*        <Dropdown.Item onClick={() => setSelectedLanguage('en')}>English</Dropdown.Item>*/}
            {/*        <Dropdown.Item onClick={() => setSelectedLanguage('zh')}>Chinese</Dropdown.Item>*/}
            {/*        <Dropdown.Item onClick={() => setSelectedLanguage('es')}>Spanish</Dropdown.Item>*/}
            {/*    </Dropdown.Menu>*/}

            {/*</Dropdown>*/}
            <Button> + Add New</Button>
        </Row>
    )
}

export default SearchBar
