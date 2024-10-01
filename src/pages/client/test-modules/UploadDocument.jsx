import React, { useEffect, useState } from 'react';
import Header from '../../../components/header/admin/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import './UploadDocument.scss';
import examIcon from '../../../images/9e88f01c1b9d24ff5fff2b4111ac7bb5.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { reqToFetchCandidateDocumentDetails } from '../../../reduxToolkit/services/testModuleService';

const UploadDocument = () => {
    const [candidatePhoto, setCandidatePhoto] = useState(null);
    const [previewPhotoUrl, setPreviewPhotoUrl] = useState([]);
    const [previewDocumentUrl, setPreviewDocumentUrl] = useState([])

    const [candidateDocument, setCandidateDocument] = useState(null);
    const [error, setError] = useState('');
    const [clientDetail, setClientDetail] = useState([])
   
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const id = clientDetail._id;
    const dispatch = useDispatch();

    useEffect(() => {
        getClientExamDetails()
    }, [])

    const getClientExamDetails = async () => {
        try {
            const data = await axios.get('http://localhost:4000/api/v1/exam/clietnDetail', {
                headers: {
                    'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjgzN2IwZDI3Njk4NjY5YTAwNzA2MzEiLCJqdGkiOiI1MDEwODU1M2MyOTc5NmExNjkzYjUzYThiMDFjYzI3NjNiNDkyNGJkZTQ0MTMwODM3ZWYwNGMxOTQxMzQ2MTM1IiwiZW1haWwiOiJkYXhpdEBnbWFpbC5jb20iLCJsb2dpblR5cGUiOiJDbGllbnQiLCJpYXQiOjE3Mjc0MjAyMDUsImV4cCI6MTc1ODk1NjIwNX0.tubXZKzJkl13iwuPfJG-bqDX-xndJUR94TPUPi5LjtU"
                },
            });

            if (data.data.status = 200) {
                setClientDetail(data.data.data[0])
            }

        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred: ' + err.message);
        }
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Display image preview for Candidate Photo
            if (event.target.id === 'candidate-photo') {
                setCandidatePhoto(file);
                setPreviewPhotoUrl(URL.createObjectURL(file));
            }
            // Display image preview for Candidate Document
            else if (event.target.id === 'candidate-document') {
                setCandidateDocument(file);
                setPreviewDocumentUrl(URL.createObjectURL(file));
            }
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const formData = new FormData();
        if (candidatePhoto) {
            formData.append('yourPhoto', candidatePhoto);
        }
        if (candidateDocument) {
            formData.append('yourDocument', candidateDocument);
        }

        formData.append('accessCode', 1234);

        try {
            const response = await fetch('http://localhost:4000/api/v1/application/upload', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjgzN2IwZDI3Njk4NjY5YTAwNzA2MzEiLCJqdGkiOiI1MDEwODU1M2MyOTc5NmExNjkzYjUzYThiMDFjYzI3NjNiNDkyNGJkZTQ0MTMwODM3ZWYwNGMxOTQxMzQ2MTM1IiwiZW1haWwiOiJkYXhpdEBnbWFpbC5jb20iLCJsb2dpblR5cGUiOiJDbGllbnQiLCJpYXQiOjE3Mjc0MjAyMDUsImV4cCI6MTc1ODk1NjIwNX0.tubXZKzJkl13iwuPfJG-bqDX-xndJUR94TPUPi5LjtU"
                },
                body: formData,
            });


            const textResponse = await response.text(); // Read the response as 

            if (response.ok) {
                const result = JSON.parse(textResponse);
                if (result.res) {
                    toast.success('Document Uploaded Successfully')
                    // fetchUserImages();
                    navigate(`/client/test-modules/TestModule/${id}`, { state: clientDetail.clientId });
                } else {
                    toast.error('Please Upload Document Properply')
                }
            } else {
                console.error('Upload failed:', textResponse);
                setError('Upload failed: ' + (textResponse || response.statusText));
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred: ' + error.message);
        }
    };


    const openCamera = (type) => {
        console.log(`Open camera for: ${type}`);

    };

    return (
        <div>
            <Header name="UploadDocument" />
            <div className="upload-docs-class">
                <div className="instruction-class">
                    <div className="header-row">
                        <div className="sub-name">{clientDetail.jobRoleName}</div>
                        <div className="time-duration">Time Allowed: 60 min</div>
                    </div>

                    <h2>Instructions</h2>
                    <ol>
                        <li>1. Please read all the instructions carefully.</li>
                        <li>2. All the questions are mandatory to attempt.</li>
                        <li>3. Please see and ensure the details of this test (Like duration and number of questions).</li>
                        <li>4. As the test begins, test question will start appearing sequentially (one by one) and reverse clock will show the remaining time.</li>
                        <li>5. In case of any power failure or any interruption, you need not panic, your test data will be preserved on the backend server.</li>
                        <li>6. Once you have pressed the submit button of the ongoing test, you will get a confirmation message on the screen.</li>
                        <li>7. Now you may click on the "Start" button to begin the test...</li>
                    </ol>
                    <div className="exam-header">
                        <img src={examIcon} alt="Exam Icon" className="exam-icon" />
                        <h1>ALL THE BEST FOR YOUR EXAM</h1>
                    </div>
                </div>

                <div className="upload-box">
                    <h1>Documents for Identity Proof</h1>
                    <div className="divider"></div>
                    <form onSubmit={handleSubmit}>
                        <div className="file-upload-row">
                            {/* Candidate Photo */}
                            <div className="icon-container">
                                <label htmlFor="candidate-photo" className="document-label">Candidate Photo</label>
                                <div className="icon-box" onClick={() => document.getElementById('candidate-photo').click()} style={{ cursor: 'pointer' }}>
                                    {/* Display selected image or fallback to the upload icon */}
                                    {previewPhotoUrl ? (
                                        <img src={previewPhotoUrl} alt="Candidate Photo Preview" style={{ width: '100px', height: '100px' }} />
                                    ) : (
                                        <img src="/img/testicon/8666687_upload_cloud_icon 1.png" alt="Upload Icon" />
                                    )}
                                    <input
                                        type="file"
                                        id="candidate-photo"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />

                                </div>
                                <button type="button" className="open-camera-button" onClick={() => openCamera('Candidate Photo')}>
                                    <FontAwesomeIcon icon={faCamera} style={{ marginRight: '5px' }} />
                                    Open Camera
                                </button>
                            </div>

                            {/* Candidate Document */}
                            <div className="icon-container">
                                <label htmlFor="candidate-document" className="document-label">Candidate Document</label>
                                <div className="icon-box"

                                    onClick={() => document.getElementById('candidate-document').click()} style={{ cursor: 'pointer' }}>

                                    {'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' ? (
                                        <img src={previewDocumentUrl} alt="Candidate Document Preview" style={{ width: '100px', height: '100px' }} />
                                    ) : (
                                        <img src="/img/testicon/8666687_upload_cloud_icon 1.png" alt="Upload Icon" />
                                    )}
                                    <input
                                        type="file"
                                        id="candidate-document"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />

                                </div>
                            </div>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <div className="button-row">
                            <button type="submit" className="start-exam-button">Start Exam</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UploadDocument;
