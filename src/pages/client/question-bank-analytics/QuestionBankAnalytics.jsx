import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";


import Header from "../../../components/header/admin/Header";
import Pagination from "../../../components/pagination/Pagination";
import Loader from "../../../components/loader/Loader";
import { ManageBatchHeader, spocPersonHeader } from "../../../constants/header";
import DeleteModal from "../../../components/modal/delete/DeleteModal";
import AddManageBatch from "../../../components/offcanvas/manage-batch/AddManageBatch";
import EditManageBatch from './../../../components/offcanvas/manage-batch/EditManageBatch';
import { reqToDeleteClientManageBatch, reqToGetClientManageBatch } from "../../../reduxToolkit/services/assessmentServices";
import { useDisablePrevDate } from "../../../hooks/useDisablePrevDate";
import { Link } from "react-router-dom";
import { reqToGetBatchDropDown, reqToGetClientJobRoleDropDown, reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";
import TableComponent from "./TableComponent";
import { SVGICON } from "../../../constants/IconList";
import axios from "axios";

const QuestionBankAnalytics = () => {
  const dispatch = useDispatch();

  const [questionData, setQuestionData] = useState([]);
  // Selectors
  const assessmentReducer = useSelector((state) => state.assessment);
  const { loader, clientManageBatch, clientManageBatchPagination } = assessmentReducer;

  const contentManagementReducer = useSelector((state) => state.contentManagement);
  const { sectorDropDown, clientJobRoleDropDown, clientBatchDropDown } = contentManagementReducer;


  const analyticsRecordsReducer = useSelector((state) => state.AnalyticsMangement);

  const { stateCount, batchCount, districtCount, candidateCount, jobRoleStatus, stateBatchStatus } = analyticsRecordsReducer


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
  const [startdate, setstartdate] = useState('')
  const [enddate, setenddate] = useState('')

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
  // sort by date 
  const sortDatewise = async (sdate, edate) => {
    if (!sdate || !edate) {
      console.log('Start date or End date is missing');
      return; // If any date is missing, return without fetching data
    }
    try {
      // Make an API request using axios
      const response = await axios.get("http://localhost:4000/api/v1/analytics/questionAnalytics/66867238c57456d8ba93a6d9", {
        headers: {
          'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjgzN2IwZDI3Njk4NjY5YTAwNzA2MzEiLCJqdGkiOiI1MDEwODU1M2MyOTc5NmExNjkzYjUzYThiMDFjYzI3NjNiNDkyNGJkZTQ0MTMwODM3ZWYwNGMxOTQxMzQ2MTM1IiwiZW1haWwiOiJkYXhpdEBnbWFpbC5jb20iLCJsb2dpblR5cGUiOiJDbGllbnQiLCJpYXQiOjE3Mjc0MjAyMDUsImV4cCI6MTc1ODk1NjIwNX0.tubXZKzJkl13iwuPfJG-bqDX-xndJUR94TPUPi5LjtU"
        },
        // Passing the startDate and endDate as query parameters
        params: {
          startDate: sdate,
          endDate: edate
        }
      });

      // Update the state with the fetched data
      setQuestionData(response.data.result);

    } catch (error) {
      console.error('Error fetching question data:', error);
    }
  }

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
    //fetchQuestionBank();
  }, []);

  //fetch Question bank and questions based on sectior id 
  const token = localStorage.getItem("persist:client");
  const parsedData = JSON.parse(token);
  const userToken = parsedData && parsedData.client ? JSON.parse(parsedData.client)?.authentication?.accessToken : null;
  const fetchQuestionBank = async () => {
    try {
      // Make an API request using axios
      const response = await axios.get("http://localhost:4000/api/v1/analytics/questionAnalytics/66867238c57456d8ba93a6d9", {
        headers: {
          'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjgzN2IwZDI3Njk4NjY5YTAwNzA2MzEiLCJqdGkiOiI1MDEwODU1M2MyOTc5NmExNjkzYjUzYThiMDFjYzI3NjNiNDkyNGJkZTQ0MTMwODM3ZWYwNGMxOTQxMzQ2MTM1IiwiZW1haWwiOiJkYXhpdEBnbWFpbC5jb20iLCJsb2dpblR5cGUiOiJDbGllbnQiLCJpYXQiOjE3Mjc0MjAyMDUsImV4cCI6MTc1ODk1NjIwNX0.tubXZKzJkl13iwuPfJG-bqDX-xndJUR94TPUPi5LjtU"
        },
      });

      // Update the state with the fetched data
      //console.log(response)
      setQuestionData(response.data.result);

    } catch (error) {
      console.error('Error fetching question data:', error);


    }
  };

  return (
    <>
      {/* {loader && <Loader />} */}
      <Header name="Assessment" />
      <section className="assessors-analytics-section">
        <h2 className="main-title">Question Bank Status</h2>
        <div className="top-filter-area">
          <div className="row align-items-end">
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="sectorType" className="form-label mb-2">
                  Sector Question Bank
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
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="District" className="form-label mb-2">
                  From Date
                </label>
                <input type="date"
                  value={startdate}
                  onChange={(e) => setstartdate(e.target.value)}
                  className="form-date-select"
                />
              </div>
            </div>
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="District" className="form-label mb-2">
                  To Date
                </label>
                <input type="date"
                  value={enddate}
                  onChange={(e) => setenddate(e.target.value)}
                  className="form-date-select"

                />
              </div>
            </div>
            <div className="col-lg-2 mb-lg-0 mb-4">
              <button type="button" className="delete-btn me-3"

                onClick={() => sortDatewise(startdate, enddate)}
              >Check Details</button>
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
                      <div className="number mb-4" style={{ borderColor: "#20FFBF" }}>
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
                      <div className="number mb-4" style={{ borderColor: "#6B57E9" }}>
                        <h4>{districtCount}</h4>
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
              className="management-download-btns me-3"
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
            >
              {SVGICON.printerSvg}
            </button>
          </div>
        </div>
        <div className="content-management-table">
          <div className="table-responsive" ref={contentPdf}>
            <TableComponent filterData={filterData} handleModalShow={handleModalShow} currentPage={currentPage} itemsPerPage={itemsPerPage} questionData={questionData} />
          </div>
          {/* {filterData?.length === 0 && (
                        <div className='text-center pt-3'>
                            <h3 className='m-0'>Data No Found</h3>
                        </div>
                    )} */}
        </div>
        {/* <StateStatusChart /> */}
        {/* <JobRoleStatusChart /> */}
      </section>
    </>
  );
};

export default QuestionBankAnalytics;