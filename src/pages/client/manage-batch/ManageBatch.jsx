import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import { SVGICON } from "../../../constants/IconList";
import { reqToGetBatchDropDown, reqToGetClientJobRoleDropDown, reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";
import { reqToDeleteClientManageBatch, reqToGetClientManageBatch } from "../../../reduxToolkit/services/assessmentServices";
import { ManageBatchHeader } from "../../../constants/header";

import Header from "../../../components/header/admin/Header";
import TableComponent from "./TableComponent";
import Pagination from "../../../components/pagination/Pagination";
import Loader from "../../../components/loader/Loader";
import DeleteModal from "../../../components/modal/delete/DeleteModal";
import AddManageBatch from "../../../components/offcanvas/manage-batch/AddManageBatch";
import EditManageBatch from './../../../components/offcanvas/manage-batch/EditManageBatch';
import usePagination from "../../../hooks/usePagination";
import DataNoFound from "../../../components/data-no-found/DataNoFound";
import TopSearchBar from "../../../components/top-search-bar/TopSearchBar";

const ManageBatch = () => {
  const dispatch = useDispatch();

  // Selectors
  const { loader, clientManageBatch, clientManageBatchPagination } = useSelector((state) => state.assessment);
  const { sectorDropDown, clientJobRoleDropDown, clientBatchDropDown } = useSelector((state) => state.contentManagement);

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

  // Custom hooks
  const { currentPage, itemsPerPage, setItemsPerPage, paginate } = usePagination();

  // handleModalShow
  const handleModalShow = (type, data = null) => {
    setModalShow({ ...modalShow, [type]: true });
    if (type === "editShow") setEditData(data);
    if (type === "deleteShow") setId(data);
  };

  // handleModalClose
  const handleModalClose = () => {
    setModalShow({ show: false, editShow: false, deleteShow: false, });
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
      {loader && <Loader />}
      <Header name="Assessment" />
      <section className="batch-upload-section">
        <h2 className="manage-question-title">Manage Batch</h2>
        <div className="batch-upload-add-main">
          <button
            type="button"
            className="management-add me-3"
            onClick={() => handleModalShow("show")}
          >
            + Add New
          </button>
          <hr />
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
            <div className="col-lg-2 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="Batch" className="form-label mb-2">
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
            <div className="col-lg-2 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="State" className="form-label mb-2">
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
            <div className="col-lg-2 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="District" className="form-label mb-2">
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
        <div className="batch-upload-body">
          <div className="batch-upload-filters">
            <TopSearchBar
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className="content-management-downloads">
            <CSVLink
              data={filterData || []}
              headers={ManageBatchHeader}
              filename="bacth.csv"
            >
              <button type="button" className="management-download-btns me-3">
                {SVGICON.listSvg}
              </button>
            </CSVLink>
          </div>
        </div>
        <div className="batch-upload-table">
          <div className="table-responsive" ref={contentPdf}>
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
            pagination={clientManageBatchPagination}
            filterData={filterData}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </section>
      {/* Add Manage batch */}
      <AddManageBatch show={modalShow.show} handleClose={handleModalClose} sectorDropDown={sectorDropDown}
        clientJobRoleDropDown={clientJobRoleDropDown} handleGetManageBatch={handleGetManageBatch} />
      {/* Edit Manage batch */}
      <EditManageBatch show={modalShow.editShow} editData={editData} handleClose={handleModalClose}
        sectorDropDown={sectorDropDown} clientJobRoleDropDown={clientJobRoleDropDown} handleGetManageBatch={handleGetManageBatch} />
      {/* Delete batch */}
      <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
    </>
  );
};

export default ManageBatch;