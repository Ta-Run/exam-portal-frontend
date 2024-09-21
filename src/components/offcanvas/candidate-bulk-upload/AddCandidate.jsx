import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import dummy from "../../../images/dummy.png";
import { useDispatch } from "react-redux";
import { reqToAddClientCandidateBulkUpload } from "../../../reduxToolkit/services/userManagementServices";
import { useDisableNextDate } from "../../../hooks/useDisablePrevDate";
import { useFormValidation } from "../../../hooks/useValidation";

const initialState = {
    BatchName: "",
    EnrollmentNumber: "",
    Gender: "",
    CandidateName: "",
    Email: "",
    ContactNumber: "",
    DateOfBirth: "",
    FatherName: "",
    Address: "",
    ProfilePicture: "",
    AadharCard: "",
}

const AddCandidate = ({ show, handleClose, handleGetCandidate, clientBatchDropDown }) => {

    const dispatch = useDispatch();
    const { error, setError, handleBlur, handleInput } = useFormValidation();

    // States
    const [candidate, setCandidate] = useState(initialState);

    const maxDate = useDisableNextDate();

    // getImageUrl
    const getImageUrl = (file) => {
        return file instanceof File ? URL.createObjectURL(file) : dummy;
    };

    // handleChange
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setCandidate((prev) => ({
                ...prev,
                [name]: files[0]
            }))
        } else {
            setCandidate((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    // handleInputValidation
    const handleInputValidation = (e) => {
        const { maxLength, value } = e.target;
        if (value.length > maxLength) {
            e.target.value = value.slice(0, maxLength);
        }
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitData = {
            ...candidate,
            Email: candidate.Email.toLowerCase()
        }

        try {
            if (!error) {
                const response = await dispatch(reqToAddClientCandidateBulkUpload(submitData));

                if (response?.payload?.status) {
                    handleGetCandidate();
                    handleClose();
                    setCandidate(initialState);
                    setError("");
                }
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
                className="que-canvas"
            >
                <div className="offcanvas-header que-header">
                    <h5 className="offcanvas-title">Add Candidate</h5>
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
                        <div className="mb-4">
                            <label htmlFor="BatchName" className="form-label mb-2">
                                Batch Name
                            </label>

                            <select
                                className="form-select"
                                name="BatchName"
                                id="BatchName"
                                required
                                value={candidate?.BatchName || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {
                                    clientBatchDropDown?.map((item) => {
                                        return (
                                            <option value={item?._id} key={item?._id}>{item?.BatchCode}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Gender" className="form-label mb-2">
                                Gender
                            </label>
                            <select
                                className="form-select"
                                name="Gender"
                                id="Gender"
                                required
                                value={candidate?.Gender || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Email" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="Email"
                                id="Email"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={candidate?.Email || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="DateOfBirth" className="form-label">
                                Date Of Birth
                            </label>
                            <input
                                type="date"
                                name="DateOfBirth"
                                id="DateOfBirth"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={candidate?.DateOfBirth || ""}
                                onChange={handleChange}
                                max={maxDate}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Address" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                name="Address"
                                id="Address"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={candidate?.Address || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="EnrollmentNumber" className="form-label">
                                Enrollment Number
                            </label>
                            <input
                                type="number"
                                name="EnrollmentNumber"
                                id="EnrollmentNumber"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={candidate?.EnrollmentNumber || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="CandidateName" className="form-label">
                                Candidate Name
                            </label>
                            <input
                                type="text"
                                name="CandidateName"
                                id="CandidateName"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={candidate?.CandidateName || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ContactNumber" className="form-label">
                                Mobile Number
                            </label>
                            <input
                                type="number"
                                name="ContactNumber"
                                id="ContactNumber"
                                className="form-control que_input"
                                maxLength={10}
                                onInput={handleInput}
                                autoComplete="off"
                                required
                                value={candidate?.ContactNumber || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {error && <p className="text-danger err-msg">{error}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="FatherName" className="form-label">
                                Father Name
                            </label>
                            <input
                                type="text"
                                name="FatherName"
                                id="FatherName"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={candidate?.FatherName || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ProfilePicture" className="form-label">Profile Picture</label>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <input
                                    className="form-control que_file_input"
                                    type="file"
                                    name='ProfilePicture'
                                    id="ProfilePicture"
                                    accept="image/*"
                                    required
                                    onChange={handleChange}
                                />
                                <img src={getImageUrl(candidate?.ProfilePicture)} alt="Profile Picture" className="img-fluid que-img" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="AadharCard" className="form-label">
                                Aadhar Card
                            </label>
                            <input
                                type="number"
                                name="AadharCard"
                                id="AadharCard"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={candidate?.AadharCard || ""}
                                onChange={handleChange}
                                maxLength={12}
                                onInput={handleInputValidation}
                            />
                        </div>
                        <div>
                            <button type="submit" className="add-question-btn">
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </Offcanvas>
        </>
    );
};

export default AddCandidate;