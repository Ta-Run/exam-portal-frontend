import { useEffect, useState } from 'react';
import Header from '../../../components/header/admin/Header';
import './TestModule.scss'; // Assuming the SCSS file is named TestModule.scss
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { reqToGetQuestionsModule, reqToSubmitAnswer, reqToFetchCandidateDocumentDetails } from '../../../reduxToolkit/services/testModuleService';


function TestModule() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState([])

    let { id } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const clientId = location.state || {};
    console.log(clientId)


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const reduxApi = await dispatch(reqToGetQuestionsModule(id));
                if (reduxApi.payload.data) {
                    setQuestions(reduxApi.payload.data);
                } else {
                    console.error('Failed to fetch questions:',);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
        fetchUserImages()

    }, []);
    console.log(imageUrl)

    //fetch user profile 
    // Function to fetch user details based on client ID
    const fetchUserImages = async () => {
        try {
            setLoading(true);
            const data = await dispatch(reqToFetchCandidateDocumentDetails(clientId));


            if (data.payload.data) {
                const userData = data.payload.data;


                if (userData && userData.yourPhoto) {
                    setImageUrl(userData.yourPhoto); // Set the preview URL
                }
            } else {
                console.error('Failed to fetch user details:', data.msg);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle the radio button change
    // Handle the radio button change
    const handleOptionChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);

        const currentQuestion = questions[selectedQuestion];

        // Check if the response for the current question already exists
        const existingResponseIndex = responses.findIndex(
            (response) => response.questionId === currentQuestion._id
        );

        // Create a new response object
        const newResponse = {
            questionBankId: currentQuestion.questionBankId,
            nosId: currentQuestion.nosId,
            selectedOption: selectedValue,
            question: currentQuestion.question,
            questionId: currentQuestion._id
        };

        let updatedResponses;

        if (existingResponseIndex > -1) {
            // Update the existing response
            updatedResponses = [...responses];
            updatedResponses[existingResponseIndex] = newResponse;
        } else {
            // Add the new response
            updatedResponses = [...responses, newResponse];
        }

        // Update the responses state
        setResponses(updatedResponses);
    };

    // Handle question click
    const handleQuestionClick = (index) => {
        setSelectedQuestion(index);
        setSelectedOption(responses.find(response => response.questionId === questions[index]._id)?.selectedOption || null);
    };

    const handleSubmit = async () => {
        try {

            const token = localStorage.getItem("persist:client");
            const parsedData = JSON.parse(token);
            const userToken = parsedData && parsedData.client ? JSON.parse(parsedData.client)?.authentication?.accessToken : null;

            const answerResponse = await axios.post('http://localhost:4000/api/v1/exam/submit-exam', responses, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
            })
            // console.log(answerResponse.data) 
            // const reduxResponse = await dispatch(reqToSubmitAnswer(responses));

            if (answerResponse) {
                toast.success(
                    answerResponse.message);

                // Optionally reset states here
                setSelectedOption(null);
                setResponses([]);
                setSelectedQuestion(0);
            }
        } catch (error) {
            console.error('Error submitting exam:', error);
        }
    };

    // Conditionally set className or inline style for selected option
    const getOptionStyle = (option) => {
        return selectedOption === option ? {
            background: 'linear-gradient(180deg, #15BB30 -25%, #1FB036 51.86%, #00A65A 122%)',
            color: 'white',
            position: 'relative',
            paddingLeft: '30px', // Provide space for the checkmark
            borderRadius: '5px', // Add border radius if needed
            border: '1px solid #00A65A', // Add border to match style
            transition: 'background 0.3s ease',
        } : {};
    };

    // Handle next question
    const handleNextQuestion = () => {
        if (selectedQuestion < questions.length - 1) {
            setSelectedQuestion(selectedQuestion + 1);
            setSelectedOption(responses.find(response => response.questionId === questions[selectedQuestion + 1]?._id)?.selectedOption || null);
        }
    };

    // Handle previous question
    const handlePreviousQuestion = () => {
        if (selectedQuestion > 0) {
            setSelectedQuestion(selectedQuestion - 1);
            setSelectedOption(responses.find(response => response.questionId === questions[selectedQuestion - 1]?._id)?.selectedOption || null);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header name='TestModule' />
            <div className="test-module-container">
                <div className='left-box'>
                    {/* Progress Bar */}
                    <div className='progress-bar-container'>
                        <p>Question {selectedQuestion + 1}/{questions.length}</p>
                        <div className='progress-bar'>
                            <div className='progress-bar-fill' style={{ width: `${(selectedQuestion + 1) / questions.length * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Questions Section */}
                    {questions.length > 0 && (
                        <div className='questions-section'>
                            <p className='question-box'>{questions[selectedQuestion].question}</p>
                            {['optionA', 'optionB', 'optionC', 'optionD'].map((optionKey, index) => (
                                <div className='question-box' key={index} style={getOptionStyle(optionKey)}>
                                    <input
                                        type='radio'
                                        id={optionKey}
                                        name='question'
                                        value={optionKey}
                                        checked={selectedOption === optionKey}
                                        onChange={handleOptionChange}
                                    />
                                    <label htmlFor={optionKey}>{questions[selectedQuestion][optionKey]}</label>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='button_section'>
                        <button className='review'>Review</button>
                        <button className='preview' onClick={handlePreviousQuestion} disabled={selectedQuestion === 0}>Previous</button>
                        <button className='next' onClick={handleNextQuestion} disabled={selectedQuestion === questions.length - 1}>Next</button>
                    </div>
                </div>

                <div className='right-box'>
                    <div className='logo-box'>
                        <img src="/img/testicon/testUser.png" alt="Test" />
                    </div>

                    <span className='choose-questions'>Choose a question</span>

                    <div className='questions-box'>
                        {questions.map((_, index) => (
                            <div className='question-number' key={index}
                                style={selectedQuestion === index ? { backgroundColor: 'red', color: 'white' } : {}}
                                onClick={() => handleQuestionClick(index)}>
                                {index + 1}
                            </div>
                        ))}
                    </div>

                    <div className='submit-box'>
                        <button className='submit-btn' onClick={handleSubmit}>Submit</button>
                    </div>

                    <div className='image-box'>
                        <img
                            src={imageUrl && imageUrl
                                ? `http://localhost:4000${imageUrl}`
                                : "/img/testicon/Mask_group.png"}
                            alt="User"
                            height={200}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestModule;
