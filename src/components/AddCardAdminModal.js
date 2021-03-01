import React, {useCallback, useRef, useState, useEffect} from 'react'
import {Button, Form, Modal} from "react-bootstrap";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import '../scss/_AddCardAdminModal.scss'
import axios from 'axios'
import {translateText, addToStorage, convertToIpa} from '../lib/library'



const AddCardAdminModal = ({ showModal, setShowModal }) => {

    const [ toTranslateText, setToTranslateText ] = useState('')
    const [ translatedText, setTranslatedText ] = useState({})
    const [ uploadedImage, setUploadedImage ] = useState(null)

    const [ isTranslateError, setIsTranslateError ] = useState(false)
    const [ isUnsplashError, setIsUnsplashError ] = useState(false)

    const [ downloadedImage, setDownloadedImage ] = useState(null)

    const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 / 1 });
    const [completedCrop, setCompletedCrop] = useState(null);

    const imgRef = useRef(null)
    const previewCanvasRef = useRef(null);

    // let downloadedImage

    useEffect(() => {
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


        if(downloadedImage) {

            downloadedImage.addEventListener('load', imageReceived, false)

        }

    }, [completedCrop, downloadedImage]);



    const handleHideModal = () => {
        setShowModal(false)

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
            try {
                let response = await axios.get(apiUrl,config)
                console.log(response.data.results)

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
        switch(targetLanguage) {
            case('zh'):
                return 'romanized'
            case('th'):
                return 'thai romanized'
            default:
                return null
        }
    }

    function handleAddToStorage(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }

            let languageArray = []

            console.log(translatedText)
            for ( const targetLanguage in translatedText) {

                let translatedWord = translatedText[targetLanguage]

                languageArray.push({
                    id: targetLanguage,
                    word: translatedWord,
                    ipa: convertToIpa(translatedWord, targetLanguage) || null,
                    romanized: romanizeWord(translatedWord, targetLanguage),
                    feminine: null,
                    pronunciation: 'link to mp3 in firebase storage',
                    verified: false
                })
            }

            let data = {
                id: toTranslateText,
                word: toTranslateText,
                languages: languageArray

            }



        canvas.toBlob(
            (blob) => {
               addToStorage('default-deck',blob,toTranslateText, data).then(() => {
                   console.log('working')
                   setTranslatedText({})
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
            target.forEach( targetLanguage => translateText(text, targetLanguage, setTranslatedText))
            setIsTranslateError(false)
            return
        }

        setIsTranslateError(true)
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
                    placeholder="bird.."
                    value={toTranslateText}
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

                <canvas
                    ref={previewCanvasRef}
                    // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                    style={{
                        width: Math.round(completedCrop?.width ?? 0),
                        height: Math.round(completedCrop?.height ?? 0),
                        display: 'none'
                    }}
                />


                <Button onClick={()=>handleTranslateText(toTranslateText, ['zh','es','vi','en'])}>Translate</Button>
                <div>
                    <span>Spanish:</span><Form.Control value={translatedText.es || ''} ></Form.Control>
                    <span>Chinese:</span><Form.Control value={translatedText.zh || ''} ></Form.Control>
                    <span>Vietnamese:</span><Form.Control value={translatedText.vi || ''} ></Form.Control>
                </div>
                {isTranslateError && <div className="error-message">Please key in your word</div>}
                <Form.File accept="audio/*" onChange={handleSelectAudio} />
                <div className="test-canvas"></div>
            </Modal.Body>

            <Modal.Footer>
                {/*<Button onClick={startDownload}>Download</Button>*/}
                <Button >Test</Button>
                <Button onClick={handleHideModal}>Close</Button>
                <Button onClick={() => handleAddToStorage(previewCanvasRef.current,crop)}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddCardAdminModal
