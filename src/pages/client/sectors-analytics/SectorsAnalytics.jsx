import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/header/admin/Header";
import Loader from "../../../components/loader/Loader";
import { reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";
import { reqFetchAnalyticsRecord } from "../../../reduxToolkit/services/analyticsRecordServices.jsx";
import StateStatusChart from "../assessors-analytics/StateStatusChart.jsx";
import JobRoleStatusChart from "../assessors-analytics/JobRoleStatusChart.jsx";
import { toast } from "react-toastify"; // Add this line to use toast for error messages

const SectorsAnalytics = () => {
    const dispatch = useDispatch();

    // Selectors
    const analyticsRecordsReducer = useSelector((state) => state.AnalyticsMangement);
    const contentManagementReducer = useSelector((state) => state.contentManagement);

    const { sectorDropDown } = contentManagementReducer;
    const { stateCount, batchCount, districtCount, candidateCount, jobRoleStatus, stateBatchStatus } = analyticsRecordsReducer;

    // States
    const [selectedSector, setSelectedSector] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [filterApplied, setFilterApplied] = useState(false);

    // Handle sector dropdown change
    const handleSectorChange = (e) => {
        setSelectedSector(e.target.value);
    };

    // Handle date range change
    const handleDateChange = (type, value) => {
        if (type === "from") {
            setFromDate(value);
        } else if (type === "to") {
            setToDate(value);
        }
    };

    // Validation to check if all fields are filled
    const isFilterValid = () => {
        if (!selectedSector) {
            toast.error("Please select a sector");
            return false;
        }
        if (!fromDate) {
            toast.error("Please select a from date");
            return false;
        }
        if (!toDate) {
            toast.error("Please select a to date");
            return false;
        }
        return true;
    };

    // Fetch analytics record based on sector and date filter
    const handleFilterSubmit = () => {
        if (isFilterValid()) {
            // Only dispatch if all filters are filled
            const sectorId = selectedSector || ""; // Pass empty if no sector selected
            dispatch(reqFetchAnalyticsRecord({
                sectorId,
                from: fromDate,
                to: toDate,
            }));
            setFilterApplied(true); // To track whether filter is applied
        }
    };

    // Get Sector Dropdown on component mount
    useEffect(() => {
        dispatch(reqToGetSectorDropDown());
    }, [dispatch]);

    return (
        <>
            <Header name="Assessment" />
            <section className="assessors-analytics-section">
                <h2 className="main-title">Sector Status</h2>
                <div className="top-filter-area">
                    <div className="row align-items-end">
                        <div className="col-lg-3 mb-lg-0 mb-4">
                            <div className="sector-selector">
                                <label htmlFor="sectorType" className="form-label mb-2">
                                    Sector
                                </label>
                                <select
                                    className="form-select"
                                    value={selectedSector}
                                    onChange={handleSectorChange}
                                >
                                    <option value="">All</option>
                                    {sectorDropDown?.map((item) => (
                                        <option value={item?._id} key={item?._id}>
                                            {item?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-lg-0 mb-4">
                            <div className="sector-selector">
                                <label htmlFor="fromDate" className="form-label mb-2">
                                    From Date
                                </label>
                                <input
                                    type="date"
                                    className="form-date-select"
                                    value={fromDate}
                                    onChange={(e) => handleDateChange("from", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 mb-lg-0 mb-4">
                            <div className="sector-selector">
                                <label htmlFor="toDate" className="form-label mb-2">
                                    To Date
                                </label>
                                <input
                                    type="date"
                                    className="form-date-select"
                                    value={toDate}
                                    onChange={(e) => handleDateChange("to", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-2 mb-lg-0 mb-4">
                            <button
                                type="button"
                                className="delete-btn me-3"
                                onClick={handleFilterSubmit}
                            >
                                Check Details
                            </button>
                        </div>
                    </div>
                </div>

                {filterApplied && ( // Only show the charts if filter is applied
                    <>
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
                                                        <h4>{batchCount}</h4>
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
                                                        <h4>{candidateCount}</h4>
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
                                                    <div className="number mb-4" style={{ borderColor: "#20FBF" }}>
                                                        <h4>{stateCount}</h4>
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
                                                    <div className="number mb-4" style={{ borderColor: "#3D5EEA" }}>
                                                        <h4>{districtCount}</h4>
                                                    </div>
                                                    <div className="text">
                                                        <h5>Total Districts Assessed</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Analytics charts */}
                        <StateStatusChart stateBatchStatus={stateBatchStatus} />
                        <JobRoleStatusChart jobRoleStatus={jobRoleStatus} />
                    </>
                )}
            </section>
        </>
    );
};

export default SectorsAnalytics;
