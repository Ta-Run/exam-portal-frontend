import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { reqToDeleteClientJobRole, reqToEditStatusClientJobRole, reqToGetClientJobRole, reqToGetSectorDropDown } from '../../../reduxToolkit/services/contentManagementServices';

import JobRole from '../../../components/offcanvas/job-role/JobRole';
import Header from '../../../components/header/client/Header';
import Loader from '../../../components/loader/Loader';
import EditJobRole from '../../../components/offcanvas/job-role/EditJobRole';
import { jobRoleHeader } from '../../../constants/header';
import DeleteModal from '../../../components/modal/delete/DeleteModal';
import StatusModal from '../../../components/modal/status/StatusModal';
import TableComponent from './TableComponent';
import Pagination from '../../../components/pagination/Pagination';
import usePagination from '../../../hooks/usePagination';
import useExportPdf from '../../../hooks/useExportPdf';
import useGeneratePdf from '../../../hooks/useGeneratePdf';
import DataNoFound from '../../../components/data-no-found/DataNoFound';
import TopSearchBar from '../../../components/top-search-bar/TopSearchBar';
import FileDownload from '../../../components/file-download/FileDownload';

const ManageJobRole = () => {

    const dispatch = useDispatch();

    // Selectors
    const { clientJobRole, clientJobRolePagination, loader, sectorDropDown } = useSelector((state) => state.contentManagement);

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

    // Custom hooks
    const { currentPage, itemsPerPage, setItemsPerPage, paginate } = usePagination();
    const { exportPdfHandler } = useExportPdf("jobRole");
    const { tablePrintRef, generatePdf } = useGeneratePdf("jobRole");

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

    // handleGetJobRole
    const handleGetJobRole = async () => {
        await dispatch(reqToGetClientJobRole({ page: currentPage, limit: itemsPerPage }));
    }

    // handleDelete
    const handleDelete = async () => {
        await dispatch(reqToDeleteClientJobRole(id));
        handleGetJobRole();
        handleModalClose();
    }

    // handleStatusChange
    const handleStatusChange = async () => {
        await dispatch(reqToEditStatusClientJobRole(id));
        handleGetJobRole();
        handleModalClose();
    }

    // Filter Data
    const filterData = useMemo(() => clientJobRole?.filter((item) => {
        return (
            item?.assginedSectorsName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            item?.jobRoleType?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            item?.jobRoleCode?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            item?.totalMarks?.includes(searchTerm?.toLowerCase()) ||
            item?.version?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            item?.totalTheoryMarks?.includes(searchTerm?.toLowerCase()) ||
            item?.totalPandVMarks?.includes(searchTerm?.toLowerCase()) ||
            item?.passingPercentage?.includes(searchTerm?.toLowerCase()) ||
            item?.clientName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
    }), [clientJobRole, searchTerm]);

    // Get Job Role Data
    useEffect(() => {
        handleGetJobRole();
    }, [dispatch, currentPage, itemsPerPage])

    // Get Sector Dropdown
    useEffect(() => {
        dispatch(reqToGetSectorDropDown());
    }, [])

    return (
        <>
            {loader && (<Loader />)}
            <Header name="Content Management" />
            <section className="content-management-section">
                <h2 className="content-management-title">Manage Job Role</h2>
                <div className="content-management-body">
                    <div className="content-management-filters">
                        <TopSearchBar
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    </div>
                    <FileDownload
                        handleModalShow={handleModalShow}
                        exportPdfHandler={exportPdfHandler}
                        filterData={filterData}
                        generatePdf={generatePdf}
                        headers={jobRoleHeader}
                        fileName="jobRole.csv"
                    />
                </div>
                <div className="content-management-table">
                    <div className="table-responsive" ref={tablePrintRef}>
                        <TableComponent
                            handleModalShow={handleModalShow}
                            filterData={filterData}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                        />
                    </div>
                    {filterData?.length === 0 && <DataNoFound />}
                </div>
                {filterData?.length > 0 && (
                    <Pagination
                        pagination={clientJobRolePagination}
                        filterData={filterData}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                )}
            </section>
            {/* Add Job Role  */}
            <JobRole show={modalShow.show} handleClose={handleModalClose} sectorDropDown={sectorDropDown} handleGetJobRole={handleGetJobRole} />
            {/* Edit Job Role */}
            <EditJobRole show={modalShow.editShow} handleClose={handleModalClose} editData={editData} sectorDropDown={sectorDropDown} handleGetJobRole={handleGetJobRole} />
            {/* Delete Job Role */}
            <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
            {/* Status Change */}
            <StatusModal show={modalShow.statusShow} handleClose={handleModalClose} handleStatusChange={handleStatusChange} />
        </>
    )
}

export default ManageJobRole