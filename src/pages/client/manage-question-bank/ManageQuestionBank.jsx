import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ManageQuestionBank.scss";
import { reqToDeleteClientQuestionBank, reqToEditStatusClientQuestionBank, reqToGetClientJobRoleDropDown, reqToGetClientQuestionBank, reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";

import AddQuestionBank from "../../../components/offcanvas/question-bank/AddQuestionBank";
import Header from "../../../components/header/client/Header";
import Loader from "../../../components/loader/Loader";
import EditQuestionBank from "../../../components/offcanvas/question-bank/EditQuestionBank";
import DeleteModal from "../../../components/modal/delete/DeleteModal";
import StatusModal from "../../../components/modal/status/StatusModal";
import Pagination from "../../../components/pagination/Pagination";
import TableComponent from "./TableComponent";
import TopSearchBar from "../../../components/top-search-bar/TopSearchBar";
import DataNoFound from "../../../components/data-no-found/DataNoFound";

const ManageQuestionBank = () => {

    const dispatch = useDispatch();

    // Selectors
    const { clientQuestionBank, clientQuestionBankPagination, sectorDropDown, clientJobRoleDropDown, loader } = useSelector((state) => state.contentManagement);

    // States
    const [modalShow, setModalShow] = useState({
        show: false,
        editShow: false,
        deleteShow: false,
        statusShow: false
    })
    const [id, setId] = useState(null);
    const [editData, setEditData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // handleModalShow
    const handleModalShow = (type, data = null) => {
        setModalShow({ ...modalShow, [type]: true });
        if (type === 'editShow') setEditData(data);
        if (type === 'deleteShow' || type === 'statusShow') setId(data);
    };

    // handleModalClose
    const handleModalClose = () => {
        setModalShow({ show: false, editShow: false, deleteShow: false, statusShow: false });
    };

    // handleGetQuestionBank
    const handleGetQuestionBank = async () => {
        await dispatch(reqToGetClientQuestionBank({ page: currentPage, limit: itemsPerPage }));
    }

    // handleDelete
    const handleDelete = async () => {
        await dispatch(reqToDeleteClientQuestionBank(id));
        handleGetQuestionBank();
        handleModalClose();
    }

    // handleStatusChange
    const handleStatusChange = async () => {
        await dispatch(reqToEditStatusClientQuestionBank(id));
        handleGetQuestionBank();
        handleModalClose();
    }

    // Filter Data
    const filterData = useMemo(() => clientQuestionBank?.filter((item) => {
        return (
            item?.assginedSectorsId?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.assginedSectorsName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.jobRoleId?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.jobRoleName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.type?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.questionBankName?.toLowerCase()?.includes(searchTerm.toLowerCase())
        )
    }), [clientQuestionBank, searchTerm]);

    // Get Question Bank Data
    useEffect(() => {
        handleGetQuestionBank();
    }, [dispatch, currentPage, itemsPerPage])

    // Get Sector & Job Role Dropdown
    useEffect(() => {
        dispatch(reqToGetSectorDropDown());
        dispatch(reqToGetClientJobRoleDropDown());
    }, [])

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {loader && (<Loader />)}
            <Header name="Content Management" />
            <section className="manage-question-section">
                <h2 className="manage-question-title">Manage Question Bank</h2>
                <div className="manage-question-add-main">
                    <button type="button" className="management-add me-3" onClick={() => handleModalShow("show")}>
                        + Add New
                    </button>
                    <hr />
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="sector-selector">
                                <label htmlFor="sectorType" className="form-label mb-2">
                                    Sector
                                </label>
                                <select className="form-select">
                                    <option value="">All</option>
                                    {
                                        sectorDropDown?.map((item) => {
                                            return (
                                                <option value={item?._id} key={item?._id}>{item?.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sector-selector ms-lg-4 ms-0 mt-lg-0 mt-4">
                                <label htmlFor="jobRole" className="form-label mb-2">
                                    Job Role
                                </label>
                                <select className="form-select">
                                    <option value="">All</option>
                                    {
                                        clientJobRoleDropDown?.map((item) => {
                                            return (
                                                <option value={item?._id} key={item?._id}>{item?.jobRoleName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="manage-question-body">
                    <div className="manage-question-filters">
                        <TopSearchBar
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    </div>
                </div>
                <div className="manage-question-table">
                    <div className="table-responsive">
                        <TableComponent
                            filterData={filterData}
                            handleModalShow={handleModalShow}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                        />
                    </div>
                    {filterData?.length === 0 && <DataNoFound />}
                </div>
                {filterData?.length > 0 && (
                    <Pagination
                        pagination={clientQuestionBankPagination}
                        filterData={filterData}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                )}
            </section>
            {/* Add Question Bank */}
            <AddQuestionBank show={modalShow.show} handleClose={handleModalClose} sectorDropDown={sectorDropDown} clientJobRoleDropDown={clientJobRoleDropDown} handleGetQuestionBank={handleGetQuestionBank} />
            {/* Edit Question Bank */}
            <EditQuestionBank show={modalShow.editShow} handleClose={handleModalClose} editData={editData} sectorDropDown={sectorDropDown} clientJobRoleDropDown={clientJobRoleDropDown} handleGetQuestionBank={handleGetQuestionBank} />
            {/* Delete Question Bank */}
            <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
            {/* Status Change */}
            <StatusModal show={modalShow.statusShow} handleClose={handleModalClose} handleStatusChange={handleStatusChange} />

        </>
    );
};

export default ManageQuestionBank;
