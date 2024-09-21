import React, { useEffect, useState } from "react";
import Select from 'react-select';
import Offcanvas from "react-bootstrap/Offcanvas";
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { reqToEditClients } from "../../../reduxToolkit/services/contentManagementServices";
import { manageClientSchema } from "../../../validation/admin/SectorValidation";

const EditClient = ({ sector, editData, show, handleClose, handleGetClients }) => {

    const dispatch = useDispatch();

    // States
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Formik
    const formik = useFormik({
        initialValues: {
            id: "",
            clientName: "",
            clientEmail: "",
            password: "",
            companyName: "",
            assginedSectorsId: []
        },
        validationSchema: manageClientSchema,
        onSubmit: async (values, { resetForm }) => {
            const response = await dispatch(reqToEditClients(values));
            if (response?.payload?.res) {
                handleGetClients();
                handleClose();
                resetForm();
            }
        }
    });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched, setFieldValue, setValues } = formik;

    // handleSelectChange
    const handleSelectChange = (selectedOptions) => {
        const selectedIds = selectedOptions ? selectedOptions?.map(option => option.value) : [];
        setFieldValue('assginedSectorsId', selectedIds);
        setSelectedOptions(selectedOptions);
    };

    // sectorOptions
    const sectorOptions = sector?.map(item => ({
        value: item?._id,
        label: item?.name
    }));

    // Update formik values when editData changes
    useEffect(() => {
        if (editData) {
            setValues({
                id: editData?._id,
                clientName: editData?.clientName,
                clientEmail: editData?.clientEmail,
                password: editData?.password,
                companyName: editData?.companyName,
                assginedSectorsId: editData?.assginedSectorsId || []
            })
        }
    }, [editData, setValues])

    // Update selected options when editData or sector changes
    useEffect(() => {
        if (editData.assginedSectorsId && sector) {
            const selectedSectorOptions = editData?.assginedSectorsId?.map(sectorId => {
                const sectorData = sector?.find(item => item?._id === sectorId);
                return { value: sectorData?._id, label: sectorData?.name };
            });
            setSelectedOptions(selectedSectorOptions);
            setFieldValue('assginedSectorsId', editData.assginedSectorsId);
        }
    }, [editData, sector, setFieldValue]);

    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement={"end"}
                className="sector-canvas"
            >
                <div className="offcanvas-header sector-header">
                    <h5 className="offcanvas-title">Edit Clients</h5>
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
                                value={selectedOptions}
                                onChange={handleSelectChange}
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

export default EditClient;