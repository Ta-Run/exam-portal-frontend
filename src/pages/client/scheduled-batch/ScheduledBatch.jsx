import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { reqToGetBatchDropDown, reqToGetClientJobRoleDropDown, reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";
import { reqToGetClientScheduledBatch } from "../../../reduxToolkit/services/assessmentServices";

import Header from "../../../components/header/client/Header";
import Loader from "../../../components/loader/Loader";
import Pagination from "../../../components/pagination/Pagination";
import TableComponent from "./TableComponent";
import DataNoFound from "../../../components/data-no-found/DataNoFound";
import TopSearchBar from "../../../components/top-search-bar/TopSearchBar";
import usePagination from "../../../hooks/usePagination";

const ScheduledBatch = () => {
  const dispatch = useDispatch();

  // Selectors
  const { loader, clientScheduledBatch, clientScheduledBatchPagination } = useSelector((state) => state.assessment);
  const { sectorDropDown, clientJobRoleDropDown, clientBatchDropDown } = useSelector((state) => state.contentManagement);

  // States
  const [modalShow, setModalShow] = useState({ editShow: false });
  const [id, setId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Custom hooks
  const { currentPage, itemsPerPage, setItemsPerPage, paginate } = usePagination();

  // handleModalShow
  const handleModalShow = (type, data = null) => {
    setModalShow({ ...modalShow, [type]: true });
    if (type === "statusShow") setId(data);
  };

  // handleModalClose
  const handleModalClose = () => {
    setModalShow({ show: false, editShow: false, deleteShow: false });
  };

  // handleGetScheduledBatch
  const handleGetScheduledBatch = async () => {
    await dispatch(reqToGetClientScheduledBatch({ page: currentPage, limit: itemsPerPage }));
  };

  // Filter Data
  const filterData = useMemo(() => clientScheduledBatch?.filter((item) => {
    return (
      item?._id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.BatchCode?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.TrainingPartnerName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.TrainingCenterName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.state?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.district?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
  }), [clientScheduledBatch, searchTerm]);

  // Get Scheduled Batch Data
  useEffect(() => {
    handleGetScheduledBatch();
  }, [currentPage, itemsPerPage]);

  // Get Sector & Job Role Dropdown
  useEffect(() => {
    dispatch(reqToGetSectorDropDown());
    dispatch(reqToGetClientJobRoleDropDown());
    dispatch(reqToGetBatchDropDown());
  }, []);

  return (
    <>
      {loader && <Loader />}
      <Header name="Assessment" />
      <section className="manage-question-section">
        <h2 className="manage-question-title">Scheduled Batches</h2>
        <div className="manage-question-add-main">
          <div className="row">
            <div className="col-lg-2">
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
            <div className="col-lg-2">
              <div className="sector-selector ms-lg-4 ms-0 mt-lg-0 mt-4">
                <label htmlFor="jobRole" className="form-label mb-2">
                  Job Role
                </label>
                <select className="form-select">
                  <option value="">All</option>
                  {
                    clientJobRoleDropDown?.map((item) => {
                      return (
                        <option value={item?._id} key={item?._id}>{item?.jobRoleName}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="sector-selector">
                <label htmlFor="sectorType" className="form-label mb-2">
                  Batch
                </label>
                <select className="form-select">
                  <option value="">All</option>
                  {
                    clientBatchDropDown?.map((item) => {
                      return (
                        <option value={item?._id} key={item?._id}>{item?.BatchCode}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="sector-selector ms-lg-4 ms-0 mt-lg-0 mt-4">
                <label htmlFor="jobRole" className="form-label mb-2">
                  State
                </label>
                <select className="form-select">
                  <option value="">All</option>
                  <option value="1">a</option>
                  <option value="2">b</option>
                  <option value="3">c</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="sector-selector ms-lg-4 ms-0 mt-lg-0 mt-4">
                <label htmlFor="jobRole" className="form-label mb-2">
                  District
                </label>
                <select className="form-select">
                  <option value="">All</option>
                  <option value="1">a</option>
                  <option value="2">b</option>
                  <option value="3">c</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="manage-question-body">
          <div className="manage-question-filters">
            <TopSearchBar
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>
        <div className="manage-question-table">
          <div className="table-responsive">
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
            pagination={clientScheduledBatchPagination}
            filterData={filterData}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </section>
    </>
  );
};

export default ScheduledBatch;
