import React, { useEffect, useState } from 'react';
import "./AddQuestion.scss";
import dummy from "../../../images/dummy.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import { reqToAddClientQuestion } from '../../../reduxToolkit/services/contentManagementServices';
import { useDispatch } from 'react-redux';

const initialState = {
    questionBankId: "",
    nosId: "",
    difficultyLevel: "",
    questionMarks: "",
    questionType: "",
    question: "",
    attatchment: "",
    optionA: "",
    optionAAttatchment: "",
    optionB: "",
    optionBAttatchment: "",
    optionC: "",
    optionCAttatchment: "",
    optionD: "",
    optionDAttatchment: "",
    writeOption: ""
}

const AddQuestion = ({ show, handleClose, handleGetQuestion, clientNosDropDown, id }) => {

    const dispatch = useDispatch();

    // States
    const [question, setQuestion] = useState(initialState);
    const [attachmentPreview, setAttachmentPreview] = useState(dummy);
    const [optionPreviews, setOptionPreviews] = useState({
        optionA: dummy,
        optionB: dummy,
        optionC: dummy,
        optionD: dummy
    });
    const [validationError, setValidationError] = useState(false);

    useEffect(() => {
        if (id) {
            setQuestion((prev) => ({
                ...prev,
                questionBankId: id
            }))
        }
    }, [id])

    // handleChange
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setQuestion((prev) => {
                const newWriteOption = checked
                    ? [...prev.writeOption.split(','), value].filter(Boolean).join(',')
                    : prev.writeOption.split(',').filter((opt) => opt !== value).join(',');
                return { ...prev, writeOption: newWriteOption };
            });
        } else {
            setQuestion((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    // handleImageChange
    const handleImageChange = (event, key) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (key === 'attatchment') {
                    setAttachmentPreview(reader.result);
                    setQuestion((prev) => ({
                        ...prev,
                        attatchment: file
                    }));
                } else {
                    setOptionPreviews((prev) => ({
                        ...prev,
                        [key]: reader.result
                    }));
                    setQuestion((prev) => ({
                        ...prev,
                        [`${key}Attatchment`]: file
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (question.writeOption === "") {
            setValidationError(true);
            return;
        }

        try {

            const response = await dispatch(reqToAddClientQuestion(question));

            if (response?.payload?.res) {
                handleGetQuestion();
                handleClose();
                setQuestion((prev) => ({
                    ...prev,
                    nosId: "",
                    difficultyLevel: "",
                    questionMarks: "",
                    questionType: "",
                    question: "",
                    attatchment: "",
                    optionA: "",
                    optionAAttatchment: "",
                    optionB: "",
                    optionBAttatchment: "",
                    optionC: "",
                    optionCAttatchment: "",
                    optionD: "",
                    optionDAttatchment: "",
                    writeOption: ""
                }));
                setAttachmentPreview(dummy);
                setOptionPreviews({
                    optionA: dummy,
                    optionB: dummy,
                    optionC: dummy,
                    optionD: dummy
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Offcanvas
            show={show}
            onHide={handleClose}
            placement={"end"}
            className="que-canvas full-screeen-canvas"
        >
            <div className="offcanvas-header que-header">
                <h5 className="offcanvas-title">Add Question</h5>
                <button
                    type="button"
                    onClick={handleClose}
                    className="close-btn"
                    aria-label="Close"
                >
                    <i className="fa-regular fa-circle-xmark"></i>
                </button>
            </div>
            <div className="offcanvas-body que-body">
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor="nosId" className="form-label">
                            NOS
                        </label>
                        <select
                            className="form-select"
                            name='nosId'
                            id='nosId'
                            required
                            onChange={handleChange}
                        >
                            <option value="">Please Select</option>
                            {
                                clientNosDropDown?.map((item) => {
                                    return (
                                        <option value={item?._id} key={item?._id}>{item?.nosName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="difficultyLevel" className="form-label">
                            Difficulty level
                        </label>
                        <select
                            className="form-select"
                            name='difficultyLevel'
                            id='difficultyLevel'
                            required
                            onChange={handleChange}
                        >
                            <option value="">Please Select</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Difficult">Difficult</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="questionMarks" className="form-label">
                            Question Marks
                        </label>
                        <input
                            type="number"
                            className="form-control que_input"
                            name='questionMarks'
                            id='questionMarks'
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="questionType" className="form-label">
                            Question Type
                        </label>
                        <select
                            className="form-select ques-select"
                            onChange={handleChange}
                            name='questionType'
                            id='questionType'
                            required
                        >
                            <option value="">Please Select</option>
                            <option value="Multiple Choice">Multiple Choice</option>
                            <option value="Multiple Responses">Multiple Response</option>
                            <option value="True/False">True/False</option>
                            <option value="Fill in the blanks">Fill in the blanks</option>
                            <option value="One Word Answer">One Word Answer</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="question" className="form-label">
                            Question
                        </label>
                        <textarea
                            className="form-control que-textarea"
                            name='question'
                            id='question'
                            rows="3"
                            required
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    {question.questionType === "Multiple Choice" && (
                        <>
                            <div className="d-flex align-items-center justify-content-between">
                                <input
                                    className="form-control que_file_input"
                                    type="file"
                                    name='attatchment'
                                    onChange={(e) => handleImageChange(e, 'attatchment')}
                                    accept="image/*"
                                />
                                <img src={attachmentPreview} alt="attachment" className="img-fluid que-img" />
                            </div>
                            <div className="table-responsive">
                                <table className="table que-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Option</th>
                                            <th scope="col">Correct Answer</th>
                                            <th scope="col">Picture</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {['A', 'B', 'C', 'D'].map((opt) => (
                                            <tr key={opt}>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control table-input"
                                                        name={`option${opt}`}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </td>
                                                <td className='d-flex align-items-center gap-3'>
                                                    <input
                                                        type="radio"
                                                        name="writeOption"
                                                        className='form-check-input'
                                                        onChange={handleChange}
                                                        value={opt.toLowerCase()}
                                                        required
                                                    />
                                                    <input
                                                        type="file"
                                                        className='d-none'
                                                        name={`option${opt}Attatchment`}
                                                        id={`option${opt}Attatchment`}
                                                        onChange={(e) => handleImageChange(e, `option${opt}`)}
                                                        accept="image/*"
                                                    />
                                                    <label htmlFor={`option${opt}Attatchment`} type="button" className="table-input-file">
                                                        Choose file
                                                    </label>
                                                </td>
                                                <td>
                                                    <img src={optionPreviews[`option${opt}`]} alt={`option${opt}`} className="img-fluid table-img" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {question.questionType === "Multiple Responses" && (
                        <>
                            <div className="d-flex align-items-center justify-content-between">
                                <input
                                    className="form-control que_file_input"
                                    type="file"
                                    name='attatchment'
                                    onChange={(e) => handleImageChange(e, 'attatchment')}
                                    accept="image/*"
                                />
                                <img src={attachmentPreview} alt="attatchment" className="img-fluid que-img" />
                            </div>
                            <div className="table-responsive">
                                <table className="table que-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Option</th>
                                            <th scope="col">Correct Answer</th>
                                            <th scope="col">Picture</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {['A', 'B', 'C', 'D'].map((opt) => (
                                            <tr key={opt}>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control table-input"
                                                        name={`option${opt}`}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </td>
                                                <td className='d-flex align-items-center gap-3'>
                                                    <input
                                                        type="checkbox"
                                                        name="writeOption"
                                                        className='form-check-input'
                                                        onChange={handleChange}
                                                        value={opt.toLowerCase()}
                                                    />
                                                    <input
                                                        type="file"
                                                        className='d-none'
                                                        name={`option${opt}Attatchment`}
                                                        id={`option${opt}Attatchment`}
                                                        onChange={(e) => handleImageChange(e, `option${opt}`)}
                                                        accept="image/*"
                                                    />
                                                    <label htmlFor={`option${opt}Attatchment`} type="button" className="table-input-file">
                                                        Choose file
                                                    </label>
                                                </td>
                                                <td>
                                                    <img src={optionPreviews[`option${opt}`]} alt={`option${opt}`} className="img-fluid table-img" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {validationError && (
                                <div className="text-danger err-msg">Please select at least one correct answer.</div>
                            )}
                        </>
                    )}

                    {question.questionType === "True/False" && (
                        <>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="writeOption"
                                    id='trueRadio'
                                    value={"true"}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-check-label" htmlFor="trueRadio">True</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="writeOption"
                                    id='falseRadio'
                                    value={"false"}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-check-label" htmlFor="falseRadio">False</label>
                            </div>
                        </>
                    )}

                    {(question.questionType === "Fill in the blanks" || question.questionType === "One Word Answer") && (
                        <div className='mb-5'>
                            <label htmlFor="question" className="form-label">
                                Correct Answer
                            </label>
                            <input
                                className="form-control que_input"
                                name='writeOption'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className='mt-3'>
                        <button className='add-question-btn'>Add Question</button>
                    </div>

                </form>
            </div>
        </Offcanvas>
    )
}

export default AddQuestion