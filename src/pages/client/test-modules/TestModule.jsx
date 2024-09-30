import { useEffect, useState } from 'react';
import Header from '../../../components/header/admin/Header';
import './TestModule.scss'; // Assuming the SCSS file is named TestModule.scss

function TestModule() {
    const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
    // State to track the selected option
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(0); // Initialized to 0
    const [questions, setQuestions] = useState([]); // State to store fetched questions
    const [loading, setLoading] = useState(true); // State to handle loading
    const [isCorrect, setIsCorrect] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const options = [
        { id: 1, text: 'HyperText Markup Language', isCorrect: true },
        { id: 2, text: 'Hyperlink and Text Markup Language', isCorrect: false },
        { id: 3, text: 'Home Tool Markup Language', isCorrect: false },
        { id: 4, text: 'Hyper Transfer Markup Language', isCorrect: false },
    ];

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/question/66837b9a27698669a00706e8');
                const data = await response.json();
                console.log(data);
                if (data.res) {
                    setQuestions(data.data);
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
    }, []);

    // Handle the radio button change
    const handleOptionChange = (optionId) => {
        const selected = options.find(option => option.id === optionId);
        setSelectedOption(optionId);
        setIsCorrect(selected.isCorrect);
    };

    const handleClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    // Conditionally set className or inline style for selected option
    const getOptionStyle = (option) => {
        return selectedOption === option.id
            ? { border: isCorrect ? '2px solid green' : '2px solid red' }
            : {};
    };

    // Handle question click
    const handleQuestionClick = (index) => {
        setSelectedQuestion(index);
    };

    // Conditionally set className or inline style for selected question
    const getQuestionStyle = (index) => {
        return selectedQuestion === index
            ? { backgroundColor: 'red', color: 'white' }
            : {};
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
                        <p>1. What is the full form of HTML</p>

                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {options.map((option) => (
                                <li key={option.id}
                                    style={{
                                        border: '2px solid #ccc',
                                        borderRadius: '20px',
                                        padding: '10px',
                                        margin: '5px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        ...getOptionStyle(option),
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="html-options"
                                        value={option.id}
                                        checked={selectedOption === option.id}
                                        onChange={() => handleOptionChange(option.id)}
                                        style={{ marginRight: '10px' }}
                                    />
                                    <label htmlFor={`option-${option.id}`}>{option.text}</label>
                                </li>
                            ))}
                        </ul>

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
                        <button className='review' style={{ backgroundColor: 'orange' }}>Review</button>
                        <button className='preview' style={{ backgroundColor: 'red' }}>Preview</button>
                        <button className='next' style={{ backgroundColor: 'green' }} onClick={() => handleQuestionClick((selectedQuestion + 1) % questions.length)}>Next</button>
                    </div>
                </div>

                <div className='right-box'>
                    {/* Logo Section */}
                    <div className='logo-box'>
                        <img src="/img/testicon/testUser.png" alt="Test" />
                    </div>

                    {/* Choose Questions Label */}
                    <span className='choose-questions'>
                        Choose a question
                        <div
                            style={{
                                border: '1px solid grey',
                                display: 'grid',
                                borderRadius: '10px',
                                gridTemplateColumns: 'repeat(5, 1fr)',  // Always 5 circles per row
                                gap: '15px',
                                justifyItems: 'center',  // Centers the circles in each column
                                padding: '10px',
                                marginTop: '10px',
                            }}>
                            {numbers.map((number) => (
                                <div key={number}
                                    style={{
                                        width: '35px',
                                        height: '35px',
                                        borderRadius: '50%',
                                        backgroundColor: '#f0f0f0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '18px',
                                    }}
                                >
                                    {number}
                                </div>
                            ))}
                        </div>
                    </span>

                    {/* Questions Box with 5x4 Grid */}
                    <div className='questions-box'>
                        {questions.map((_, index) => (
                            <div className='question-number' key={index}
                                style={getQuestionStyle(index)}
                                onClick={() => handleQuestionClick(index)}>
                                {index + 1}
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className='submit-box'>
                        <button className='submit-btn' onClick={handleClick}>Submit</button>
                        {showPopup && (
                            <div className="popup">
                                <div className="thumbsup">&#128077;</div> 
                                <p style={{ color: 'black', fontSize: '16px' }}>Submitted Successfully!</p>
                                <p style={{ color: 'black', fontSize: '14px' }}>You can close the window now!</p>
                                <div className="ok-box" onClick={closePopup}>OK</div> 
                            </div>
                        )}
                    </div>

                    {/* Image Section */}
                    <div className='image-box'>
                        <img src="/img/testicon/Mask_group.png" alt="Test" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestModule;
