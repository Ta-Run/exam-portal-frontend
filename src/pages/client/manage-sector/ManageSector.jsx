import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { reqToDeleteClientSector, reqToEditStatusClientSector, reqToGetClientSector, reqToGetSectorDropDown } from '../../../reduxToolkit/services/contentManagementServices';
import { spocPersonHeader } from '../../../constants/header';

import SpocPerson from '../../../components/offcanvas/spoc-person/SpocPerson';
import Header from '../../../components/header/client/Header';
import Loader from '../../../components/loader/Loader';
import EditSpocPerson from '../../../components/offcanvas/spoc-person/EditSpocPerson';
import DeleteModal from '../../../components/modal/delete/DeleteModal';
import StatusModal from '../../../components/modal/status/StatusModal';
import Pagination from '../../../components/pagination/Pagination';
import TableComponent from './TableComponent';
import usePagination from '../../../hooks/usePagination';
import useExportPdf from '../../../hooks/useExportPdf';
import useGeneratePdf from '../../../hooks/useGeneratePdf';
import TopSearchBar from '../../../components/top-search-bar/TopSearchBar';
import FileDownload from '../../../components/file-download/FileDownload';
import DataNoFound from '../../../components/data-no-found/DataNoFound';

const ManageSector = () => {

    const dispatch = useDispatch();

    // Selectors
    const { spocClient, spocClientPagination, sectorDropDown, loader } = useSelector((state) => state.contentManagement);

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
    const { exportPdfHandler } = useExportPdf("spoc-person");
    const { tablePrintRef, generatePdf } = useGeneratePdf("spoc-person");

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

    // handleGetSector
    const handleGetSector = async () => {
        await dispatch(reqToGetClientSector({ page: currentPage, limit: itemsPerPage }));
    }

    // handleDelete
    const handleDelete = async () => {
        await dispatch(reqToDeleteClientSector(id));
        handleGetSector();
        handleModalClose();
    }

    // handleStatusChange
    const handleStatusChange = async () => {
        await dispatch(reqToEditStatusClientSector(id));
        handleGetSector();
        handleModalClose();
    }

    // Filter Data
    const filterData = useMemo(() => spocClient?.filter((item) => {
        return (
            item?.spocPersonName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            item?.contactNo?.includes(searchTerm) ||
            item?.emailId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            item?.password?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            item?.clientName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
    }), [spocClient, searchTerm]);

    // Get Sector Data
    useEffect(() => {
        handleGetSector();
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
                <h2 className="content-management-title">Manage SPOC Person</h2>
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
                        headers={spocPersonHeader}
                        fileName="spoc-person.csv"
                    />
                </div>
                <div className="content-management-table">
                    <div className="table-responsive" ref={tablePrintRef}>
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
                        pagination={spocClientPagination}
                        filterData={filterData}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                )}
            </section>
            {/* Add SPOC Person */}
            <SpocPerson show={modalShow.show} handleClose={handleModalClose} sectorDropDown={sectorDropDown} handleGetSector={handleGetSector} />
            {/* Edit SPOC Person */}
            <EditSpocPerson show={modalShow.editShow} handleClose={handleModalClose} sectorDropDown={sectorDropDown} editData={editData} handleGetSector={handleGetSector} />
            {/* Delete SPOC Person */}
            <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
            {/* Status Change */}
            <StatusModal show={modalShow.statusShow} handleClose={handleModalClose} handleStatusChange={handleStatusChange} />
        </>
    )
}

export default ManageSector