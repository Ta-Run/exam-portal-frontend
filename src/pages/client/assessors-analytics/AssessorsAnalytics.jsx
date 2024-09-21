import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import "./AssessorsAnalytics.scss"

import { SVGICON } from "../../../constants/IconList";
import { reqToGetBatchDropDown, reqToGetClientJobRoleDropDown, reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";

import Header from "../../../components/header/admin/Header";
import Pagination from "../../../components/pagination/Pagination";
import Loader from "../../../components/loader/Loader";
import { ManageBatchHeader } from "../../../constants/header";
import DeleteModal from "../../../components/modal/delete/DeleteModal";
import AddManageBatch from "../../../components/offcanvas/manage-batch/AddManageBatch";
import EditManageBatch from './../../../components/offcanvas/manage-batch/EditManageBatch';
import { reqToDeleteClientManageBatch, reqToGetClientManageBatch } from "../../../reduxToolkit/services/assessmentServices";
import { useDisablePrevDate } from "../../../hooks/useDisablePrevDate";
import { Link } from "react-router-dom";
import StateStatusChart from "./StateStatusChart";
import JobRoleStatusChart from "./JobRoleStatusChart";

const AssessorsAnalytics = () => {
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

    return (
        <>
            {/* {loader && <Loader />} */}
            <Header name="Assessment" />
            <section className="assessors-analytics-section">
                <h2 className="main-title">Assessors Status</h2>
                <div className="top-filter-area">
                    <div className="row align-items-end">
                        <div className="col-lg-2 mb-lg-0 mb-4">
                            <div className="sector-selector">
                                <label htmlFor="sectorType" className="form-label mb-2">
                                    Sector
                                </label>
                                <select className="form-select">
                                    <option value="">All</option>
                                    {sectorDropDown?.map((item) => {
                                        return (
                                            <option value={item?._id} key={item?._id}>
                                                {item?.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 mb-lg-0 mb-4">
                            <div className="sector-selector">
                                <label htmlFor="State" className="form-label mb-2">
                                    Assessor
                                </label>
                                <select className="form-select">
                                    <option value="">All</option>
                                    <option value="1">a</option>
                                    <option value="2">b</option>
                                    <option value="3">c</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 mb-lg-0 mb-4">
                            <div className="sector-selector">
                                <label htmlFor="District" className="form-label mb-2">
                                    From Date
                                </label>
                                <input type="date" className="form-date-select" />
                            </div>
                        </div>
                        <div className="col-lg-2 mb-lg-0 mb-4">
                            <div className="sector-selector">
                                <label htmlFor="District" className="form-label mb-2">
                                    To Date
                                </label>
                                <input type="date" className="form-date-select" />
                            </div>
                        </div>
                        <div className="col-lg-2 mb-lg-0 mb-4">
                            <button type="button" className="delete-btn me-3">Check Details</button>
                        </div>
                    </div>
                </div>
                <div className="top-cards-wrapper justify-content-between">
                    <div className="row">
                        <div className="col-xxl-3 col-md-4 col-sm-6 mb-4">
                            <div className="card-area" style={{ backgroundColor: "#FEEDE2" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-1.svg" alt="Sector" className='img-fluid' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#F37321" }}>
                                                <h4>2</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Total Batches Assessed</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-4 col-sm-6 mb-4">
                            <div className="card-area" style={{ backgroundColor: "#E2FEF6" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-2.svg" alt="Registered Assessor" className='img-fluid' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#20FFBF" }}>
                                                <h4>9</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Total Candidates Assessed</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-4 col-sm-6 mb-4">
                            <div className="card-area" style={{ backgroundColor: "#E2FCFE" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-3.svg" alt="Candidates Enrolled" className='img-fluid' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#20FFBF" }}>
                                                <h4>650</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Total States</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-4 col-sm-6 mb-4">
                            <div className="card-area" style={{ backgroundColor: "#D5DFF4" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-4.svg" alt="Candidates Assessed" className='img-fluid' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#6B57E9" }}>
                                                <h4>650</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Total Districts</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <StateStatusChart />
                <JobRoleStatusChart />
            </section>
        </>
    );
};

export default AssessorsAnalytics;