import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Select from 'react-select';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { reqToAddClientSector } from "../../../reduxToolkit/services/contentManagementServices";
import { clientManageSpocSchema } from "../../../validation/admin/SectorValidation";
import { useFormValidation } from "../../../hooks/useValidation";

const SpocPerson = ({ sectorDropDown, show, handleClose, handleGetSector }) => {

    const dispatch = useDispatch();
    const { handleInput } = useFormValidation();

    // sectorOptions
    const sectorOptions = sectorDropDown?.map(item => ({
        value: item?._id,
        label: item?.name
    }));

    // Formik
    const formik = useFormik({
        initialValues: {
            spocPersonName: "",
            contactNo: "",
            emailId: "",
            password: "",
            assginedSectorsIds: []
        },
        validationSchema: clientManageSpocSchema,
        onSubmit: async (values, { resetForm }) => {
            const response = await dispatch(reqToAddClientSector(values));
            if (response?.payload?.res) {
                handleGetSector();
                handleClose();
                resetForm();
            }
        }
    });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched, setFieldValue, setFieldTouched } = formik;

    // handleSelectChange
    const handleSelectChange = (selectedOptions) => {
        setFieldValue('assginedSectorsIds', selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement={"end"}
                className="sector-canvas"
            >
                <div className="offcanvas-header sector-header">
                    <h5 className="offcanvas-title">Add SPOC Person</h5>
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
                            <label htmlFor="spocPersonName" className="form-label">
                                Spoc Person Name
                            </label>
                            <input
                                type="text"
                                name="spocPersonName"
                                id="spocPersonName"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.spocPersonName}
                            />
                            {
                                errors.spocPersonName && touched.spocPersonName ? <p className='err-msg'>{errors.spocPersonName}</p> : ""
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contactNo" className="form-label">
                                Contact Number
                            </label>
                            <input
                                type="number"
                                name="contactNo"
                                id="contactNo"
                                className="form-control sector_input"
                                maxLength={10}
                                autoComplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onInput={handleInput}
                                value={values?.contactNo}
                            />
                            {
                                errors.contactNo && touched.contactNo ? <p className='err-msg'>{errors.contactNo}</p> : ""
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="emailId" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                name="emailId"
                                id="emailId"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.emailId}
                            />
                            {
                                errors.emailId && touched.emailId ? <p className='err-msg'>{errors.emailId}</p> : ""
                            }
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
                                onBlur={handleBlur}
                                value={values?.password}
                            />
                            {
                                errors.password && touched.password ? <p className='err-msg'>{errors.password}</p> : ""
                            }
                        </div>
                        <div className="mb-5">
                            <label htmlFor="assginedSectorsIds" className="form-label mb-2">
                                Assigned sectors
                            </label>
                            <Select
                                isMulti
                                name="assginedSectorsIds"
                                options={sectorOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                onBlur={() => setFieldTouched('assginedSectorsIds', true)}
                                value={sectorOptions?.filter(option => values?.assginedSectorsIds?.includes(option.value))}
                            />
                            {
                                errors.assginedSectorsIds && touched.assginedSectorsIds ? <p className='err-msg'>{errors.assginedSectorsIds}</p> : ""
                            }
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

export default SpocPerson;
