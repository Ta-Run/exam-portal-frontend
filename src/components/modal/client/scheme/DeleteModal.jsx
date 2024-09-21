import React from 'react';
import Modal from "react-bootstrap/Modal";
import { useDispatch } from 'react-redux';
import { reqToDeleteClientScheme, reqToGetClientScheme } from '../../../../reduxToolkit/services/contentManagementServices';

const DeleteModal = ({ id, show, handleClose }) => {

    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(reqToDeleteClientScheme(id));
        await dispatch(reqToGetClientScheme({ page: 1, limit: 10 }));
        handleClose();
    }

    return (
        <Modal centered show={show} onHide={handleClose} className="delete-modal">
            <div className="modal-body text-center">
                <div className="icon">
                    <i className="fa-solid fa-circle-xmark"></i>
                </div>
                <div className="text">
                    <h3>Are you sure ?</h3>
                    <p>Do you really want to delete these records ?</p>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="close-btn" onClick={handleClose} >Close</button>
                <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </Modal>
    )
}

export default DeleteModal