import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { reqToEditClientNos } from "../../../reduxToolkit/services/contentManagementServices";

const initialState = {
    assginedSectorsId: "",
    jobRoleId: "",
    nosName: "",
    nosCode: "",
    totalTheoryMarks: "",
    totalVivaMarks: "",
    totalPracticalMarks: "",
}

const EditNos = ({ editData, sectorDropDown, clientJobRoleDropDown, show, handleClose, handleGetNos }) => {

    const dispatch = useDispatch();

    // States
    const [nosEdit, setNosEdit] = useState(initialState);

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;

        setNosEdit((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await dispatch(reqToEditClientNos(nosEdit));

            if (response?.payload?.res) {
                handleGetNos();
                handleClose();
                setNosEdit(initialState);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setNosEdit({
            id: editData?._id,
            assginedSectorsId: editData?.assginedSectorsId,
            jobRoleId: editData?.jobRoleId,
            nosName: editData?.nosName,
            nosCode: editData?.nosCode,
            totalTheoryMarks: editData?.totalTheoryMarks,
            totalVivaMarks: editData?.totalVivaMarks,
            totalPracticalMarks: editData?.totalPracticalMarks,
        })
    }, [editData])

    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement={"end"}
                className="sector-canvas"
            >
                <div className="offcanvas-header sector-header">
                    <h5 className="offcanvas-title">Edit NOS</h5>
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
                            <select className="form-select" name="assginedSectorsId" id="assginedSectorsId" onChange={handleChange} value={nosEdit?.assginedSectorsId || ""} required>
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
                            <label htmlFor="jobRoleId" className="form-label mb-2">
                                Job Role
                            </label>
                            <select
                                className="form-select"
                                name="jobRoleId"
                                id="jobRoleId"
                                onChange={handleChange}
                                value={nosEdit?.jobRoleId || ""}
                                required
                            >
                                <option hidden>Select</option>
                                {
                                    clientJobRoleDropDown?.map((item) => {
                                        return (
                                            <option value={item._id} key={item._id}>{item.jobRoleName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nosName" className="form-label">
                                NOS Name
                            </label>
                            <input
                                type="text"
                                name="nosName"
                                id="nosName"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                value={nosEdit?.nosName || ""}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nosCode" className="form-label">
                                NOS Code
                            </label>
                            <input
                                type="text"
                                name="nosCode"
                                id="nosCode"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                value={nosEdit?.nosCode || ""}
                                required
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
                                value={nosEdit?.totalTheoryMarks || ""}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalVivaMarks" className="form-label">
                                Total Viva Marks
                            </label>
                            <input
                                type="number"
                                name="totalVivaMarks"
                                id="totalVivaMarks"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                value={nosEdit?.totalVivaMarks || ""}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalPracticalMarks" className="form-label">
                                Total Practical Marks
                            </label>
                            <input
                                type="number"
                                name="totalPracticalMarks"
                                id="totalPracticalMarks"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                value={nosEdit?.totalPracticalMarks || ""}
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

export default EditNos;
