import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { reqToAddClientManageBatch } from "../../../reduxToolkit/services/assessmentServices";
import { useDisablePrevDate } from "../../../hooks/useDisablePrevDate";

const initialState = {
    state: "",
    district: "",
    assginedSectorsId: "",
    jobRoleId: "",
    TrainingPartnerName: "",
    TrainingCenterName: "",
    TrainingPartnerEmail: "",
    TrainingCenterEmail: "",
    StartDate: "",
    StartTime: "",
    EndDate: "",
    EndTime: "",
    BatchCode: "",
    TotalCandidate: "",
    photo: "true",
    video: "true",
    PhotoCaptureMinute: "",
    videoCaptureMinute: ""
}

const AddManageBatch = ({ show, handleClose, sectorDropDown, clientJobRoleDropDown, handleGetManageBatch }) => {

    const dispatch = useDispatch();
    const minDate = useDisablePrevDate();

    // States
    const [manageBatch, setManageBatch] = useState(initialState);

    // handleChange
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setManageBatch((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? "true" : "false") : value
        }))
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await dispatch(reqToAddClientManageBatch(manageBatch));

            if (response?.payload?.res) {
                handleGetManageBatch();
                handleClose();
                setManageBatch(initialState);
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
                    <h5 className="offcanvas-title">Add Batch</h5>
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
                                required
                                value={manageBatch?.state || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
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
                                required
                                value={manageBatch?.district || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value={"NORTH AND MIDDLE ANDAMAN"}>NORTH AND MIDDLE ANDAMAN</option>
                                <option value={"SOUTH ANDAMANS"}>SOUTH ANDAMANS</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="assginedSectorsId" className="form-label mb-2">
                                Sector
                            </label>
                            <select
                                className="form-select"
                                name="assginedSectorsId"
                                id="assginedSectorsId"
                                required
                                value={manageBatch?.assginedSectorsId || ""}
                                onChange={handleChange}
                            >
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
                            <select
                                className="form-select"
                                name="jobRoleId"
                                id="jobRoleId"
                                required
                                value={manageBatch?.jobRoleId || ""}
                                onChange={handleChange}
                            >
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
                            <label htmlFor="TrainingPartnerName" className="form-label">
                                Training Partner Name
                            </label>
                            <input
                                type="text"
                                name="TrainingPartnerName"
                                id="TrainingPartnerName"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={manageBatch?.TrainingPartnerName || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="TrainingCenterName" className="form-label">
                                Training Center Name
                            </label>
                            <input
                                type="text"
                                name="TrainingCenterName"
                                id="TrainingCenterName"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={manageBatch?.TrainingCenterName || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="TrainingPartnerEmail" className="form-label">
                                Training Partner Email
                            </label>
                            <input
                                type="email"
                                name="TrainingPartnerEmail"
                                id="TrainingPartnerEmail"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={manageBatch?.TrainingPartnerEmail || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="TrainingCenterEmail" className="form-label">
                                Training Center Email
                            </label>
                            <input
                                type="email"
                                name="TrainingCenterEmail"
                                id="TrainingCenterEmail"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={manageBatch?.TrainingCenterEmail || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="StartDate" className="form-label">
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="StartDate"
                                id="StartDate"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={manageBatch?.StartDate || ""}
                                onChange={handleChange}
                                min={minDate}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="StartTime" className="form-label">
                                Start Time
                            </label>
                            <input
                                type="time"
                                name="StartTime"
                                id="StartTime"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={manageBatch?.StartTime || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="EndDate" className="form-label">
                                End Date*
                            </label>
                            <input
                                type="date"
                                name="EndDate"
                                id="EndDate"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={manageBatch?.EndDate || ""}
                                onChange={handleChange}
                                min={minDate}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="EndTime" className="form-label">
                                End Time*
                            </label>
                            <input
                                type="time"
                                name="EndTime"
                                id="EndTime"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={manageBatch?.EndTime || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="BatchCode" className="form-label">
                                Batch Code
                            </label>
                            <input
                                type="text"
                                name="BatchCode"
                                id="BatchCode"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={manageBatch?.BatchCode || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="TotalCandidate" className="form-label">
                                Total Candidate
                            </label>
                            <input
                                type="number"
                                name="TotalCandidate"
                                id="TotalCandidate"
                                className="form-control que_input"
                                autoComplete="off"
                                required
                                value={manageBatch?.TotalCandidate || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="photo" className="form-label">
                                Photo
                            </label>
                            <div className="checkbox-wrapper-8">
                                <input
                                    className="tgl tgl-skewed"
                                    id="photo"
                                    name="photo"
                                    type="checkbox"
                                    value={manageBatch?.photo || ""}
                                    onChange={handleChange}
                                    checked={manageBatch?.photo === "true"}
                                />
                                <label className="tgl-btn" data-tg-off="OFF" data-tg-on="ON" htmlFor="photo" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="video" className="form-label">
                                Video
                            </label>
                            <div className="checkbox-wrapper-8">
                                <input
                                    className="tgl tgl-skewed"
                                    id="video"
                                    name="video"
                                    type="checkbox"
                                    value={manageBatch?.video || ""}
                                    onChange={handleChange}
                                    checked={manageBatch?.video === "true"}
                                />
                                <label className="tgl-btn" data-tg-off="OFF" data-tg-on="ON" htmlFor="video" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="PhotoCaptureMinute" className="form-label mb-2">
                                Select Random Photo Capture Minute
                            </label>
                            <select
                                className="form-select"
                                name="PhotoCaptureMinute"
                                id="PhotoCaptureMinute"
                                required
                                value={manageBatch?.PhotoCaptureMinute || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value={"1"}>1 Minute</option>
                                <option value={"2"}>2 Minute</option>
                                <option value={"3"}>3 Minute</option>
                                <option value={"4"}>4 Minute</option>
                                <option value={"5"}>5 Minute</option>
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="videoCaptureMinute" className="form-label mb-2">
                                Select Random Video Capture Minute
                            </label>
                            <select
                                className="form-select"
                                name="videoCaptureMinute"
                                id="videoCaptureMinute"
                                required
                                value={manageBatch?.videoCaptureMinute || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value={"1"}>1 Minute</option>
                                <option value={"2"}>2 Minute</option>
                                <option value={"3"}>3 Minute</option>
                                <option value={"4"}>4 Minute</option>
                                <option value={"5"}>5 Minute</option>
                            </select>
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

export default AddManageBatch;