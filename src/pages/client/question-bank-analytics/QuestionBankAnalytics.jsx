import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/header/admin/Header";
import { reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";
import { reqFetchQuestionAnalyticsRecord } from "../../../reduxToolkit/services/analyticsRecordServices";
import TableComponent from "./TableComponent";
import { SVGICON } from "../../../constants/IconList";
import { toast } from "react-toastify";

const QuestionBankAnalytics = () => {
  const dispatch = useDispatch();

  const [questionData, setQuestionData] = useState([]);
  // Selectors
  const assessmentReducer = useSelector((state) => state.assessment);
  const { loader, clientManageBatch, clientManageBatchPagination } = assessmentReducer;

  const contentManagementReducer = useSelector((state) => state.contentManagement);
  const { sectorDropDown, clientJobRoleDropDown, clientBatchDropDown } = contentManagementReducer;

  // const analyticsRecordsReducer = useSelector((state) => state.AnalyticsMangement);

  // const { stateCount, batchCount, districtCount, candidateCount, jobRoleStatus, stateBatchStatus } = analyticsRecordsReducer
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
  const [selectedSector, setSelectedSector] = useState("");

  // handleModalShow
  const handleModalShow = (type, data = null) => {
    setModalShow({ ...modalShow, [type]: true });
    if (type === "editShow") setEditData(data);
    if (type === "deleteShow") setId(data);
  };

  // Get Sector & Job Role Dropdown
  useEffect(() => {
    dispatch(reqToGetSectorDropDown());
  }, []);


  const fetchFilterQuestionBank = async () => {
    try {
      // Make an API request using axios
      const response =
        await dispatch(reqFetchQuestionAnalyticsRecord(
          {
            id: selectedSector,
            startDate: startdate,
            endDate: enddate
          }
        ))
        if(response.payload.result.length === 0){
          
          toast.warning('Not Existing Infromaion ')
        }
      setQuestionData(response.payload.result);
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
                <select className="form-select"

                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}>
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
                onClick={fetchFilterQuestionBank}
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
                        {/* <h4>{batchCount||0}</h4> */}
                        <h4>0</h4>
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
                        {/* <h4>{candidateCoun||0}</h4> */}
                        <h4>0</h4>
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
                        {/* <h4>{stateCount||0}</h4> */}
                        <h4>0</h4>
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
                        {/* <h4>{districtCount||0}</h4> */}
                        <h4>0</h4>
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
            {/* <CSVLink data={filterData || []} headers={spocPersonHeader} filename='sector.csv'>
              <button
                type="button"
                className="management-download-btns me-3">
                {SVGICON.listSvg}
              </button>
            </CSVLink> */}
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
            <TableComponent currentPage={currentPage} itemsPerPage={itemsPerPage} questionData={questionData} />
          </div>
        </div>
      </section>
    </>
  );
};

export default QuestionBankAnalytics;