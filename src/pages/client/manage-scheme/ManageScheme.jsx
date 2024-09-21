import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { reqToDeleteClientScheme, reqToEditStatusClientScheme, reqToGetClientScheme, reqToGetSectorDropDown } from '../../../reduxToolkit/services/contentManagementServices';
import { schemeHeader } from '../../../constants/header';

import AddScheme from '../../../components/offcanvas/scheme/AddScheme';
import Header from '../../../components/header/client/Header';
import Loader from '../../../components/loader/Loader';
import EditScheme from '../../../components/offcanvas/scheme/EditScheme';
import Pagination from '../../../components/pagination/Pagination';
import DeleteModal from '../../../components/modal/delete/DeleteModal';
import StatusModal from '../../../components/modal/status/StatusModal';
import TableComponent from './TableComponent';
import usePagination from '../../../hooks/usePagination';
import useExportPdf from '../../../hooks/useExportPdf';
import useGeneratePdf from '../../../hooks/useGeneratePdf';
import TopSearchBar from '../../../components/top-search-bar/TopSearchBar';
import FileDownload from '../../../components/file-download/FileDownload';
import DataNoFound from '../../../components/data-no-found/DataNoFound';

const ManageScheme = () => {

    const dispatch = useDispatch();

    // Selectors
    const { loader, clientScheme, clientSchemePagination, sectorDropDown } = useSelector((state) => state.contentManagement);

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
    const { exportPdfHandler } = useExportPdf("scheme");
    const { tablePrintRef, generatePdf } = useGeneratePdf("scheme");

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

    // handleGetScheme
    const handleGetScheme = async () => {
        await dispatch(reqToGetClientScheme({ page: currentPage, limit: itemsPerPage }));
    }

    // handleDelete
    const handleDelete = async () => {
        await dispatch(reqToDeleteClientScheme(id));
        handleGetScheme();
        handleModalClose();
    }

    // handleStatusChange
    const handleStatusChange = async () => {
        await dispatch(reqToEditStatusClientScheme(id));
        handleGetScheme();
        handleModalClose();
    }

    // Filter Data
    const filterData = useMemo(() => clientScheme?.filter((item) => {
        return (
            item?.assginedSectorsId?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.assginedSectorsName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.schemeName?.toLowerCase()?.includes(searchTerm.toLowerCase())
        )
    }), [clientScheme, searchTerm]);

    // Get Scheme Data
    useEffect(() => {
        handleGetScheme();
    }, [currentPage, itemsPerPage])

    // Get Sector Dropdown
    useEffect(() => {
        dispatch(reqToGetSectorDropDown());
    }, [])

    return (
        <>
            {loader && (<Loader />)}
            <Header name="Content Management" />
            <section className="content-management-section">
                <h2 className="content-management-title">Manage Scheme</h2>
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
                        headers={schemeHeader}
                        fileName="scheme.csv"
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
                        pagination={clientSchemePagination}
                        filterData={filterData}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                )}
            </section>
            {/* Add Scheme */}
            <AddScheme show={modalShow.show} handleClose={handleModalClose} sectorDropDown={sectorDropDown} handleGetScheme={handleGetScheme} />
            {/* Edit Scheme */}
            <EditScheme show={modalShow.editShow} handleClose={handleModalClose} editData={editData} sectorDropDown={sectorDropDown} handleGetScheme={handleGetScheme} />
            {/* Delete Scheme */}
            <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
            {/* Status Change */}
            <StatusModal show={modalShow.statusShow} handleClose={handleModalClose} handleStatusChange={handleStatusChange} />
        </>
    )
}

export default ManageScheme