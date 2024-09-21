import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { reqToEditClientScheme } from "../../../reduxToolkit/services/contentManagementServices";

const initialState = {
    assginedSectorsId: "",
    schemeName: "",
}

const EditScheme = ({ editData, sectorDropDown, show, handleClose, handleGetScheme }) => {

    const dispatch = useDispatch();

    // States
    const [schemeEdit, setSchemeEdit] = useState(initialState);

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;

        setSchemeEdit((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await dispatch(reqToEditClientScheme(schemeEdit));

            if (response?.payload?.res) {
                handleGetScheme();
                handleClose();
                setSchemeEdit(initialState);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setSchemeEdit({
            id: editData?._id,
            assginedSectorsId: editData?.assginedSectorsId,
            schemeName: editData?.schemeName,
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
                    <h5 className="offcanvas-title">Edit Scheme</h5>
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
                            <select className="form-select" name="assginedSectorsId" id="assginedSectorsId" onChange={handleChange} value={schemeEdit?.assginedSectorsId || ""} required>
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
                            <label htmlFor="schemeName" className="form-label">
                                Scheme Name
                            </label>
                            <input
                                type="text"
                                name="schemeName"
                                id="schemeName"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                value={schemeEdit?.schemeName || ""}
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

export default EditScheme;