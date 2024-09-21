import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { reqToAddClientSector } from "../../../reduxToolkit/services/contentManagementServices";
import { useFormValidation } from "../../../hooks/useValidation";
import Select from 'react-select';

const initialState = {
    spocPersonName: "",
    contactNo: "",
    emailId: "",
    password: "",
    assginedSectorsIds: ""
}

const AddEmailTemplates = ({ sectorDropDown, show, handleClose, handleGetSector }) => {

    const dispatch = useDispatch();
    const { error, setError, handleBlur, handleInput } = useFormValidation();

    // States
    const [spocPerson, setspocPerson] = useState(initialState);

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setspocPerson((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // sectorOptions
    const sectorOptions = sectorDropDown?.map(item => ({
        value: item?._id,
        label: item?.name
    }));

    // handleSelectChange
    const handleSelectChange = (selectedOptions) => {
        setspocPerson((prev) => ({
            ...prev,
            assginedSectorsIds: selectedOptions ? selectedOptions?.map(option => option.value) : []
        }));
    };

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitData = {
            ...spocPerson,
            emailId: spocPerson.emailId.toLowerCase()
        }

        try {
            if (!error) {
                const response = await dispatch(reqToAddClientSector(submitData));
                if (response?.payload?.res) {
                    handleGetSector();
                    handleClose();
                    setspocPerson(initialState);
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
                className="ticket-canvas"
            >
                <div className="offcanvas-header ticket-header">
                    <h5 className="offcanvas-title">Add Email Templates</h5>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="close-btn"
                        aria-label="Close"
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </div>
                <div className="offcanvas-body ticket-body">
                    <form action="#">
                        <label htmlFor="category" className="form-label mb-2">
                            Name
                        </label>
                        <select className="form-select">
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <button type="submit" className="submit-btn">
                            Save
                        </button>
                    </form>
                </div>
            </Offcanvas>
        </>
    );
};

export default AddEmailTemplates;
