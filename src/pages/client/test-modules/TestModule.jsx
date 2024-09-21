import { useState } from 'react';
import Header from '../../../components/header/admin/Header';
import './TestModule.scss'; // Assuming the SCSS file is named TestModule.scss

function TestModule() {
    // State to track the selected option
    const [selectedOption, setSelectedOption] = useState(null);

    const [selectedQuestion, setSelectedQuestion] = useState(null);


    // Handle the radio button change
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Conditionally set className or inline style for selected option
    const getOptionStyle = (option) => {
        return selectedOption === option ? { backgroundColor: 'blue', color: 'white' } : {};
    };




    // Handle question click
    const handleQuestionClick = (index) => {
        setSelectedQuestion(index);
    };

    // Conditionally set className or inline style for selected question
    const getQuestionStyle = (index) => {
        return selectedQuestion === index ? { backgroundColor: 'red', color: 'white' } : {};
    };


    return (
        <div>
            <Header name='TestModule' />
            <div className="test-module-container">
                <div className='left-box'>
                    {/* Progress Bar */}
                    <div className='progress-bar-container'>
                        <p>Question 1/20</p>
                        <div className='progress-bar'>
                            <div className='progress-bar-fill' style={{ width: '75%' }}></div>
                        </div>

                    </div>

                    {/* Questions Section */}
                    <div className='questions-section'>
                        <p className='question-box'>Question 1: 1.It is a long established fact that a reader will be distracted by the readable content of a page wh
                            en looking at its layout.?</p>
                        <div className='question-box' style={getOptionStyle('option1')}>
                            <input
                                type='radio'
                                id='option1'
                                name='question1'
                                value='option1'
                                checked={selectedOption === 'option1'}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor='option1'>Paris</label>
                        </div>
                        <div className='question-box' style={getOptionStyle('option1')}>
                            <input
                                type='radio'
                                id='option1'
                                name='question1'
                                value='option1'
                                checked={selectedOption === 'option1'}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor='option2'>London</label>
                        </div>
                        <div className='question-box' style={getOptionStyle('option1')}>
                            <input
                                type='radio'
                                id='option1'
                                name='question1'
                                value='option1'
                                checked={selectedOption === 'option1'}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor='option3'>Berlin</label>
                        </div>
                        <div className='question-box' style={getOptionStyle('option1')}>
                            <input
                                type='radio'
                                id='option1'
                                name='question1'
                                value='option1'
                                checked={selectedOption === 'option1'}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor='option4'>Madrid</label>
                        </div>
                    </div>
                    <div className='button_section'>
                        <button className='review'>Review</button>
                        <button className='preview'>Preveiw</button>
                        <button className='next'>Next</button>
                    </div>
                </div>
                <div className='right-box'>
                    {/* Logo Section */}
                    <div className='logo-box'>
                        <img src="/img/testicon/testUser.png" alt="Test" />

                    </div>

                    {/* Choose Questions Label */}
                    <span className='choose-questions'>Choose a question</span>

                    {/* Questions Box with 5x4 Grid */}
                    <div className='questions-box'>
                        {Array.from({ length: 20 }).map((_, index) => (
                            <div className='question-number' key={index}

                                style={getQuestionStyle(index)}
                                onClick={() => handleQuestionClick(index)} >
                                {index + 1}
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className='submit-box'>
                        <button className='submit-btn'>Submit</button>
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
