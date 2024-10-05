import React, { useEffect, useState } from "react";
import Header from "../../../components/header/admin/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./UploadDocument.scss";
import examIcon from "../../../images/9e88f01c1b9d24ff5fff2b4111ac7bb5.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { reqToFetchCandidateDocumentDetails } from "../../../reduxToolkit/services/testModuleService";
import { reqToFetchClientExamDetails } from "../../../reduxToolkit/services/uploadTestDocService";

const UploadDocument = () => {
  const [candidatePhoto, setCandidatePhoto] = useState(null);
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState([]);
  const [previewDocumentUrl, setPreviewDocumentUrl] = useState([]);

  const [candidateDocument, setCandidateDocument] = useState(null);
  const [error, setError] = useState("");
  const [clientDetail, setClientDetail] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const id = clientDetail._id;
  const dispatch = useDispatch();
  var headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjgzN2IwZDI3Njk4NjY5YTAwNzA2MzEiLCJqdGkiOiJkNjgzYjU3M2JiYmE3ODc0NjM5NTZkOWQ0NzBlODMyNTM3NjY5OWU5ZmJiMTNhZjI0MGNiOGY3ZmNiN2VhMDJhIiwiZW1haWwiOiJkYXhpdEBnbWFpbC5jb20iLCJsb2dpblR5cGUiOiJDbGllbnQiLCJpYXQiOjE3Mjc4NTEzNzEsImV4cCI6MTc1OTM4NzM3MX0.s5FHipWAP3z-5AC6h80MCamRibHSAocXp-D6R4ova2k",
  }

  useEffect(() => {
    getClientExamDetails();
  }, []);

  const getClientExamDetails = async () => {
    try {
      const data = await dispatch(reqToFetchClientExamDetails())

      if ((data.payload)) {
        setClientDetail(data.payload.data[0]);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred: " + err.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Display image preview for Candidate Photo
      if (event.target.id === "candidate-photo") {
        setCandidatePhoto(file);
        setPreviewPhotoUrl(URL.createObjectURL(file));
      }
      // Display image preview for Candidate Document
      else if (event.target.id === "candidate-document") {
        setCandidateDocument(file);
        setPreviewDocumentUrl(URL.createObjectURL(file));
      }
    }
  };
  const token = localStorage.getItem("persist:client");
  const parsedData = JSON.parse(token);
  const userToken =
    parsedData && parsedData.client
      ? JSON.parse(parsedData.client)?.authentication?.accessToken
      : null;


  console.log('client Detaiols', clientDetail)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData();
    if (candidatePhoto) {
      formData.append("yourPhoto", candidatePhoto);
    }
    if (candidateDocument) {
      formData.append("yourDocument", candidateDocument);
    }

    formData.append("accessCode", 1234);

    try {

      const response = await fetch(
        "http://localhost:4000/api/v1/application/upload",
        {
          method: "POST",

          headers,
          body: formData,
        }
      );

      const textResponse = await response.text(); // Read the response as

      if (response.ok) {
        const result = JSON.parse(textResponse);
        if (result.res) {
          toast.success("Document Uploaded Successfully");
          // fetchUserImages();
          navigate(`/client/test-modules/TestModule/${id}`, {
            state: clientDetail.clientId,
          });
        } else {
          toast.error("Please Upload Document Properply");
        }
      } else {
        console.error("Upload failed:", textResponse);
        setError("Upload failed: " + (textResponse || response.statusText));
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred: " + error.message);
    }
  };

  const openCamera = (type) => {
    console.log(`Open camera for: ${type}`);
  };

  console.log(previewPhotoUrl);

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
            <li>
              3. Please see and ensure the details of this test (Like duration
              and number of questions).
            </li>
            <li>
              4. As the test begins, test question will start appearing
              sequentially (one by one) and reverse clock will show the
              remaining time.
            </li>
            <li>
              5. In case of any power failure or any interruption, you need not
              panic, your test data will be preserved on the backend server.
            </li>
            <li>
              6. Once you have pressed the submit button of the ongoing test,
              you will get a confirmation message on the screen.
            </li>
            <li>
              7. Now you may click on the "Start" button to begin the test...
            </li>
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
                <label htmlFor="candidate-photo" className="document-label">
                  Candidate Photo
                </label>
                <div
                  className="icon-box"
                  onClick={() =>
                    document.getElementById("candidate-photo").click()
                  }
                  style={{ cursor: "pointer" }}
                >
                  {/* Display selected image or fallback to the upload icon */}
                  {previewPhotoUrl.length !== 0 ? (
                    <img
                      src={previewPhotoUrl}
                      alt="Candidate Photo Preview"
                      style={{ width: "200px", height: "200px" }}
                    />
                  ) : (
                    <img
                      src="/img/testicon/8666687_upload_cloud_icon 1.png"
                      alt="Upload Icon"
                    />
                  )}
                  <input
                    type="file"
                    id="candidate-photo"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
                <button
                  type="button"
                  className="open-camera-button"
                  onClick={() => openCamera("Candidate Photo")}
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    style={{ marginRight: "5px" }}
                  />
                  Open Camera
                </button>
              </div>

              {/* Candidate Document */}

              <div className="icon-container">
                <label htmlFor="candidate-document" className="document-label">
                  Candidate Document
                </label>
                <div
                  className="icon-box"
                  onClick={() =>
                    document.getElementById("candidate-document").click()
                  }
                  style={{ cursor: "pointer" }}
                >
                  {previewDocumentUrl.length !== 0 ? (
                    <img
                      src={previewDocumentUrl}
                      alt="Candidate Document Preview"
                      style={{ width: "200px", height: "200px" }}
                    />
                  ) : (
                    <img
                      src="/img/testicon/8666687_upload_cloud_icon 1.png"
                      alt="Upload Icon"
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                  <input
                    type="file"
                    id="candidate-document"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-row">
              <button type="submit" className="start-exam-button">
                Start Exam
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
