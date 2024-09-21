import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import "./BulkUpload.scss";
import { useDispatch } from 'react-redux';
import { reqToUploadClientCandidate } from '../../../../reduxToolkit/services/userManagementServices';

const BulkUpload = ({ show, handleClose, handleGetCandidate }) => {

    const dispatch = useDispatch();

    const [bulkUploadData, setBulkUploadData] = useState({
        bulkUpload: ""
    });

    // handleBatchUpload
    const handleBatchUpload = (e) => {
        const file = e.target.files[0];
        setBulkUploadData({
            bulkUpload: file
        })
    }

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(reqToUploadClientCandidate(bulkUploadData));

            if (response?.payload?.status) {
                handleGetCandidate();
                handleClose();
                setBulkUploadData({
                    bulkUpload: ""
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal centered show={show} onHide={handleClose} className="upload-modal">
            <div className="modal-header">
                <h5 className="modal-title">Batch Upload</h5>
                <button
                    type="button"
                    onClick={handleClose}
                    className="close-btn"
                    aria-label="Close"
                >
                    <i className="fa-regular fa-circle-xmark"></i>
                </button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="bulkUpload" className="form-label mb-2">
                        Excel Upload
                    </label>
                    <input
                        className="form-control batch_upload_file_input"
                        type="file"
                        name='bulkUpload'
                        id='bulkUpload'
                        onChange={handleBatchUpload}
                        required
                        accept=".xls,.xlsx,.csv"
                    />
                    <button type="submit" className="submit-btn">
                        Upload
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default BulkUpload