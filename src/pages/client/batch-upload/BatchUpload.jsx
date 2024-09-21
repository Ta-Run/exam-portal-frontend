import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import { SVGICON } from "../../../constants/IconList";
import { reqToDeleteClientBatchUpload, reqToGetClientBatchUpload, reqToMoveClientBatchUpload } from "../../../reduxToolkit/services/assessmentServices";

import Header from "../../../components/header/admin/Header";
import Pagination from "../../../components/pagination/Pagination";
import Loader from "../../../components/loader/Loader";
import { candidateBatchUploadHeader } from "../../../constants/header";
import TableComponent from "./TableComponent";
import BatchUploadModal from "../../../components/modal/client/batch-upload/BatchUploadModal";
import usePagination from "../../../hooks/usePagination";
import TopSearchBar from "../../../components/top-search-bar/TopSearchBar";
import DataNoFound from "../../../components/data-no-found/DataNoFound";

const BatchUpload = () => {
  const dispatch = useDispatch();

  // Selectors
  const { loader, clientBatchUpload, clientBatchUploadPagination } = useSelector((state) => state.assessment);

  // States
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Custom hooks
  const { currentPage, itemsPerPage, setItemsPerPage, paginate } = usePagination();

  // handleClose
  const handleClose = () => setShow(false);
  // handleShow
  const handleShow = () => setShow(true);

  // handleSelectAll
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = clientBatchUpload.map(item => item._id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  }

  // handleSelectItem
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((item) => item !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  }

  // handleGetBatchUpload
  const handleGetBatchUpload = async () => {
    await dispatch(reqToGetClientBatchUpload({ page: currentPage, limit: itemsPerPage }));
  }

  // handleCandidateDelete
  const handleCandidateDelete = async () => {
    if (selectedItems?.length > 0) {
      await dispatch(reqToDeleteClientBatchUpload(selectedItems));
      handleGetBatchUpload();
      setSelectedItems([]);
    }
  }

  // handleCandidateMove
  const handleCandidateMove = async () => {
    if (selectedItems?.length > 0) {
      await dispatch(reqToMoveClientBatchUpload(selectedItems));
      handleGetBatchUpload();
      setSelectedItems([]);
    }
  }

  // Filter Data
  const filterData = useMemo(() => clientBatchUpload?.filter((item) => {
    return (
      item?.state?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.district?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.TrainingPartnerEmail?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.TrainingCenterName?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
  }), [clientBatchUpload, searchTerm]);

  // Get Candidate Bulk Upload Data
  useEffect(() => {
    handleGetBatchUpload();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (selectedItems?.length === filterData?.length && selectedItems?.length !== 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems, filterData]);

  return (
    <>
      {loader && <Loader />}
      <Header name="Assessment" />
      <section className="batch-upload-section">
        <h2 className="manage-question-title">Manage Batch Upload</h2>
        <div className="batch-upload-add-main">
          <div className="batch-upload-header">
            <button
              type="button"
              className="management-upload-btn mx-3"
              onClick={handleShow}
            >
              {SVGICON.uploadSvg} Bulk Upload
            </button>
            <CSVLink
              data={filterData || []}
              headers={candidateBatchUploadHeader}
              filename="bacthUpload.csv"
            >
              <button type="button" className="management-download-btn">
                {SVGICON.downloadSvg} Download Template
              </button>
            </CSVLink>
          </div>
          <hr />
          <div className="row align-items-end">
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="State" className="form-label mb-2">
                  State
                </label>
                <select className="form-select" name="State">
                  <option value="">Please Select</option>
                  <option value="1">a</option>
                  <option value="2">b</option>
                  <option value="3">c</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="jobRole" className="form-label mb-2">
                  District
                </label>
                <select className="form-select" name="Batch">
                  <option value="">Please Select</option>
                  <option value="1">a</option>
                  <option value="2">b</option>
                  <option value="3">c</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <button type="button" className="delete-btn me-3" onClick={handleCandidateDelete}>
                Delete
              </button>
              <button type="button" className="move-btn" onClick={handleCandidateMove}>
                Move
              </button>
            </div>
          </div>
        </div>
        <div className="batch-upload-body">
          <div className="batch-upload-filters">
            <TopSearchBar
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>
        <div className="batch-upload-table">
          <div className="table-responsive">
            <TableComponent
              filterData={filterData}
              selectAll={selectAll}
              handleSelectAll={handleSelectAll}
              selectedItems={selectedItems}
              handleSelectItem={handleSelectItem}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
          {filterData?.length === 0 && <DataNoFound />}
        </div>
        {filterData?.length > 0 && (
          <Pagination
            pagination={clientBatchUploadPagination}
            filterData={filterData}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </section>
      {/* Modal */}
      <BatchUploadModal show={show} handleClose={handleClose} handleShow={handleShow} handleGetBatchUpload={handleGetBatchUpload} />
    </>
  );
};

export default BatchUpload;