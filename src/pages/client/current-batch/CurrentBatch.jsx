import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { reqToDeleteClientAssessor, reqToEditStatusClientAssessor } from "../../../reduxToolkit/services/userManagementServices";
import { reqToGetBatchDropDown, reqToGetClientJobRoleDropDown, reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";
import { reqToGetClientCurrentBatch } from "../../../reduxToolkit/services/assessmentServices";

import Header from "../../../components/header/client/Header";
import Loader from "../../../components/loader/Loader";
import Pagination from "../../../components/pagination/Pagination";
import TableComponent from "./TableComponent";
import TopSearchBar from "../../../components/top-search-bar/TopSearchBar";
import DataNoFound from "../../../components/data-no-found/DataNoFound";
import usePagination from "../../../hooks/usePagination";

const CurrentBatch = () => {
  const dispatch = useDispatch();

  // Selectors
  const assessmentReducer = useSelector((state) => state.assessment);
  const { loader, clientCurrentBatch, clientCurrentBatchPagination } = assessmentReducer;
  const contentManagementReducer = useSelector((state) => state.contentManagement);
  const { sectorDropDown, clientJobRoleDropDown, clientBatchDropDown } = contentManagementReducer;

  // States
  const [modalShow, setModalShow] = useState({ statusShow: false });
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
    setModalShow({ show: false, editShow: false, deleteShow: false, statusShow: false });
  };

  // handleGetCurrentBatch
  const handleGetCurrentBatch = async () => {
    await dispatch(reqToGetClientCurrentBatch({ page: currentPage, limit: itemsPerPage }));
  };

  // Filter Data
  const filterData = useMemo(() => clientCurrentBatch?.filter((item) => {
    return (
      item?._id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.accessorCode?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.firstName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.lastName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.state?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
  }), [clientCurrentBatch, searchTerm]);

  // Get Question Bank Data
  useEffect(() => {
    handleGetCurrentBatch();
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
        <h2 className="manage-question-title">Current Batch</h2>
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
            pagination={clientCurrentBatchPagination}
            filterData={filterData}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </section>
    </>
  );
};

export default CurrentBatch;
