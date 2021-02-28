import React, {useCallback, useRef, useState} from 'react'
import {Button, Form, Modal} from "react-bootstrap";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import '../scss/_AddCardAdminModal.scss'
import axios from 'axios'
import { translateText } from '../lib/library'



const AddCardAdminModal = ({ showModal, setShowModal }) => {

    const [ toTranslateText, setToTranslateText ] = useState('')
    const [ translatedText, setTranslatedText ] = useState({})
    const [ uploadedImage, setUploadedImage ] = useState(null)
    const [ imageArray, setImageArray ] = useState([])
    const [ isTranslateError, setIsTranslateError ] = useState(false)
    const [ isUnsplashError, setIsUnsplashError ] = useState(false)

    const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 / 1 });
    const [completedCrop, setCompletedCrop] = useState(null);

    const imgRef = useRef(null)


    const handleTranslateTextInput = (e) => setToTranslateText(e.target.value)






    const handleTranslateText = (text, target) => {

        if(text) {
            target.forEach( targetLanguage => translateText(text, targetLanguage, setTranslatedText))
            setIsTranslateError(false)
            return
        }

        setIsTranslateError(true)
    }
    const handleHideModal = () => {
        setShowModal(false)
        setImageArray([])
        setUploadedImage(null)
        setToTranslateText('')
        setTranslatedText({})
    }

    const handleSelectFile = (e) => {
        console.log(e.target.files)
        if(e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load',() => setUploadedImage(reader.result))
            reader.readAsDataURL(e.target.files[0])
        }
    }


    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    const handleGetUnsplashImage = async (word) => {
        console.log(word)
        if(word) {
            let perPage = 5
            let apiUrl = `https://api.unsplash.com/search/photos?query=${word}&per_page=${perPage}`
            let config = {
                headers: {
                    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_APIKEY}`
                }

            }
            let response = await axios.get(apiUrl,config)
            console.log(response.data.results)

            let arr = response.data.results.map( result => ({
                image: result.urls.regular,
                userName: `${result.user.first_name} ${result.user.last_name}`,
                instagram: `https://instagram.com/${result.user.instagram_username}`
            }))

            setImageArray(arr)

            let randomNum = Math.floor(Math.random() * perPage)
            setUploadedImage(arr[randomNum].image)
            setIsUnsplashError(false)

            return
        }

        setIsUnsplashError(true)


    }

    const handleSelectAudio = (e) => {
        console.log(e.target.files[0])

    }

    return (
        <Modal className="add-card-admin-modal" show={showModal} onHide={handleHideModal} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Add new card</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <span>Word:</span><Form.Control onChange={(e) => handleTranslateTextInput(e)} placeholder="testing"></Form.Control>



                <Button onClick={() => handleGetUnsplashImage(toTranslateText)}>Get from Unsplash</Button>
                {isUnsplashError && <div className="error-message">Please key in your word</div>}
                <Form.File accept="image/*" onChange={(e) => handleSelectFile(e)}/>
                <div className="image-container my-3">
                    <ReactCrop
                        src={uploadedImage}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                    />
                </div>

                <Button onClick={()=>handleTranslateText(toTranslateText, ['zh','es','vi'])}>Translate</Button>
                <div>
                    <span>Spanish:</span><Form.Control value={translatedText.es} placeholder="Spanish"></Form.Control>
                    <span>Chinese:</span><Form.Control value={translatedText.zh} placeholder="Chinese"></Form.Control>
                    <span>Vietnamese:</span><Form.Control value={translatedText.vi} placeholder="Vietnamese"></Form.Control>
                </div>
                {isTranslateError && <div className="error-message">Please key in your word</div>}
                <Form.File accept="audio/*" onChange={handleSelectAudio} />
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleHideModal}>Close</Button>
                <Button>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddCardAdminModal
