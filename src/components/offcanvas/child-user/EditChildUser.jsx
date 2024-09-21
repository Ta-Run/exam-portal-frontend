import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { reqToEditClienChildUser } from "../../../reduxToolkit/services/contentManagementServices";
import Select from 'react-select'
import { useFormValidation } from "../../../hooks/useValidation";

const options = [
    { value: 'ManageJobRole', label: 'Manage Job Role' },
    { value: 'ManageNos', label: 'Manage NOS' },
    { value: 'ManageScheme', label: 'Manage Scheme' },
    { value: 'ManageQuestionBank', label: 'Manage Question Bank' },
    { value: 'ManageAssessor', label: 'Manage Assessor' },
    { value: 'CandidateBulkupload', label: 'Candidate Bulk upload' },
    { value: 'ManageCandidate', label: 'Manage Candidate' },
    { value: 'BatchUpload', label: 'Batch Upload' },
    { value: 'ManageBatch', label: 'Manage Batch' },
    { value: 'ScheduledBatch', label: 'Scheduled Batch' },
    { value: 'CurrentBatch', label: 'Current Batch' },
    { value: 'AssessmentCompleted', label: 'Assessment Completed' },
    { value: 'BatchStatus', label: 'Batch Status' },
    { value: 'CandidateEvidence', label: 'Candidate Evidence' },
    { value: 'BatchEvidenceRecord', label: 'Batch Evidence Record' },
    { value: 'MISReport', label: 'MIS Report' },
    { value: 'BatchResult', label: 'Batch Result' },
    { value: 'BatchReport', label: 'Batch Report' },
    { value: 'AssessorsAnalytics', label: 'Assessors Analytics' },
    { value: 'SectorsAnalytics', label: 'Sectors Analytics' },
    { value: 'QuestionBanksAnalytics', label: 'Question Banks Analytics' },
    { value: 'BatchsAnalytics', label: 'Batchs Analytics' },
    { value: 'JobRolesAnalytics', label: 'JobRoles Analytics' }
]

const initialState = {
    firstName: "",
    lastName: "",
    contactNo: "",
    emailId: "",
    password: "",
    dateofcreation: "",
    selectPageViewPermission: "",
    selectSectorPermission: "",
    address: "",
}

const EditChildUser = ({ editData, sectorDropDown, show, handleClose, handleGetChildUser }) => {

    const dispatch = useDispatch();
    const { error, setError, handleBlur, handleInput } = useFormValidation();

    // States
    const [childUserEdit, setChildUserEdit] = useState(initialState);
    const [selectedOptions, setSelectedOptions] = useState([]);

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;

        setChildUserEdit((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // handleSelectChange
    const handleSelectChange = (selectedOptions) => {
        setChildUserEdit((prev) => ({
            ...prev,
            selectPageViewPermission: selectedOptions ? selectedOptions.map(option => option.value) : []
        }));
        setSelectedOptions(selectedOptions);
    };

    // handleInput
    // const handleInput = (e) => {
    //     const { maxLength, value } = e.target;
    //     if (value.length > maxLength) {
    //         e.target.value = value.slice(0, maxLength);
    //     }
    // }

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitData = {
            ...childUserEdit,
            emailId: childUserEdit.emailId.toLowerCase()
        }

        try {
            if (!error) {
                const response = await dispatch(reqToEditClienChildUser(submitData));

                if (response?.payload?.res) {
                    handleGetChildUser();
                    handleClose();
                    setChildUserEdit(initialState);
                    setError("");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setChildUserEdit({
            id: editData?._id,
            firstName: editData?.firstName,
            lastName: editData?.lastName,
            contactNo: editData?.contactNo,
            emailId: editData?.emailId,
            password: editData?.password,
            dateofcreation: editData?.dateofcreation,
            selectPageViewPermission: editData?.selectPageViewPermission,
            selectSectorPermission: editData?.selectSectorPermissionId,
            address: editData?.address,
        })
    }, [editData])

    useEffect(() => {
        if (editData?.selectPageViewPermission) {
            setSelectedOptions(editData?.selectPageViewPermission?.map(option => ({ value: option, label: option })));
        }
    }, [editData]);

    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement={"end"}
                className="sector-canvas"
            >
                <div className="offcanvas-header sector-header">
                    <h5 className="offcanvas-title">Edit Child User</h5>
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
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                value={childUserEdit?.firstName || ""}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                value={childUserEdit?.lastName || ""}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contactNo" className="form-label">
                                Contact No
                            </label>
                            <input
                                type="number"
                                name="contactNo"
                                id="contactNo"
                                className="form-control sector_input"
                                autoComplete="off"
                                maxLength={10}
                                onInput={handleInput}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={childUserEdit?.contactNo || ""}
                                required
                            />
                            {error && <p className="text-danger err-msg">{error}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="emailId" className="form-label">
                                Email ID
                            </label>
                            <input
                                type="email"
                                name="emailId"
                                id="emailId"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                value={childUserEdit?.emailId || ""}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="text"
                                name="password"
                                id="password"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                value={childUserEdit?.password || ""}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateofcreation" className="form-label">
                                Date Of Creation
                            </label>
                            <input
                                type="date"
                                name="dateofcreation"
                                id="dateofcreation"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                value={childUserEdit?.dateofcreation || ""}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="selectPageViewPermission" className="form-label mb-2">
                                Select Page View Permission
                            </label>
                            <Select
                                isMulti
                                name="selectPageViewPermission"
                                options={options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={selectedOptions}
                                onChange={handleSelectChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="selectSectorPermission" className="form-label mb-2">
                                Select Sector Permission
                            </label>
                            <select className="form-select" name="selectSectorPermission" id="selectSectorPermission" onChange={handleChange} value={childUserEdit.selectSectorPermission} required>
                                <option hidden>Select</option>
                                {
                                    sectorDropDown?.map((item) => {
                                        return (
                                            <option value={item?._id} key={item?._id}>{item?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <textarea
                                type="date"
                                name="address"
                                id="address"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                value={childUserEdit?.address}
                                required
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

export default EditChildUser;