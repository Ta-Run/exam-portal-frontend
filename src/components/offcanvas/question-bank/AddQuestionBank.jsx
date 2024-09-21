import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { reqToAddClientQuestionBank } from "../../../reduxToolkit/services/contentManagementServices";

const initialState = {
    assginedSectorsId: "",
    jobRoleId: "",
    type: "",
    questionBankName: "",
    practicalType: ""
}

const AddQuestionBank = ({ show, handleClose, sectorDropDown, clientJobRoleDropDown, handleGetQuestionBank }) => {

    const dispatch = useDispatch();

    // States
    const [questionBank, setQuestionBank] = useState(initialState);

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;

        setQuestionBank((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await dispatch(reqToAddClientQuestionBank(questionBank));

            if (response?.payload?.res) {
                handleGetQuestionBank();
                handleClose();
                setQuestionBank(initialState);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement={"end"}
                className="sector-canvas"
            >
                <div className="offcanvas-header sector-header">
                    <h5 className="offcanvas-title">Add Question Bank</h5>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="close-btn"
                        aria-label="Close"
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </div>
                <div className="offcanvas-body sector-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="assginedSectorsId" className="form-label mb-2">
                                Assigned sectors
                            </label>
                            <select className="form-select" name="assginedSectorsId" id="assginedSectorsId" onChange={handleChange} required value={questionBank.assginedSectorsId}>
                                <option value="">Select</option>
                                {
                                    sectorDropDown?.map((item) => {
                                        return (
                                            <option value={item?._id} key={item?._id}>{item?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="jobRoleId" className="form-label mb-2">
                                Job Role
                            </label>
                            <select className="form-select" name="jobRoleId" id="jobRoleId" onChange={handleChange} required value={questionBank.jobRoleId}>
                                <option value="">Select</option>
                                {
                                    clientJobRoleDropDown?.map((item) => {
                                        return (
                                            <option value={item?._id} key={item?._id}>{item?.jobRoleName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type" className="form-label mb-2">
                                Type
                            </label>
                            <select className="form-select" name="type" id="type" onChange={handleChange} required value={questionBank.type}>
                                <option value="">Select</option>
                                <option value="Theory">Theory</option>
                                <option value="Practical">Practical</option>
                                <option value="PracticalMCQ">PracticalMCQ</option>
                                <option value="Viva">Viva</option>
                                <option value="Subjective">Subjective</option>
                            </select>
                        </div>
                        {
                            (questionBank.type === "Practical" || questionBank.type === "Viva") && (
                                <div className="mb-4">
                                    <label htmlFor="practicalType" className="form-label mb-2">
                                        Practical Type*
                                    </label>
                                    <select className="form-select" name="practicalType" id="practicalType" onChange={handleChange} required value={questionBank.practicalType}>
                                        <option value="">Select</option>
                                        <option value="Scenario Based">Scenario Based</option>
                                        <option value="Question Based">Question Based</option>
                                    </select>
                                </div>
                            )
                        }
                        <div className="mb-4">
                            <label htmlFor="questionBankName" className="form-label">
                                Question Bank Name
                            </label>
                            <input
                                type="text"
                                name="questionBankName"
                                id="questionBankName"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                required
                                value={questionBank.questionBankName}
                            />
                        </div>
                        <div>
                            <button type="submit" className="submit-btn">
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </Offcanvas>
        </>
    );
};

export default AddQuestionBank;