import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import dummy from "../../../images/dummy.png";
import { useDispatch } from "react-redux";
import Select from 'react-select';
import { reqToEditClientAssessor } from "../../../reduxToolkit/services/userManagementServices";
import { IMAGE_URL } from "../../../config";
import { useDisableNextDate } from "../../../hooks/useDisablePrevDate";
import { useFormValidation } from "../../../hooks/useValidation";

const initialState = {
    id: "",
    state: "",
    district: "",
    language: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    mobileNo: "",
    gender: "",
    email: "",
    accessorCode: "",
    permanent_Address: "",
    pinCode: "",
    current_Address: "",
    pincode: "",
    profile_picture: "",
    adharcard: "",
    adhar_img: "",
    adhar_img2: "",
    pancardNo: "",
    pancard_img: "",
    assginedSectorsIds: "",
    select_jobRole: [],
    CertificateExpiryDate: [],
}

const EditAssessor = ({ show, handleClose, sectorDropDown, clientJobRoleDropDown, handleGetAssessor, editData }) => {

    const dispatch = useDispatch();
    const { error, setError, handleBlur, handleInput } = useFormValidation();

    // States
    const [assessorEdit, setAssessorEdit] = useState(initialState);
    const [selectedJobRoles, setSelectedJobRoles] = useState([]);

    const maxDate = useDisableNextDate();

    // formatDate
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

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
            setAssessorEdit((prev) => ({
                ...prev,
                [name]: files[0]
            }))
        } else {
            setAssessorEdit((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    // handleSelectChange
    const handleSelectChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        const selectedLabels = selectedOptions ? selectedOptions.map(option => option.label) : [];

        setAssessorEdit((prev) => ({
            ...prev,
            select_jobRole: selectedValues,
            CertificateExpiryDate: new Array(selectedValues.length).fill("")
        }));

        setSelectedJobRoles(selectedLabels);
    };

    // handleExpiryDateChange
    const handleExpiryDateChange = (index, value) => {
        setAssessorEdit((prev) => {
            const updatedExpiryDates = [...prev.CertificateExpiryDate];
            updatedExpiryDates[index] = value;
            return {
                ...prev,
                CertificateExpiryDate: updatedExpiryDates
            };
        });
    };

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!error) {
                const response = await dispatch(reqToEditClientAssessor(assessorEdit));

                if (response?.payload?.res) {
                    handleGetAssessor();
                    handleClose();
                    setAssessorEdit(initialState);
                    setError("");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // assessorOptions
    const assessorOptions = clientJobRoleDropDown?.map(item => ({
        value: item?._id,
        label: item?.jobRoleName
    }));

    useEffect(() => {
        setAssessorEdit({
            id: editData?._id,
            state: editData?.state || "",
            district: editData?.district || "",
            language: editData?.language || "",
            firstName: editData?.firstName || "",
            lastName: editData?.lastName || "",
            fatherName: editData?.fatherName || "",
            motherName: editData?.motherName || "",
            dateOfBirth: editData?.dateOfBirth || "",
            mobileNo: editData?.mobileNo || "",
            gender: editData?.gender || "",
            email: editData?.email || "",
            accessorCode: editData?.accessorCode || "",
            permanent_Address: editData?.permanent_Address || "",
            pinCode: editData?.pinCode || "",
            current_Address: editData?.current_Address || "",
            pincode: editData?.pincode || "",
            profile_picture: editData?.profile_picture || "",
            adharcard: editData?.adharcard || "",
            adhar_img: editData?.adhar_img || "",
            adhar_img2: editData?.adhar_img2 || "",
            pancardNo: editData?.pancardNo || "",
            pancard_img: editData?.pancard_img || "",
            assginedSectorsIds: editData?.assginedSectorsIds || "",
            select_jobRole: editData?.select_jobRole || [],
            CertificateExpiryDate: editData?.CertificateExpiryDate || [],
        })

        const selectedJobRoleLabels = editData?.select_jobRole?.map(jobRoleId => {
            const jobRole = clientJobRoleDropDown?.find(item => item._id === jobRoleId);
            return jobRole ? jobRole.jobRoleName : '';
        }) || [];

        setSelectedJobRoles(selectedJobRoleLabels);
    }, [editData, clientJobRoleDropDown])

    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement={"end"}
                className="que-canvas"
            >
                <div className="offcanvas-header que-header">
                    <h5 className="offcanvas-title">Edit Assessor</h5>
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
                            <label htmlFor="state" className="form-label mb-2">
                                State
                            </label>
                            <select
                                className="form-select"
                                name="state"
                                id="state"
                                value={assessorEdit?.state || ""}
                                onChange={handleChange}
                                required
                            >
                                <option hidden>Select</option>
                                <option value={"ANDAMAN AND NICOBAR ISLANDS"}>ANDAMAN AND NICOBAR ISLANDS</option>
                                <option value={"ANDHRA PRADESH"}>ANDHRA PRADESH</option>
                                <option value={"ARUNACHAL PRADESH"}>ARUNACHAL PRADESH</option>
                                <option value={"ASSAM"}>ASSAM</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="district" className="form-label mb-2">
                                District
                            </label>
                            <select
                                className="form-select"
                                name="district"
                                id="district"
                                value={assessorEdit?.district || ""}
                                onChange={handleChange}
                                required
                            >
                                <option hidden>Select</option>
                                <option value={"NORTH AND MIDDLE ANDAMAN"}>NORTH AND MIDDLE ANDAMAN</option>
                                <option value={"SOUTH ANDAMANS"}>SOUTH ANDAMANS</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="language" className="form-label mb-2">
                                Language
                            </label>
                            <select
                                className="form-select"
                                name="language"
                                id="language"
                                value={assessorEdit?.language || ""}
                                onChange={handleChange}
                                required
                            >
                                <option hidden>Select</option>
                                <option value={"Hindi"}>Hindi</option>
                                <option value={"English"}>English</option>
                                <option value={"Assamese"}>Assamese</option>
                                <option value={"Bengali"}>Bengali</option>
                                <option value={"Gujarati"}>Gujarati</option>
                                <option value={"Kannada"}>Kannada</option>
                                <option value={"Kashmiri"}>Kashmiri</option>
                                <option value={"Konkani"}>Konkani</option>
                                <option value={"Malayalam"}>Malayalam</option>
                                <option value={"Marathi"}>Marathi</option>
                                <option value={"Nepali"}>Nepali</option>
                                <option value={"Odia"}>Odia</option>
                                <option value={"Punjabi"}>Punjabi</option>
                                <option value={"Sanskrit"}>Sanskrit</option>
                                <option value={"Tamil"}>Tamil</option>
                                <option value={"Telugu"}>Telugu</option>
                                <option value={"Urdu"}>Urdu</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.firstName || ""}
                                onChange={handleChange}
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
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.lastName || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fatherName" className="form-label">
                                Father Name
                            </label>
                            <input
                                type="text"
                                name="fatherName"
                                id="fatherName"
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.fatherName || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="motherName" className="form-label">
                                Mother Name
                            </label>
                            <input
                                type="text"
                                name="motherName"
                                id="motherName"
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.motherName || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateOfBirth" className="form-label">
                                Date Of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="form-control que_input"
                                autoComplete="off"
                                value={formatDate(assessorEdit?.dateOfBirth) || ""}
                                onChange={handleChange}
                                required
                                max={maxDate}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="mobileNo" className="form-label">
                                Mobile Number
                            </label>
                            <input
                                type="number"
                                name="mobileNo"
                                id="mobileNo"
                                className="form-control que_input"
                                maxLength={10}
                                onInput={handleInput}
                                autoComplete="off"
                                value={assessorEdit?.mobileNo || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {error && <p className="text-danger err-msg">{error}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="form-label mb-2">
                                Gender
                            </label>
                            <select
                                className="form-select"
                                name="gender"
                                id="gender"
                                value={assessorEdit?.gender || ""}
                                onChange={handleChange}
                                required
                            >
                                <option hidden>Select</option>
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.email || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="accessorCode" className="form-label">
                                Assessor Code
                            </label>
                            <input
                                type="text"
                                name="accessorCode"
                                id="accessorCode"
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.accessorCode || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="permanent_Address" className="form-label">
                                Permanent Address
                            </label>
                            <input
                                type="text"
                                name="permanent_Address"
                                id="permanent_Address"
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.permanent_Address || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="pinCode" className="form-label">
                                Pin Code
                            </label>
                            <input
                                type="number"
                                name="pinCode"
                                id="pinCode"
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.pinCode || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="current_Address" className="form-label">
                                Current Address
                            </label>
                            <input
                                type="text"
                                name="current_Address"
                                id="current_Address"
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.current_Address || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="pincode" className="form-label">
                                Pin Code
                            </label>
                            <input
                                type="number"
                                name="pincode"
                                id="pincode"
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.pincode || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="profile_picture" className="form-label">Profile Picture</label>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <input
                                    className="form-control que_file_input"
                                    type="file"
                                    name='profile_picture'
                                    id="profile_picture"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                                <a href={getImageUrl(assessorEdit?.profile_picture, editData?.profile_picture)} target="_blank">
                                    <img
                                        src={getImageUrl(assessorEdit?.profile_picture, editData?.profile_picture)}
                                        alt="Profile Picture"
                                        className="img-fluid que-img"
                                        onError={(e) => e.target.src = dummy}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="adharcard" className="form-label">
                                Aadhar Card
                            </label>
                            <input
                                type="number"
                                name="adharcard"
                                id="adharcard"
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.adharcard || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="adhar_img" className="form-label">Front Aadhar Image</label>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <input
                                    className="form-control que_file_input"
                                    type="file"
                                    name='adhar_img'
                                    id="adhar_img"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                                <a href={getImageUrl(assessorEdit?.adhar_img, editData?.adhar_img)} target="_blank">
                                    <img
                                        src={getImageUrl(assessorEdit?.adhar_img, editData?.adhar_img)}
                                        alt="Aadhar Image"
                                        className="img-fluid que-img"
                                        onError={(e) => e.target.src = dummy} />
                                </a>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="adhar_img2" className="form-label">Back Aadhar Image (Optional)</label>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <input
                                    className="form-control que_file_input"
                                    type="file"
                                    name='adhar_img2'
                                    id="adhar_img2"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                                <a href={getImageUrl(assessorEdit?.adhar_img2, editData?.adhar_img2)} target="_blank">
                                    <img
                                        src={getImageUrl(assessorEdit?.adhar_img2, editData?.adhar_img2)}
                                        alt="Aadhar Image"
                                        className="img-fluid que-img"
                                        onError={(e) => e.target.src = dummy}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="pancardNo" className="form-label">
                                Pancard No
                            </label>
                            <input
                                type="string"
                                name="pancardNo"
                                id="pancardNo"
                                className="form-control que_input"
                                autoComplete="off"
                                value={assessorEdit?.pancardNo || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="pancard_img" className="form-label">Pancard Pic</label>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <input
                                    className="form-control que_file_input"
                                    type="file"
                                    id="pancard_img"
                                    name='pancard_img'
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                                <a href={getImageUrl(assessorEdit?.pancard_img, editData?.pancard_img)} target="_blank">
                                    <img
                                        src={getImageUrl(assessorEdit?.pancard_img, editData?.pancard_img)}
                                        alt="Pancard Pic"
                                        className="img-fluid que-img" />
                                </a>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="assginedSectorsIds" className="form-label mb-2">
                                Sector
                            </label>
                            <select
                                className="form-select"
                                name="assginedSectorsIds"
                                id="assginedSectorsIds"
                                value={assessorEdit?.assginedSectorsIds || ""}
                                onChange={handleChange}
                                required
                            >
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
                        <div className="mb-4">
                            <label htmlFor="select_jobRole" className="form-label mb-2">
                                Select Job Role
                            </label>
                            <Select
                                value={assessorOptions?.filter(option =>
                                    assessorEdit?.select_jobRole?.includes(option?.value)
                                )}
                                isMulti
                                name="select_jobRole"
                                options={assessorOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                required
                            />
                        </div>
                        {selectedJobRoles?.map((jobRoleCode, index) => (
                            <div key={index}>
                                <div className="mb-4">
                                    <label htmlFor="adharcard" className="form-label">
                                        Selected Job Role
                                    </label>
                                    <input
                                        type="text"
                                        name="adharcard"
                                        id="adharcard"
                                        className="form-control que_input disabled_field"
                                        autoComplete="off"
                                        value={jobRoleCode || ""}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor={`CertificateExpiryDate-${index}`} className="form-label">
                                        Certificate Expiry Date
                                    </label>
                                    <input
                                        type="date"
                                        name={`CertificateExpiryDate-${index}`}
                                        id={`CertificateExpiryDate-${index}`}
                                        className="form-control que_input"
                                        autoComplete="off"
                                        required
                                        value={assessorEdit?.CertificateExpiryDate[index] || ""}
                                        onChange={(e) => handleExpiryDateChange(index, e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
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

export default EditAssessor;