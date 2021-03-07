import React, { useEffect } from 'react'
import { Row, Form, Button } from 'react-bootstrap'

const SearchBar = ( { data, setFilteredData, setShowModal, userProfile }) => {


    useEffect(() => {
        setFilteredData(data)
    },[])
    const handleSearch = (e) => {
        console.log(e.target.value)
        e.target.value ? setFilteredData(data.filter(word => word.word.includes(e.target.value))) : setFilteredData([])
    }

    return (
        <Row className="m-3">
            <Form.Control
                className="col-6 mr-3"
                onChange={e => handleSearch(e)}
                placeholder="Search for..."
            />

            { userProfile?.status === 'admin' && <Button variant="danger" onClick={() => setShowModal(true)}> + Add New (Admin only)</Button>}
        </Row>
    )
}

export default SearchBar
