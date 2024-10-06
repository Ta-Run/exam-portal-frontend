import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/header/admin/Header";
import { reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";
import { reqFetchQuestionAnalyticsRecord,reqFetchQuestionDropDown } from "../../../reduxToolkit/services/analyticsRecordServices";
import TableComponent from "./TableComponent";
import { SVGICON } from "../../../constants/IconList";
import { toast } from "react-toastify";
import axios from "axios"; // Assuming you're using axios

const QuestionBankAnalytics = () => {
  const dispatch = useDispatch();
  const [questionData, setQuestionData] = useState([]);
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
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [questionDropDown, setQuestionDropDown] = useState([]);

  // Fetch Question Bank Dropdown Options
  const questionBankDropDown = async () => {
    try {
      const response = await dispatch(reqFetchQuestionDropDown())
        setQuestionDropDown(response.payload.data); 
    } catch (error) {
      console.error("Error fetching question bank dropdown:", error);
    }
  };
  
  // Fetch Filtered Question Bank Data
  const fetchFilterQuestionBank = async () => {
    try {
      const response = await dispatch(
        reqFetchQuestionAnalyticsRecord({
          id: selectedSector, // Using selected sector ID
          startDate: startdate,
          endDate: enddate,
        })
      );
      
    
      if (response.payload.result.length === 0) {
        toast.warning("No existing information");
      }
      setQuestionData(response.payload.result);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  // Fetch dropdown on component mount
  useEffect(() => {
    questionBankDropDown();
  }, []);


  return (
    <>
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
                <select
                  className="form-select"
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)} // Update selected sector ID
                >
                  <option value="">All</option>
                  
                  {questionDropDown?.map((item) => {
                    return (
                      <option value={item?._id} key={item?._id}>
                        {item?.questionBankName}
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
                <input
                  type="date"
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
                <input
                  type="date"
                  value={enddate}
                  onChange={(e) => setenddate(e.target.value)}
                  className="form-date-select"
                />
              </div>
            </div>
            <div className="col-lg-2 mb-lg-0 mb-4">
              <button
                type="button"
                className="delete-btn me-3"
                onClick={fetchFilterQuestionBank}
              >
                Check Details
              </button>
            </div>
          </div>
        </div>
        <div className="content-management-table">
          <div className="table-responsive" ref={contentPdf}>
            <TableComponent
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              questionData={questionData}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default QuestionBankAnalytics;
