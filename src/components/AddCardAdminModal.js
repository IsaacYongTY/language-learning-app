import React, {useCallback, useRef, useState, useEffect} from 'react'
import {Button, Form, Modal, ButtonToolbar, Row, Col} from "react-bootstrap";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import '../scss/_AddCardAdminModal.scss'
import axios from 'axios'
import {translateText, addToStorage } from '../lib/library'

import pinyin from "pinyin_js";
import Sanscript from "@sanskrit-coders/sanscript";
import aromanize from "aromanize";



const AddCardAdminModal = ({ showModal, setShowModal, userProfile, userTargetLanguages, systemTargetLanguages }) => {

    const [ toTranslateText, setToTranslateText ] = useState('')
    const [ translatedText, setTranslatedText ] = useState([])
    const [ uploadedImage, setUploadedImage ] = useState(null)

    const [ isTranslateError, setIsTranslateError ] = useState(false)
    const [ isUnsplashError, setIsUnsplashError ] = useState(false)

    const [ downloadedImage, setDownloadedImage ] = useState(null)

    const [crop, setCrop] = useState({ unit: '%', width: 80, aspect: 1 / 1 });
    const [completedCrop, setCompletedCrop] = useState(null);

    const imgRef = useRef(null)
    const previewCanvasRef = useRef(null);

    useEffect(() => {

        console.log(systemTargetLanguages)
        if (completedCrop && previewCanvasRef.current && imgRef.current) {

            const image = imgRef.current;
            const canvas = previewCanvasRef.current;
            const crop = completedCrop;

            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            const ctx = canvas.getContext('2d');
            const pixelRatio = window.devicePixelRatio;

            canvas.width = crop.width * pixelRatio;
            canvas.height = crop.height * pixelRatio;

            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = 'high';

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
        }


        downloadedImage && downloadedImage.addEventListener('load', imageReceived, false)


    }, [completedCrop, downloadedImage]);

    const handleHideModal = () => {
        setShowModal(false)
        setUploadedImage(null)
        setToTranslateText('')
        setTranslatedText([])
        setIsUnsplashError(false)
        setIsTranslateError(false)
    }

    const handleSelectFile = (e) => {
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
                    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_APIKEY}`,
                    'Access-Control-Allow-Origin': '*'
                }
            }

            try {
                let response = await axios.get(apiUrl,config)

                let arr = response.data.results.map( result => ({
                    image: result.urls.regular,
                    userName: `${result.user.first_name} ${result.user.last_name}`,
                    instagram: `https://instagram.com/${result.user.instagram_username}`
                }))

                let randomNum = Math.floor(Math.random() * perPage)

                let tempImage = new Image()
                tempImage.crossOrigin = 'Anonymous'
                tempImage.src = arr[randomNum].image

                setDownloadedImage(tempImage)
                setIsUnsplashError(false)
            } catch(err) {
                console.log(err)
            }
            return
        }

        setIsUnsplashError(true)


    }



    const imageReceived = () => {

        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        canvas.width = downloadedImage.width
        canvas.height = downloadedImage.height

        ctx.drawImage(downloadedImage, 0, 0)

        try {
            localStorage.setItem('saved-image', canvas.toDataURL('image/png'))

            setUploadedImage(localStorage.getItem('saved-image'))

        }   catch(err) {
            console.log('Error: ' + err)
        }
    }

    const handleSelectAudio = (e) => {
        console.log(e.target.files[0])

    }

    const romanizeWord = (word, targetLanguage) => {
        switch (targetLanguage) {
            case('zh'):
                return pinyin.pinyin(word, ' ')
            case('th'):
                return null
            case('ta'):
                return Sanscript.t(word,'tamil','hk')
            case('ja'):
            case('ko'):
                return aromanize.toLatin(word)

            default:
                return null
        }
    }

    function handleAddToStorage(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }

        let languageArray = []

        translatedText.forEach(language => {

            let { id, word, ipa } = language
            languageArray.push({
                id,
                word,
                ipa: ipa || null,
                romanized: romanizeWord(word, id),
                feminine: null,
                pronunciation: 'link to mp3 in firebase storage',
                verified: false
            })
        })

        let data = {
            id: toTranslateText,
            word: toTranslateText,
            languages: languageArray

        }

        canvas.toBlob(
            (blob) => {
               addToStorage('default-deck',blob,toTranslateText, data).then(() => {
                   setTranslatedText([])
                   setUploadedImage('')
                   setToTranslateText('')
               })
            },
            'image/png',
            1
        );
    }

    const handleTranslateTextInput = (e) => setToTranslateText(e.target.value)

    const handleTranslateText = (text, target) => {
        if(text) {
            console.log(target)
            target.forEach( targetLanguage => translateText(text, targetLanguage.id, setTranslatedText))
            setIsTranslateError(false)
            return
        }
        setIsTranslateError(true)
    }

    const translationTextbox = (

        userProfile.userTargetLanguages?.map(targetLanguage => (
                <Row>
                    <Col>
                        <p className="mb-1">{targetLanguage.name}:</p>
                        <Form.Control className="mb-2" value={translatedText.find( text => text.id ===targetLanguage.id)?.word || ''} ></Form.Control>
                    </Col>
                    <Col>
                        <p className="mb-1">IPA:</p>
                        <Form.Control className="mb-2" value={translatedText.find( text => text.id ===targetLanguage.id)?.ipa || ''} ></Form.Control>
                    </Col>
                </Row>

        ))

    )


    return (
        <Modal className="add-card-admin-modal" show={showModal} onHide={handleHideModal} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Add new card</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>

                    <Col lg={8}>
                        <p className="mb-1">Word:</p>
                        <Form.Control
                            onChange={(e) => handleTranslateTextInput(e)}
                            placeholder="bird.."
                            value={toTranslateText}
                         />

                        <div className="image-container my-3">
                            <ReactCrop
                                src={uploadedImage}
                                onImageLoaded={onLoad}
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}
                            />
                        </div>

                        <ButtonToolbar className="justify-content-around align-items-center">
                            <div className="d-flex align-items-center">
                                <Button onClick={() => handleGetUnsplashImage(toTranslateText)}>Get from Unsplash</Button>

                                {isUnsplashError && <div className="error-message">Please key in your word</div>}
                            </div>

                            <Form.File accept="image/*" onChange={(e) => handleSelectFile(e)}  />

                        </ButtonToolbar>

                        <canvas
                            ref={previewCanvasRef}
                            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                            style={{
                                width: Math.round(completedCrop?.width ?? 0),
                                height: Math.round(completedCrop?.height ?? 0),
                                display: 'none'
                            }}
                        />

                </Col>
                <Col lg={4}>
                    <div className="my-3">

                        {translationTextbox}
                    </div>

                    <ButtonToolbar className="justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <Button onClick={()=>handleTranslateText(toTranslateText, systemTargetLanguages)}>Translate</Button>
                            {isTranslateError && <div className="error-message">Please key in your word</div>}
                        </div>

                        <Form.File accept="audio/*" id="choose-audio" onChange={handleSelectAudio} data-buttonText="Choose Audio"/>
                    </ButtonToolbar>
                </Col>
            </Row>


            </Modal.Body>

            <Modal.Footer>
                {/*<Button onClick={startDownload}>Download</Button>*/}
                <Button variant="danger mr-3" >Test</Button>
                <Button variant="secondary mr-3" onClick={handleHideModal}>Close</Button>
                <Button onClick={() => handleAddToStorage(previewCanvasRef.current,crop)}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddCardAdminModal
