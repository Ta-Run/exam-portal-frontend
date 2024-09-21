import React from 'react';
import Modal from "react-bootstrap/Modal";
import { useDispatch } from 'react-redux';
import { reqToEditStatusClientSector, reqToGetClientSector } from '../../../../reduxToolkit/services/contentManagementServices';

const StatusModal = ({ id, show, handleClose }) => {

    const dispatch = useDispatch();

    const handleStatusChange = async () => {
        await dispatch(reqToEditStatusClientSector(id));
        await dispatch(reqToGetClientSector({ page: 1, limit: 10 }));
        handleClose();
    }

    return (
        <Modal centered show={show} onHide={handleClose} className="delete-modal status">
            <div className="modal-body text-center">
                <div className="icon">
                    <i className="fa-regular fa-circle-question"></i>
                </div>
                <div className="text">
                    <h3>Are you sure ?</h3>
                    <p>You want to change status</p>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="close-btn" onClick={handleClose} >No</button>
                <button type="button" className="delete-btn" onClick={handleStatusChange}>Yes</button>
            </div>
        </Modal>
    )
}

export default StatusModal