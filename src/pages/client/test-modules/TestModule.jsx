import { useEffect, useState } from 'react';
import Header from '../../../components/header/admin/Header';
import './TestModule.scss'; // Assuming the SCSS file is named TestModule.scss
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { reqToGetQuestionsModule } from '../../../reduxToolkit/services/testModuleService';

var token = {
    headers: {
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjgzN2IwZDI3Njk4NjY5YTAwNzA2MzEiLCJqdGkiOiI1MDEwODU1M2MyOTc5NmExNjkzYjUzYThiMDFjYzI3NjNiNDkyNGJkZTQ0MTMwODM3ZWYwNGMxOTQxMzQ2MTM1IiwiZW1haWwiOiJkYXhpdEBnbWFpbC5jb20iLCJsb2dpblR5cGUiOiJDbGllbnQiLCJpYXQiOjE3Mjc0MjAyMDUsImV4cCI6MTc1ODk1NjIwNX0.tubXZKzJkl13iwuPfJG-bqDX-xndJUR94TPUPi5LjtU' // Replace with your JWT token
    }
};

function TestModule() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(0); // Start with the first question
    const [questions, setQuestions] = useState([]); // State to store fetched questions
    const [responses, setResponses] = useState([]); // State to store user responses
    const [loading, setLoading] = useState(true); // State to handle loading
    const [userDetail, setUserDetail] = useState([])


    let { id } = useParams();
    const dispatch = useDispatch();

    // Fetch data from the API when the component mounts
    useEffect(() => {

        const fetchQuestions = async () => {
            try {
                const reduxApi = await dispatch(reqToGetQuestionsModule());

                if (reduxApi.payload.data) {
                    setQuestions(reduxApi.payload.data);
                } else {
                    console.error('Failed to fetch questions:', data.msg);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoading(false);
            }
        };


        const fetchUserDetails = async () => {
            try {
                const data = await axios.get(`http://localhost:4000/api/v1/exam/get-document/${id}`, token);

                if (data.data.data) {
                    setUserDetail(data.data.data);
                } else {
                    console.error('Failed to fetch questions:', data.msg);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
        fetchUserDetails();
    }, []);

    // Handle the radio button change
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);

        // Update or add the response to the responses array
        const updatedResponses = [...responses];
        const existingResponseIndex = updatedResponses.findIndex(response => response.questionId === questions[selectedQuestion]._id);

        if (existingResponseIndex > -1) {
            updatedResponses[existingResponseIndex].selectedOption = e.target.value;
        } else {
            updatedResponses.push({
                questionBankId: questions[selectedQuestion].questionBankId,
                nosId: questions[selectedQuestion].nosId,
                selectedOption: e.target.value,
                question: questions[selectedQuestion].question
            });
        }

        setResponses(updatedResponses);
    };

    // Handle question click
    const handleQuestionClick = (index) => {
        setSelectedQuestion(index);
        setSelectedOption(responses.find(response => response.questionId === questions[index]._id)?.selectedOption || null);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/exam/submit-exam',
                {
                    questionBankId: "66837b9a27698669a00706e8",
                    nosId: "66ef249babeea9715b1b9163",
                    selectedOption: "A",
                    question: "Mathematics Quiz Bank"
                }
                , token);
            if (response.data.message) {
                toast.success('Exam submitted successfully!');
            } else {
                alert('Failed to submit exam.');
            }
        } catch (error) {
            console.error('Error submitting exam:', error);
            alert('An error occurred while submitting your exam.');
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
                            src={userDetail && userDetail.yourPhoto
                                ? `http://localhost:4000${userDetail.yourPhoto}`
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
