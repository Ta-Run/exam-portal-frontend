import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { reqToAddClientJobRole } from "../../../reduxToolkit/services/contentManagementServices";

const initialState = {
    assginedSectorsId: "",
    jobRoleType: "",
    jobRoleName: "",
    jobRoleCode: "",
    totalMarks: "",
    version: "",
    totalTheoryMarks: "",
    totalPandVMarks: "",
    passingPercentage: "",
}

const JobRole = ({ show, handleClose, sectorDropDown, handleGetJobRole }) => {

    const dispatch = useDispatch();

    // States
    const [jobRole, setJobRole] = useState(initialState);

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;

        setJobRole((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await dispatch(reqToAddClientJobRole(jobRole));

            if (response?.payload?.res) {
                handleGetJobRole();
                handleClose();
                setJobRole(initialState);
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
                    <h5 className="offcanvas-title">Add Job Role</h5>
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
                            <select className="form-select" name="assginedSectorsId" id="assginedSectorsId" onChange={handleChange} required value={jobRole?.assginedSectorsId}>
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
                            <label htmlFor="jobRoleType" className="form-label mb-2">
                                Job Role Type *
                            </label>
                            <select className="form-select" name="jobRoleType" id="jobRoleType" onChange={handleChange} required value={jobRole.jobRoleType}>
                                <option value="">Select</option>
                                <option value={"Manufacturing"}>Manufacturing</option>
                                <option value={"Services"}>Services</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="jobRoleName" className="form-label">
                                Job Role Name
                            </label>
                            <input
                                type="text"
                                name="jobRoleName"
                                id="jobRoleName"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                required
                                value={jobRole.jobRoleName}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="jobRoleCode" className="form-label">
                                Job Role Code
                            </label>
                            <input
                                type="text"
                                name="jobRoleCode"
                                id="jobRoleCode"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                required
                                value={jobRole.jobRoleCode}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalMarks" className="form-label">
                                Total Marks
                            </label>
                            <input
                                type="number"
                                name="totalMarks"
                                id="totalMarks"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                required
                                value={jobRole.totalMarks}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="version" className="form-label">
                                Version
                            </label>
                            <input
                                type="number"
                                name="version"
                                id="version"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                required
                                value={jobRole.version}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalTheoryMarks" className="form-label">
                                Total Theory Marks
                            </label>
                            <input
                                type="number"
                                name="totalTheoryMarks"
                                id="totalTheoryMarks"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                required
                                value={jobRole.totalTheoryMarks}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalPandVMarks" className="form-label">
                                Total P & V Marks
                            </label>
                            <input
                                type="number"
                                name="totalPandVMarks"
                                id="totalPandVMarks"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                required
                                value={jobRole.totalPandVMarks}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="passingPercentage" className="form-label">
                                Passing Percentage
                            </label>
                            <input
                                type="number"
                                name="passingPercentage"
                                id="passingPercentage"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                required
                                value={jobRole.passingPercentage}
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

export default JobRole;
