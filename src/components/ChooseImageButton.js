import React, { useState } from 'react'
import {Form} from "react-bootstrap";

const ChooseImageButton = ({ setUploadedImage }) => {

    const handleSelectFile = (e) => {
        if(e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load',() => setUploadedImage(reader.result))
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <Form.File accept="image/*" onChange={(e) => handleSelectFile(e)}  />
    )
}

export default ChooseImageButton
