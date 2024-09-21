import React, { useEffect, useState } from 'react';
import "./AddQuestion.scss";
import dummy from "../../../images/dummy.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import { reqToEditClientQuestion } from '../../../reduxToolkit/services/contentManagementServices';
import { useDispatch } from 'react-redux';
import { IMAGE_URL } from '../../../config';

const initialState = {
    id: "",
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

const EditQuestion = ({ show, handleClose, handleGetQuestion, clientNosDropDown, editData }) => {

    console.log("editData --> ", editData);

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
        setQuestion({
            id: editData?._id,
            questionBankId: editData?.questionBankId,
            nosId: editData?.nosId,
            difficultyLevel: editData?.difficultyLevel,
            questionMarks: editData?.questionMarks,
            questionType: editData?.questionType,
            question: editData?.question,
            attatchment: editData?.attatchment,
            optionA: editData?.optionA,
            optionAAttatchment: editData?.optionAAttatchment,
            optionB: editData?.optionB,
            optionBAttatchment: editData?.optionBAttatchment,
            optionC: editData?.optionC,
            optionCAttatchment: editData?.optionCAttatchment,
            optionD: editData?.optionD,
            optionDAttatchment: editData?.optionDAttatchment,
            writeOption: editData?.writeOption
        })

        setAttachmentPreview(`${IMAGE_URL}${editData?.attatchment}` || dummy);
        setOptionPreviews({
            optionA: `${IMAGE_URL}${editData?.optionAAttatchment}` || dummy,
            optionB: `${IMAGE_URL}${editData?.optionBAttatchment}` || dummy,
            optionC: `${IMAGE_URL}${editData?.optionCAttatchment}` || dummy,
            optionD: `${IMAGE_URL}${editData?.optionDAttatchment}` || dummy
        });
    }, [editData])

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
            const response = await dispatch(reqToEditClientQuestion(question));

            if (response?.payload?.res) {
                handleGetQuestion();
                handleClose();
                setQuestion(initialState);
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
                <h5 className="offcanvas-title">Edit Question</h5>
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
                            onChange={handleChange}
                            value={question?.nosId || ""}
                            required
                        >
                            <option hidden>Please Select</option>
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
                            onChange={handleChange}
                            value={question?.difficultyLevel || ""}
                            required
                        >
                            <option hidden>Please Select</option>
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
                            onChange={handleChange}
                            value={question?.questionMarks || ""}
                            required
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
                            value={question?.questionType || ""}
                            disabled
                            style={{ cursor: "not-allowed" }}
                        >
                            <option hidden>Please Select</option>
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
                            onChange={handleChange}
                            value={question?.question || ""}
                            required
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
                                <a href={attachmentPreview} target='_blank'>
                                    <img
                                        src={attachmentPreview}
                                        alt="attachment"
                                        className="img-fluid que-img"
                                        onError={(e) =>
                                            (e.target.onerror = null)(
                                                (e.target.src = dummy)
                                            )
                                        }
                                    />
                                </a>
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
                                                        value={question[`option${opt}`] || ""}
                                                        required
                                                    />
                                                </td>
                                                <td className='d-flex align-items-center gap-3'>
                                                    <input
                                                        type="radio"
                                                        name="writeOption"
                                                        className='form-check-input'
                                                        onChange={handleChange}
                                                        value={opt?.toLowerCase() || ""}
                                                        checked={question?.writeOption?.split(',')?.includes(opt?.toLowerCase())}
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
                                                    <a href={optionPreviews[`option${opt}`]} target='_blank'>
                                                        <img
                                                            src={optionPreviews[`option${opt}`]}
                                                            alt={`option${opt}`}
                                                            className="img-fluid table-img"
                                                            onError={(e) =>
                                                                (e.target.onerror = null)(
                                                                    (e.target.src = dummy)
                                                                )
                                                            }
                                                        />
                                                    </a>
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
                                <a href={attachmentPreview} target='_blank' >
                                    <img
                                        src={attachmentPreview}
                                        alt="attatchment"
                                        className="img-fluid que-img"
                                        onError={(e) =>
                                            (e.target.onerror = null)(
                                                (e.target.src = dummy)
                                            )
                                        }
                                    />
                                </a>
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
                                                        value={question[`option${opt}`] || ""}
                                                        required
                                                    />
                                                </td>
                                                <td className='d-flex align-items-center gap-3'>
                                                    <input
                                                        type="checkbox"
                                                        name="writeOption"
                                                        className='form-check-input'
                                                        onChange={handleChange}
                                                        value={opt?.toLowerCase() || ""}
                                                        checked={question?.writeOption?.split(',')?.includes(opt?.toLowerCase())}
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
                                                    <a href={optionPreviews[`option${opt}`]} target='_blank' >
                                                        <img
                                                            src={optionPreviews[`option${opt}`]}
                                                            alt={`option${opt}`}
                                                            className="img-fluid table-img"
                                                            onError={(e) =>
                                                                (e.target.onerror = null)(
                                                                    (e.target.src = dummy)
                                                                )
                                                            } />
                                                    </a>
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
                                    checked={question?.writeOption === "true"}
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
                                    checked={question?.writeOption === "false"}
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
                                value={question?.writeOption || ""}
                                required
                            />
                        </div>
                    )}

                    <div className='mt-3'>
                        <button className='add-question-btn'>Edit Question</button>
                    </div>

                </form>
            </div>
        </Offcanvas>
    )
}

export default EditQuestion