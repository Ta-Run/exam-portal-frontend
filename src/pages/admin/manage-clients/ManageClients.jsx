import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clientsHeader } from '../../../constants/header';
import { reqToDeleteClients, reqToEditStatusClients, reqToGetAdminSectorDropDown, reqToGetClients } from '../../../reduxToolkit/services/contentManagementServices';

import Header from '../../../components/header/admin/Header';
import Loader from '../../../components/loader/Loader';
import AddClient from '../../../components/offcanvas/clients/AddClient';
import EditClient from '../../../components/offcanvas/clients/EditClient';
import DeleteModal from '../../../components/modal/delete/DeleteModal';
import StatusModal from '../../../components/modal/status/StatusModal';
import Pagination from '../../../components/pagination/Pagination';
import TableComponent from './TableComponent';
import TopSearchBar from '../../../components/top-search-bar/TopSearchBar';
import FileDownload from '../../../components/file-download/FileDownload';
import DataNoFound from '../../../components/data-no-found/DataNoFound';
import usePagination from '../../../hooks/usePagination';
import useExportPdf from '../../../hooks/useExportPdf';
import useGeneratePdf from '../../../hooks/useGeneratePdf';

const ManageClients = () => {

    const dispatch = useDispatch();

    // Selectors
    const { loader, adminSectorDropDown, client, clientPagination } = useSelector((state) => state.contentManagement);

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
    const { exportPdfHandler } = useExportPdf("clients");
    const { tablePrintRef, generatePdf } = useGeneratePdf("clients");

    // handleModalShow
    const handleModalShow = (type, data = null) => {
        setModalShow({ ...modalShow, [type]: true });
        if (type === 'editShow') setEditData(data);
        if (type === 'deleteShow' || type === 'statusShow') setId(data);
    };

    // handleModalClose
    const handleModalClose = async () => {
        await setModalShow({ show: false, editShow: false, deleteShow: false, statusShow: false });
    };

    // handleGetClients
    const handleGetClients = () => {
        dispatch(reqToGetClients({ page: currentPage, limit: itemsPerPage }));
    }

    // handleDelete
    const handleDelete = async () => {
        await dispatch(reqToDeleteClients(id));
        handleGetClients();
        handleModalClose();
    }

    // handleStatusChange
    const handleStatusChange = async () => {
        await dispatch(reqToEditStatusClients(id));
        handleGetClients();
        handleModalClose();
    }

    // Filter Data
    const filterData = useMemo(() => client?.filter((item) => {
        return (
            item?.clientName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.clientEmail?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.password?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.companyName?.toLowerCase()?.includes(searchTerm.toLowerCase())
        )
    }), [client, searchTerm]);

    // Get Clients Data
    useEffect(() => {
        handleGetClients();
    }, [currentPage, itemsPerPage])

    // Get Sector Dropdown
    useEffect(() => {
        dispatch(reqToGetAdminSectorDropDown());
    }, [])

    return (
        <>
            {loader && (<Loader />)}
            <Header name="Content Management" />
            <section className="content-management-section">
                <h2 className="content-management-title">Manage Clients</h2>
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
                        headers={clientsHeader}
                        fileName="clients.csv"
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
                        pagination={clientPagination}
                        filterData={filterData}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                )}
            </section>
            {/* Add Client */}
            <AddClient show={modalShow.show} handleClose={handleModalClose} sector={adminSectorDropDown} handleGetClients={handleGetClients} />
            {/* Edit Client */}
            <EditClient show={modalShow.editShow} handleClose={handleModalClose} sector={adminSectorDropDown} editData={editData} handleGetClients={handleGetClients} />
            {/* Delete Client */}
            <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
            {/* Status Change */}
            <StatusModal show={modalShow.statusShow} handleClose={handleModalClose} handleStatusChange={handleStatusChange} />
        </>
    )
}

export default ManageClients