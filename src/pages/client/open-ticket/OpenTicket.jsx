import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from "react-csv";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import { SVGICON } from '../../../constants/IconList';
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
import AddOpenTicket from '../../../components/offcanvas/open-ticket/AddOpenTicket';

const OpenTicket = () => {

    const dispatch = useDispatch();

    // Selectors
    const contentManagementReducer = useSelector((state) => state.contentManagement);
    const { spocClient, spocClientPagination, sectorDropDown, loader } = contentManagementReducer;

    // useRef
    const contentPdf = useRef();

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

    // exportPdfHandler
    const exportPdfHandler = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: '#client-sector-table', styles: { halign: 'center' }, headStyles: { fillColor: "#201D48" } });
        doc.save("sector.pdf");
    }

    // generatePdf
    const generatePdf = useReactToPrint({
        content: () => contentPdf?.current,
        documentTitle: "sector",
        pageStyle: `
        @page {  size: A4;  margin: 20mm; }
        body { font-size: 12pt; }`
    });

    // Filter Data
    const filterData = useMemo(() => spocClient?.filter((item) => {
        return (
            item?.spocPersonName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            item?.contactNo?.includes(searchTerm) ||
            item?.emailId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            item?.password?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            item?.assginedSectorsNames?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
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

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {/* {loader && (<Loader />)} */}
            <Header name="Support" />
            <section className="content-management-section">
                <h2 className="content-management-title">Open Ticket</h2>
                <div className="content-management-body">
                    <div className="content-management-filters">
                        <select
                            className="form-select"
                            name='entries'
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <div className="search-input">
                            <input
                                type="text"
                                placeholder="Search.."
                                name='search'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="button" className="search-btn">
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="content-management-downloads">
                        <button
                            type="button"
                            className="management-add me-3"
                            onClick={() => handleModalShow("show")}
                        >
                            + Add New
                        </button>
                        <button
                            type="button"
                            className="management-download-btns me-3"
                            onClick={exportPdfHandler}
                        >
                            {SVGICON.PdfSvg}
                        </button>
                        <CSVLink data={filterData || []} headers={spocPersonHeader} filename='sector.csv'>
                            <button
                                type="button"
                                className="management-download-btns me-3">
                                {SVGICON.listSvg}
                            </button>
                        </CSVLink>
                        <button
                            type="button"
                            className="management-download-btns"
                            onClick={generatePdf}
                        >
                            {SVGICON.printerSvg}
                        </button>
                    </div>
                </div>
                <div className="content-management-table">
                    <div className="table-responsive" ref={contentPdf}>
                        <TableComponent filterData={filterData} handleModalShow={handleModalShow} currentPage={currentPage} itemsPerPage={itemsPerPage} />
                    </div>
                    {/* {filterData?.length === 0 && (
                        <div className='text-center pt-3'>
                            <h3 className='m-0'>Data No Found</h3>
                        </div>
                    )} */}
                </div>
                {/* {filterData?.length > 0 && (
                    <Pagination
                        pagination={spocClientPagination}
                        filterData={filterData}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                )} */}
            </section>
            {/* Add SPOC Person */}
            <AddOpenTicket show={modalShow.show} handleClose={handleModalClose} sectorDropDown={sectorDropDown} handleGetSector={handleGetSector} />
            {/* Edit SPOC Person */}
            {/* <EditSpocPerson show={modalShow.editShow} handleClose={handleModalClose} sectorDropDown={sectorDropDown} editData={editData} handleGetSector={handleGetSector} /> */}
            {/* Delete SPOC Person */}
            {/* <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} /> */}
            {/* Status Change */}
            {/* <StatusModal show={modalShow.statusShow} handleClose={handleModalClose} handleStatusChange={handleStatusChange} /> */}
        </>
    )
}

export default OpenTicket