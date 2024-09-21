import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./ContentManagement.scss";
import { reqToDeleteSector, reqToEditStatusSector, reqToGetSector } from '../../../reduxToolkit/services/contentManagementServices';

import Header from '../../../components/header/admin/Header';
import Loader from './../../../components/loader/Loader';
import EditSector from '../../../components/offcanvas/sector/EditSector';
import DeleteModal from '../../../components/modal/delete/DeleteModal';
import StatusModal from '../../../components/modal/status/StatusModal';
import Sector from '../../../components/offcanvas/sector/Sector';
import Pagination from '../../../components/pagination/Pagination';
import TableComponent from './TableComponent';
import usePagination from '../../../hooks/usePagination';
import useExportPdf from '../../../hooks/useExportPdf';
import useGeneratePdf from '../../../hooks/useGeneratePdf';
import TopSearchBar from '../../../components/top-search-bar/TopSearchBar';
import FileDownload from '../../../components/file-download/FileDownload';
import DataNoFound from './../../../components/data-no-found/DataNoFound';
import { sectorHeader } from '../../../constants/header';

const ContentManagement = () => {

    const dispatch = useDispatch();

    // Selectors
    const { loader, sector, sectorPagination } = useSelector((state) => state.contentManagement);

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
    const { exportPdfHandler } = useExportPdf("sector");
    const { tablePrintRef, generatePdf } = useGeneratePdf("sector");

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
        await dispatch(reqToGetSector({ page: currentPage, limit: itemsPerPage }));
    }

    // handleDelete
    const handleDelete = async () => {
        await dispatch(reqToDeleteSector(id));
        handleGetSector();
        handleModalClose();
    }

    // handleStatusChange
    const handleStatusChange = async () => {
        await dispatch(reqToEditStatusSector(id));
        handleGetSector();
        handleModalClose();
    }

    // Filter Data
    const filterData = useMemo(() => sector?.filter((item) => {
        return (
            item?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.type?.toLowerCase()?.includes(searchTerm.toLowerCase())
        )
    }), [sector, searchTerm]);

    // Get Sector Data
    useEffect(() => {
        handleGetSector();
    }, [currentPage, itemsPerPage])

    return (
        <>
            {loader && (<Loader />)}
            <Header name="Content Management" />
            <section className="content-management-section">
                <h2 className="content-management-title">Manage Sector</h2>
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
                        headers={sectorHeader}
                        fileName="sector.csv"
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
                        pagination={sectorPagination}
                        filterData={filterData}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                )}
            </section>
            {/* Add Sector */}
            <Sector show={modalShow.show} handleClose={handleModalClose} handleGetSector={handleGetSector} />
            {/* Edit Sector */}
            <EditSector show={modalShow.editShow} handleClose={handleModalClose} editData={editData} handleGetSector={handleGetSector} />
            {/* Delete Sector */}
            <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
            {/* Status Change */}
            <StatusModal show={modalShow.statusShow} handleClose={handleModalClose} handleStatusChange={handleStatusChange} />
        </>
    )
}

export default ContentManagement