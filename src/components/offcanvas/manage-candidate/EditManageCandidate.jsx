import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import dummy from "../../../images/dummy.png";
import { useDispatch } from "react-redux";
import { reqToEditClientManageCandidate } from "../../../reduxToolkit/services/userManagementServices";
import { IMAGE_URL } from "../../../config";
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

const EditManageCandidate = ({ show, handleClose, editData, handleGetManageCandidate, clientBatchDropDown }) => {

    const dispatch = useDispatch();
    const { error, setError, handleBlur, handleInput } = useFormValidation();

    // States
    const [candidateEdit, setCandidateEdit] = useState(initialState);

    const maxDate = useDisableNextDate();

    // getImageUrl
    const getImageUrl = (file, existingUrl) => {
        if (file instanceof File) {
            return URL.createObjectURL(file);
        }
        return `${IMAGE_URL}${existingUrl}` || dummy;
    };

    // handleChange
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setCandidateEdit((prev) => ({
                ...prev,
                [name]: files[0]
            }))
        } else {
            setCandidateEdit((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    // formatDate
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // handleInputValidation
    const handleInputValidation = (e) => {
        const { maxLength, value } = e.target;
        if (value.length > maxLength) {
            e.target.value = value.slice(0, maxLength);
        }
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await dispatch(reqToEditClientManageCandidate(candidateEdit));

            if (response?.payload?.res) {
                handleGetManageCandidate();
                handleClose();
                setCandidateEdit(initialState);
                setError("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setCandidateEdit({
            id: editData?._id,
            BatchName: editData?.BatchName,
            EnrollmentNumber: editData?.EnrollmentNumber,
            Gender: editData?.Gender,
            CandidateName: editData?.CandidateName,
            Email: editData?.Email,
            ContactNumber: editData?.ContactNumber,
            DateOfBirth: editData?.DateOfBirth,
            FatherName: editData?.FatherName,
            Address: editData?.Address,
            ProfilePicture: editData?.ProfilePicture,
            AadharCard: editData?.AadharCard,
        })
    }, [editData])

    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement={"end"}
                className="que-canvas"
            >
                <div className="offcanvas-header que-header">
                    <h5 className="offcanvas-title">Edit Candidate</h5>
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
                                value={candidateEdit?.BatchName || ""}
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
                                value={candidateEdit?.Gender || ""}
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
                                value={candidateEdit?.Email || ""}
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
                                value={formatDate(candidateEdit?.DateOfBirth) || ""}
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
                                value={candidateEdit?.Address || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="EnrollmentNumber" className="form-label">
                                Enrollment Number
                            </label>
                            <input
                                type="text"
                                name="EnrollmentNumber"
                                id="EnrollmentNumber"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={candidateEdit?.EnrollmentNumber || ""}
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
                                value={candidateEdit?.CandidateName || ""}
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
                                value={candidateEdit?.ContactNumber || ""}
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
                                value={candidateEdit?.FatherName || ""}
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
                                    onChange={handleChange}
                                />
                                <img
                                    src={getImageUrl(candidateEdit?.ProfilePicture, editData?.ProfilePicture)}
                                    alt="Profile Picture"
                                    className="img-fluid que-img" />
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
                                value={candidateEdit?.AadharCard || ""}
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

export default EditManageCandidate;