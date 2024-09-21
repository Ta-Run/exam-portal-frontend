import React, { useState } from 'react';
import Header from '../../../components/header/admin/Header';
import './UploadDocument.scss';

const UploadDocument = () => {
  const [candidatePhoto, setCandidatePhoto] = useState(null);
  const [candidateDocument, setCandidateDocument] = useState(null);

  const handleFileChange = (event) => {
    const { id, files } = event.target;
    if (id === 'candidate-photo') {
      setCandidatePhoto(files[0]);
    } else if (id === 'candidate-document') {
      setCandidateDocument(files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (candidatePhoto) {
      formData.append('candidatePhoto', candidatePhoto);
    }
    if (candidateDocument) {
      formData.append('candidateDocument', candidateDocument);
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/exam/upload-document', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful', result);
        // Handle success (e.g., show a success message or redirect)
      } else {
        console.error('Upload failed', response.statusText);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error
    }
  };

  return (
    <div>
      <Header name="UploadDocument" />

      <div className='upload-docs-class'>
        <div className='instruction-class'>
          <div className='sub-name'>Diamond Planning_Eng</div>
          <div className='time-duration'>Time Allowed: 60 min</div>

          <h2>Instruction</h2>
          <ol>
            <li>1. Please read all the instructions carefully.</li>
            <li>2. All the questions are mandatory to attempt.</li>
            <li>3. Please see and ensure the details of this test (Like duration and number of questions).</li>
            <li>4. As the test begins, test question will start appearing sequentially (one by one) and reverse clock will show the remaining time.</li>
            <li>5. In case of any power failure or any interruption, you need not be panic, your test data will get preserve on the backend server.</li>
            <li>6. Once you have pressed the submit button of the ongoing test, you will get confirmation message on screen.</li>
            <li>7. Now you may Click on "Start" button to begin the test......</li>
          </ol>
          <h1>ALL THE BEST FOR YOUR EXAM</h1>
        </div>
        <div className='upload-box'>
          <h1>Documents for Identity proof</h1>
          <form onSubmit={handleSubmit}>
            <div className='file-upload-row'>
              <div className='icon-box'>
                <img src="/img/testicon/8666687_upload_cloud_icon 1.png" alt="Upload Icon" />
                <label htmlFor="candidate-photo">Candidate Photo</label>
                <input type="file" id="candidate-photo" onChange={handleFileChange} />
              </div>

              <div className='icon-box'>
                <img src="/img/testicon/8666687_upload_cloud_icon 1.png" alt="Upload Icon" />
                <label htmlFor="candidate-document">Candidate Document</label>
                <input type="file" id="candidate-document" onChange={handleFileChange} />
              </div>

              <button type='submit' className='start-exam-button'>Start Exam</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
