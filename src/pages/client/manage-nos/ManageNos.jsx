import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { reqToDeleteClientNos, reqToGetClientJobRoleDropDown, reqToGetClientNos, reqToGetSectorDropDown } from '../../../reduxToolkit/services/contentManagementServices';
import { nosHeader } from '../../../constants/header';

import AddNos from '../../../components/offcanvas/nos/AddNos';
import Header from '../../../components/header/client/Header';
import Loader from '../../../components/loader/Loader';
import EditNos from '../../../components/offcanvas/nos/EditNos';
import DeleteModal from '../../../components/modal/delete/DeleteModal';
import Pagination from '../../../components/pagination/Pagination';
import TableComponent from './TableComponent';
import usePagination from '../../../hooks/usePagination';
import useExportPdf from '../../../hooks/useExportPdf';
import useGeneratePdf from '../../../hooks/useGeneratePdf';
import TopSearchBar from '../../../components/top-search-bar/TopSearchBar';
import FileDownload from '../../../components/file-download/FileDownload';
import DataNoFound from '../../../components/data-no-found/DataNoFound';

const ManageNos = () => {

    const dispatch = useDispatch();

    // Selectors
    const { clientNos, clientNosPagination, sectorDropDown, clientJobRoleDropDown, loader } = useSelector((state) => state.contentManagement);

    // States
    const [modalShow, setModalShow] = useState({
        show: false,
        editShow: false,
        deleteShow: false,
    })
    const [id, setId] = useState(null);
    const [editData, setEditData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    // Custom hooks
    const { currentPage, itemsPerPage, setItemsPerPage, paginate } = usePagination();
    const { exportPdfHandler } = useExportPdf("nos");
    const { tablePrintRef, generatePdf } = useGeneratePdf("nos");

    // handleModalShow
    const handleModalShow = (type, data = null) => {
        setModalShow({ ...modalShow, [type]: true });
        if (type === 'editShow') setEditData(data);
        if (type === 'deleteShow') setId(data);
    };

    // handleModalClose
    const handleModalClose = () => {
        setModalShow({ show: false, editShow: false, deleteShow: false });
    };

    // handleGetNos
    const handleGetNos = async () => {
        await dispatch(reqToGetClientNos({ page: currentPage, limit: itemsPerPage }));
    }

    // handleDelete
    const handleDelete = async () => {
        await dispatch(reqToDeleteClientNos(id));
        handleGetNos();
        handleModalClose();
    }

    // Filter Data
    const filterData = useMemo(() => clientNos?.filter((item) => {
        return (
            item?.assginedSectorsName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.jobRoleName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.nosName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.nosCode?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.totalTheoryMarks?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.totalVivaMarks?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.totalPracticalMarks?.toLowerCase()?.includes(searchTerm.toLowerCase())
        )
    }), [clientNos, searchTerm]);

    // Get Nos Data
    useEffect(() => {
        handleGetNos();
    }, [currentPage, itemsPerPage])

    // Get Sector & Job Role Dropdown
    useEffect(() => {
        dispatch(reqToGetSectorDropDown());
        dispatch(reqToGetClientJobRoleDropDown());
    }, [])

    return (
        <>
            {loader && (<Loader />)}
            <Header name="Content Management" />
            <section className="content-management-section">
                <h2 className="content-management-title">Manage NOS</h2>
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
                        headers={nosHeader}
                        fileName="nos.csv"
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
                        pagination={clientNosPagination}
                        filterData={filterData}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                )}
            </section>
            {/* Add Nos */}
            <AddNos show={modalShow.show} handleClose={handleModalClose} sectorDropDown={sectorDropDown} clientJobRoleDropDown={clientJobRoleDropDown} handleGetNos={handleGetNos} />
            {/* Edit Nos */}
            <EditNos show={modalShow.editShow} handleClose={handleModalClose} editData={editData} sectorDropDown={sectorDropDown} clientJobRoleDropDown={clientJobRoleDropDown} handleGetNos={handleGetNos} />
            {/* Delete Nos */}
            <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
        </>
    )
}

export default ManageNos