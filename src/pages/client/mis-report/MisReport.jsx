import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import { SVGICON } from "../../../constants/IconList";
import { reqToGetBatchDropDown, reqToGetClientJobRoleDropDown, reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";

import Header from "../../../components/header/admin/Header";
import TableComponent from "./TableComponent";
import Pagination from "../../../components/pagination/Pagination";
import Loader from "../../../components/loader/Loader";
import { ManageBatchHeader } from "../../../constants/header";
import DeleteModal from "../../../components/modal/delete/DeleteModal";
import AddManageBatch from "../../../components/offcanvas/manage-batch/AddManageBatch";
import EditManageBatch from './../../../components/offcanvas/manage-batch/EditManageBatch';
import { reqToDeleteClientManageBatch, reqToGetClientManageBatch } from "../../../reduxToolkit/services/assessmentServices";
import { useDisablePrevDate } from "../../../hooks/useDisablePrevDate";
import { clientReportModule } from "../../../reduxToolkit/services/reportServices";

const MisReport = () => {
    const dispatch = useDispatch();

    // Selectors
    const assessmentReducer = useSelector((state) => state.assessment);
    const { loader, clientManageBatch, clientManageBatchPagination } = assessmentReducer;

    const contentManagementReducer = useSelector((state) => state.contentManagement);
    const { sectorDropDown, clientJobRoleDropDown, clientBatchDropDown } = contentManagementReducer;

    // useRef
    const contentPdf = useRef();

    // States
    const [modalShow, setModalShow] = useState({
        show: false,
        editShow: false,
        deleteShow: false,
    });
    const [id, setId] = useState(null);
    const [editData, setEditData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [reportData, setReportData] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    // handleModalShow
    const handleModalShow = (type, data = null) => {
        setModalShow({ ...modalShow, [type]: true });
        if (type === "editShow") setEditData(data);
        if (type === "deleteShow") setId(data);
    };

    // handleModalClose
    const handleModalClose = () => {
        setModalShow({
            show: false,
            editShow: false,
            deleteShow: false,
        });
    };

    const handleDate = (e,type) => {
        if (type === 'start') {
            setStartDate(e.target.value);
        } else if (type === 'end') {
            setEndDate(e.target.value);
        }
    }
    // handleGetManageBatch
    const handleGetManageBatch = async () => {
        await dispatch(reqToGetClientManageBatch({ page: currentPage, limit: itemsPerPage }));
    }

    // handleDelete
    const handleDelete = async () => {
        await dispatch(reqToDeleteClientManageBatch(id));
        handleGetManageBatch();
        handleModalClose();
    };

    // Filter Data
    const filterData = useMemo(() => clientManageBatch?.filter((item) => {
        return (
            item?._id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.BatchCode?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.TrainingPartnerName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.TrainingCenterName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.state?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.district?.toLowerCase()?.includes(searchTerm.toLowerCase())
        );
    }), [clientManageBatch, searchTerm]);

    // Get Manage Candidate Data
    useEffect(() => {
        handleGetManageBatch();
    }, [dispatch, currentPage, itemsPerPage]);

    // Get Sector & Job Role Dropdown
    useEffect(() => {
        dispatch(reqToGetSectorDropDown());
        dispatch(reqToGetClientJobRoleDropDown());
        dispatch(reqToGetBatchDropDown());

    }, []);


    const handleReports = async () => {

        console.log(startDate, endDate)
        const data = await dispatch(clientReportModule(

            {
                startTime: startDate,
                endTime: endDate
            }
        ));

        setReportData(data.payload.data)
        console.log('reports data ',)

    }
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {/* {loader && <Loader />} */}
            <Header name="Reports" />
            <section className="batch-upload-section">
                <h2 className="manage-question-title">MIS Report</h2>
                <div className="batch-upload-add-main">
                    <div className="row align-items-end">
                        <div className="col-lg-3 mb-lg-0 mb-4">
                            <div className="sector-selector">
                                <label htmlFor="sectorType" className="form-label mb-2">
                                    From Date
                                </label>
                                <input type="date" className="form-date-select"
                                    value={startDate} onChange={e => handleDate(e,'start')} />

                            </div>
                        </div>
                        <div className="col-lg-3 mb-lg-0 mb-4">
                            <div className="sector-selector">
                                <label htmlFor="sectorType" className="form-label mb-2">
                                    To Date
                                </label>
                                <input type="date" className="form-date-select" value={endDate} onChange={e => handleDate(e ,'end')} />
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <button type="button" className="delete-btn me-3"
                                onClick={handleReports}
                            >View</button>
                        </div>
                    </div>
                </div>
                <div className="batch-upload-body">
                    <div className="batch-upload-filters">
                        <select
                            className="form-select"
                            name="entries"
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
                                name="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="button" className="search-btn">
                                Search
                            </button>
                        </div>
                    </div>
                    {/* <div className="content-management-downloads">
            <CSVLink
              data={filterData || []}
              headers={ManageBatchHeader}
              filename="bacth.csv"
            >
              <button type="button" className="management-download-btns me-3">
                {SVGICON.listSvg}
              </button>
            </CSVLink>
          </div> */}
                </div>
                <div className="batch-upload-table">
                    <div className="table-responsive" ref={contentPdf}>
                        <TableComponent filterData={filterData} handleModalShow={handleModalShow} currentPage={currentPage} itemsPerPage={itemsPerPage}
                            reportData={reportData}
                        />
                    </div>
                    {/* {filterData?.length === 0 && (
            <div className="text-center pt-3">
              <h3 className="m-0">Data No Found</h3>
            </div>
          )} */}
                </div>
                {/* {filterData?.length > 0 && (
          <Pagination
            pagination={clientManageBatchPagination}
            filterData={filterData}
            currentPage={currentPage}
            paginate={paginate}
          />
        )} */}
            </section>
        </>
    );
};

export default MisReport;