import { useEffect, useState } from "react";
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

function TestModule() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [responses, setResponses] = useState([]);
  // >>>>>>>>>>>>>>>>>>>>>>
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  let { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const clientId = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const reduxApi = await dispatch(reqToGetQuestionsModule(id));
        if (reduxApi.payload.data) {
          setQuestions(reduxApi.payload.data);
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
    fetchUserImages();
  }, [dispatch, id]);

  const fetchUserImages = async () => {
    try {
      setLoading(true);
      const data = await dispatch(reqToFetchCandidateDocumentDetails(clientId));
      if (data.payload.data) {
        const userData = data.payload.data;
        if (userData && userData.yourPhoto) {
          setImageUrl(userData.yourPhoto);
        }
      } else {
        console.error("Failed to fetch user details:", data.msg);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;

    setSelectedOption(selectedValue);

    const currentQuestion = questions[selectedQuestion];

    if (!currentQuestion) {
        console.error('No current question found');
        return;
    }

    const existingResponseIndex = responses.findIndex(
      (response) => response.questionId === currentQuestion._id
    );

    const newResponse = {
      questionBankId: currentQuestion.questionBankId,
      answer: [
        {
          userAnswer: selectedValue,
          questionId: currentQuestion._id,
        },
      ],
    };

    let updatedResponses;
    if (existingResponseIndex > -1) {
        updatedResponses = [...responses];
        updatedResponses[existingResponseIndex] = newResponse;
    } else {
        updatedResponses = [...responses, newResponse];
    }

    // Log the updated responses array
    console.log('Updated Responses (array):', updatedResponses);

    // Ensure that setResponses is called with an array
    setResponses(updatedResponses);

    // Check the responses state after it's been updated
    console.log('Responses State (after update):', responses);
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
      // const token = localStorage.getItem("persist:client");
      // const parsedData = JSON.parse(token);
      // const userToken = parsedData && parsedData.client ? JSON.parse(parsedData.client)?.authentication?.accessToken : null;

      // if (!userToken) {
      //     throw new Error("Token not found.");
      // }

      // console.log('responses', responses);

      // Dispatch the reqToSubmitAnswer thunk and send responses as the payload
      const resultAction = await dispatch(reqToSubmitAnswer(responses));
      // console.log("after the submiy "+ resultAction);
      if (reqToSubmitAnswer.fulfilled.match(resultAction)) {
        // If the API call is successful
        toast.success("Answer submitted successfully");
        handleClick(); // Call the function to show the popup
        setSelectedOption(null);
        setResponses([]);
        setSelectedQuestion(0);

        // Check the status and navigate
        if (resultAction.payload.status === 200) {
          console.log("submit-exam", resultAction.payload.status);
          console.log("Exam successfully submitted");
          navigate("/client/test-modules/UploadDocument");
        }
      } else if (reqToSubmitAnswer.rejected.match(resultAction)) {
        // If the API call fails
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
    setShowPopup(false);
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
                      width: `${
                        ((selectedQuestion + 1) / questions.length) * 100
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
        </>
      )}
    </div>
  );
}

export default TestModule;
