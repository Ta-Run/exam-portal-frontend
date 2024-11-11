import { useEffect, useState, useRef } from "react";
import Header from "../../../components/header/admin/Header";
import "./TestModule.scss"; // Assuming the SCSS file is named TestModule.scss
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  reqToGetQuestionsModule,
  reqToSubmitAnswer,
  reqToFetchCandidateDocumentDetails,
} from "../../../reduxToolkit/services/testModuleService";
import Loader from "../../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import Webcam from 'react-webcam';



function TestModule() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState([]);
  const [locations, setLocation] = useState({ latitude: null, longitude: null });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const candidateData = JSON.parse(localStorage.getItem("candidateData"));
  const { id: questionBankId } = useParams();
  console.log("Question Bank ID from URL:", questionBankId);
  console.log('candidate Id', candidateData.candidate.id)

 
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Step 1: Fetch the questionBankId based on the sectorId
        
   
        if (questionBankId) {
          
          // Step 2: Use the questionBankId to fetch the actual questions
          const reduxApi = await dispatch(reqToGetQuestionsModule(questionBankId));

          if (reduxApi.payload.data) {
            setQuestions(reduxApi.payload.data);
          } else {
            console.error("Failed to fetch questions");
          }
        } else {
          console.error("Failed to fetch question bank ID");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [dispatch]);




  const captureImage = () => {
    if (webcamRef.current) { // Ensure the webcam reference is valid
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
    } else {
      console.error("Webcam reference is null");
    }
  };

  //geoLoaction
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          console.log('postition', position)
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
    const intervalId = setInterval(() => {
      captureImage();
    }, 10000); // Capture every 1 second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

  }, []);

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    const currentQuestion = questions[selectedQuestion];
    if (!currentQuestion) {
      console.error('No current question found');
      return;
    }

    // Find if a response for the current question already exists
    const existingResponseIndex = responses.findIndex(
      (response) => response.questionId === currentQuestion._id
    );


    const newResponse = {
      questionId: currentQuestion._id,    // The current question's ID
      userAnswer: selectedValue           // The user's selected answer
    };
    let updatedResponses;
    if (existingResponseIndex > -1) {
      updatedResponses = [...responses];
      updatedResponses[existingResponseIndex] = newResponse;
    } else {
      updatedResponses = [...responses, newResponse];
    }
    setResponses(updatedResponses);
  };


  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
    setSelectedOption(
      responses.find((response) => response.questionId === questions[index]._id)
        ?.selectedOption || null
    );
  };


  const handleSubmit = async () => {
    try {
      // Ensure the image is captured and location is fetched before submitting
      if (!imageSrc) {
        console.error("Image not captured yet.");
        captureImage(); // Attempt to capture image if not yet captured
        return; // Exit function until image capture is successful
      }

      if (!locations.latitude || !locations.longitude) {
        console.error("Location not retrieved yet.");
        getLocation(); // Attempt to get location if not yet retrieved
        return; // Exit function until location retrieval is successful
      }
      
      // Both image and location are available, proceed with submission
      const data = {
        questionBankId: questionBankId,
        answers: responses,
        images: imageSrc,
        geolocation: locations,
        candidateId: candidateData.candidate.id,
      };

      console.log('payload subbbmit', data)
      // return false
  
      const resultAction = await dispatch(reqToSubmitAnswer(data));
      console.log('resulttt', resultAction)
      if (reqToSubmitAnswer.fulfilled.match(resultAction)) {
        toast.success("Answer submitted successfully");
        handleClick();
        setSelectedOption(null);
        setResponses([]);
        setSelectedQuestion(0);

        // if (resultAction.payload.resultAns) {
        //   setTimeout(() => {
        //     navigate("/student/UploadDocument");
        //   }, 2000);
        // }
      } else {
        console.error("Error submitting exam:", resultAction.error.message);
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };




  const handleClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    navigate("/student/UploadDocument");
  };

  const getOptionStyle = (option) => {
    return selectedOption === option
      ? {
        background:
          "linear-gradient(180deg, #15BB30 -25%, #1FB036 51.86%, #00A65A 122%)",
        color: "white",
        position: "relative",
        paddingLeft: "30px",
        borderRadius: "5px",
        border: "1px solid #00A65A",
        transition: "background 0.3s ease",
      }
      : {};
  };

  const handleNextQuestion = () => {
    if (selectedQuestion < questions.length - 1) {
      setSelectedQuestion(selectedQuestion + 1);
      setSelectedOption(
        responses.find(
          (response) =>
            response.questionId === questions[selectedQuestion + 1]?._id
        )?.selectedOption || null
      );
    }
  };

  const handlePreviousQuestion = () => {
    if (selectedQuestion > 0) {
      setSelectedQuestion(selectedQuestion - 1);
      setSelectedOption(
        responses.find(
          (response) =>
            response.questionId === questions[selectedQuestion - 1]?._id
        )?.selectedOption || null
      );
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header name="TestModule" />
          <div className="test-module-container">
            <div className="left-box">
              <div className="progress-bar-container">
                <p>
                  Question {selectedQuestion + 1}/{questions.length}
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${((selectedQuestion + 1) / questions.length) * 100
                        }%`,
                    }}
                  ></div>
                </div>
              </div>

              {questions.length > 0 && (
                <div className="questions-section">
                  <p className="question-box">
                    {questions[selectedQuestion].question}
                  </p>
                  {["optionA", "optionB", "optionC", "optionD"].map(
                    (optionKey, index) => (
                      <div
                        className="question-box"
                        key={index}
                        style={getOptionStyle(optionKey)}
                      >
                        <input
                          type="radio"
                          id={`question_${selectedQuestion}_${optionKey}`} // Unique id
                          name={`question_${selectedQuestion}`} // Group the options by question
                          value={optionKey} // Correctly pass the value
                          checked={selectedOption === optionKey}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor={optionKey}>
                          {questions[selectedQuestion][optionKey]}
                        </label>
                      </div>
                    )
                  )}
                </div>
              )}

              <div className="button_section">
                <button className="review">Review</button>
                <button
                  className="preview"
                  onClick={handlePreviousQuestion}
                  disabled={selectedQuestion === 0}
                >
                  Previous
                </button>
                <button
                  className="next"
                  onClick={handleNextQuestion}
                  disabled={selectedQuestion === questions.length - 1}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="right-box">
              <div className="logo-box">
                <img src="/img/testicon/testUser.png" alt="Test" />
              </div>

              <span className="choose-questions">Choose a question</span>

              <div className="questions-box">
                {questions.map((_, index) => (
                  <div
                    className="question-number"
                    key={index}
                    style={
                      selectedQuestion === index
                        ? { backgroundColor: "red", color: "white" }
                        : {}
                    }
                    onClick={() => handleQuestionClick(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>

              <div className="submit-box">
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
                {showPopup && (
                  <div className="popup">
                    <div className="thumbsup">&#128077;</div>
                    <p style={{ color: "black", fontSize: "16px" }}>
                      Submitted Successfully!
                    </p>
                    <p style={{ color: "black", fontSize: "14px" }}>
                      You can close the window now!
                    </p>
                    <div className="ok-box" onClick={closePopup}>
                      OK
                    </div>
                  </div>
                )}
              </div>

              <div className="image-box">
                <img
                  src={
                    imageUrl
                      ? `http://localhost:4000${imageUrl}`
                      : "/img/testicon/Mask_group.png"
                  }
                  alt="User"
                  height={200}
                />
              </div>
            </div>
          </div>


          <div>
            <h1>Exam Ready</h1>
            {/* Webcam Component */}
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              height={200}
            />


            {/* Display captured image */}
            {imageSrc && (
              <div>
                <h3>Captured Image</h3>
                <img src={imageSrc} alt="Captured" />
              </div>
            )}

            {/* Display Location */}
            {location.latitude && location.longitude && (
              <div>
                <h3>Location</h3>
                <p>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
              </div>
            )}

            {/* Save Data Button */}

          </div>
        </>
      )}
    </div>
  );
}

export default TestModule;
