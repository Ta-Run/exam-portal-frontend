import React from "react";
import "./Sector.scss";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { reqToAddSector } from "../../../reduxToolkit/services/contentManagementServices";
import { manageSectorSchema } from "../../../validation/admin/SectorValidation";

const Sector = ({ show, handleClose, handleGetSector }) => {

    const dispatch = useDispatch();

    // Formik
    const formik = useFormik({
        initialValues: {
            name: '',
            type: '',
            logo: ''
        },
        validationSchema: manageSectorSchema,
        onSubmit: async (values, { resetForm }) => {
            const response = await dispatch(reqToAddSector(values));
            if (response?.payload?.res) {
                handleGetSector();
                handleClose();
                resetForm();
            }
        }
    });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched, setFieldValue } = formik;

    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement={"end"}
                className="sector-canvas"
            >
                <div className="offcanvas-header sector-header">
                    <h5 className="offcanvas-title">Add Sector</h5>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="close-btn"
                    >
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </div>
                <div className="offcanvas-body sector-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">
                                Sector Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.name}
                            />
                            {
                                errors.name && touched.name ? <p className='err-msg'>{errors.name}</p> : ""
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type" className="form-label mb-2">
                                Sector type
                            </label>
                            <select
                                className="form-select"
                                name="type"
                                id="type"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.type}
                            >
                                <option value="">Select</option>
                                <option value="Government">Government</option>
                                <option value="Private">Private</option>
                            </select>
                            {
                                errors.type && touched.type ? <p className='err-msg'>{errors.type}</p> : ""
                            }
                        </div>
                        <div className="mb-5">
                            <label htmlFor="logo" className="form-label">
                                Sector logo
                            </label>
                            <input
                                className="form-control sector_file_input"
                                type="file"
                                name="logo"
                                id="logo"
                                onChange={(e) => {
                                    setFieldValue('logo', e.currentTarget.files[0]);
                                }}
                                onBlur={handleBlur}
                                accept="image/png, image/jpeg"
                            />
                            {
                                errors.logo && touched.logo ? <p className='err-msg'>{errors.logo}</p> : ""
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

export default Sector;
