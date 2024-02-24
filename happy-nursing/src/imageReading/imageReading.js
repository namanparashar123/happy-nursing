import React, { useState, useEffect, useCallback } from "react";
import { createWorker } from 'tesseract.js';
import "./imageReading.css";

const ImageReading = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [textResult, setTextResult] = useState("");

    const worker = createWorker();

    const processImage = useCallback(async () => {
        if(!selectedFile) return;

        const worker = await createWorker('eng');
        const ret = await worker.recognize(selectedFile);
        setTextResult(ret.data.text);
        await worker.terminate();
    }, [worker, selectedFile]);

    useEffect(() => {
        processImage();
    }, [selectedFile])

    const handleChangeImage = e => {
        if(e.target.files[0]){
            setSelectedFile(e.target.files[0]);
        } else {
            setSelectedFile(null);
            setTextResult("");
        }
    }

    return(
        <div>
            <h1>OCR Functionality</h1>
            <div className="input_wrapper">
                <label htmlFor="upload">Upload Image</label>
                <input type="file" id="upload" accept="image/*, application/pdf" onChange={handleChangeImage}/>
            </div>

            <div className="processed">
                {selectedFile && (
                    <div className="box-image">
                        <img src={URL.createObjectURL(selectedFile)} alt="working" />
                    </div>
                )}
                {textResult && (
                    <div className="box-text">
                        <p>{textResult}</p>
                    </div>
                )}
            </div>
        </div>
    )
};

export default ImageReading;