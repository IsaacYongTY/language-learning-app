import React, {useCallback, useRef, useState, useEffect} from 'react'
import {Button, Form, Modal} from "react-bootstrap";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import '../scss/_AddCardAdminModal.scss'
import axios from 'axios'
import { translateText, addToStorage } from '../lib/library'



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
    const previewCanvasRef = useRef(null);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

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
    }, [completedCrop]);


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
                    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_APIKEY}`,
                    'Access-Control-Allow-Origin': '*'

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

    const handleAddToStorage = async (canvas, file) => {




    }

    function generateDownload(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }

        canvas.toBlob(
            (blob) => {
               addToStorage(blob)
            },
            'image/png',
            1
        );
    }

    return (
        <Modal className="add-card-admin-modal" show={showModal} onHide={handleHideModal} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Add new card</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <span>Word:</span>
                <Form.Control
                    onChange={(e) => handleTranslateTextInput(e)}
                    placeholder="testing"
                 />


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
                <div>
                    <canvas
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0),
                            display: 'none'
                        }}
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
                <Button onClick={() => generateDownload(previewCanvasRef.current,crop)}>Test</Button>
                <Button onClick={handleHideModal}>Close</Button>
                <Button>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddCardAdminModal
