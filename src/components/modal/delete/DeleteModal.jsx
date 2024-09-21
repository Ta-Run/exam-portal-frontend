import React from 'react';
import "./DeleteModal.scss";
import Modal from "react-bootstrap/Modal";

const DeleteModal = ({ show, handleClose, handleDelete }) => {

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