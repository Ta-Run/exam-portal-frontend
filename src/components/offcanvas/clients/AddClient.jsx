import React from "react";
import Select from 'react-select';
import Offcanvas from "react-bootstrap/Offcanvas";
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { reqToAddClients } from "../../../reduxToolkit/services/contentManagementServices";
import { manageClientSchema } from "../../../validation/admin/SectorValidation";

const AddClient = ({ sector, show, handleClose, handleGetClients }) => {

    const dispatch = useDispatch();

    // sectorOptions
    const sectorOptions = sector?.map(item => ({
        value: item?._id,
        label: item?.name
    }));

    // Formik
    const formik = useFormik({
        initialValues: {
            clientName: "",
            clientEmail: "",
            password: "",
            companyName: "",
            assginedSectorsId: []
        },
        validationSchema: manageClientSchema,
        onSubmit: async (values, { resetForm }) => {
            const response = await dispatch(reqToAddClients(values));
            if (response?.payload?.res) {
                handleGetClients();
                handleClose();
                resetForm();
            }
        }
    });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched, setFieldValue, setFieldTouched } = formik;

    // handleSelectChange
    const handleSelectChange = (selectedOptions) => {
        setFieldValue('assginedSectorsId', selectedOptions ? selectedOptions.map(option => option.value) : []);
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
                    <h5 className="offcanvas-title">Add Clients</h5>
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
                            <label htmlFor="clientName" className="form-label">
                                Client Name
                            </label>
                            <input
                                type="text"
                                name="clientName"
                                id="clientName"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.clientName}
                            />
                            {
                                errors.clientName && touched.clientName ? <p className='err-msg'>{errors.clientName}</p> : ""
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="clientEmail" className="form-label">
                                Client Email
                            </label>
                            <input
                                type="email"
                                name="clientEmail"
                                id="clientEmail"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.clientEmail}
                            />
                            {
                                errors.clientEmail && touched.clientEmail ? <p className='err-msg'>{errors.clientEmail}</p> : ""
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
                        <div className="mb-4">
                            <label htmlFor="companyName" className="form-label">
                                Company Name
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                id="companyName"
                                className="form-control sector_input"
                                autoComplete="off"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.companyName}
                            />
                            {
                                errors.companyName && touched.companyName ? <p className='err-msg'>{errors.companyName}</p> : ""
                            }
                        </div>
                        <div className="mb-5">
                            <label htmlFor="assginedSectorsId" className="form-label mb-2">
                                Assigned sectors
                            </label>
                            <Select
                                isMulti
                                name="assginedSectorsId"
                                options={sectorOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                onBlur={() => setFieldTouched('assginedSectorsId', true)}
                                value={sectorOptions?.filter(option => values?.assginedSectorsId?.includes(option.value))}
                            />
                            {
                                errors.assginedSectorsId && touched.assginedSectorsId ? <p className='err-msg'>{errors.assginedSectorsId}</p> : ""
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

export default AddClient;
