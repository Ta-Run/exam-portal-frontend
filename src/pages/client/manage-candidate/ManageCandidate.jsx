import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import { SVGICON } from "../../../constants/IconList";
import { reqToGetBatchDropDown, reqToGetClientJobRoleDropDown, reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";
import { reqToDeleteClientManageCandidate, reqToGetClientManageCandidate } from "../../../reduxToolkit/services/userManagementServices";
import { ManageCandidateHeader } from "../../../constants/header";

import Header from "../../../components/header/admin/Header";
import TableComponent from "./TableComponent";
import Pagination from "../../../components/pagination/Pagination";
import Loader from "../../../components/loader/Loader";
import EditManageCandidate from "../../../components/offcanvas/manage-candidate/EditManageCandidate";
import DeleteModal from "../../../components/modal/delete/DeleteModal";
import usePagination from "../../../hooks/usePagination";
import useExportPdf from "../../../hooks/useExportPdf";
import useGeneratePdf from "../../../hooks/useGeneratePdf";
import TopSearchBar from "../../../components/top-search-bar/TopSearchBar";
import DataNoFound from "../../../components/data-no-found/DataNoFound";

const ManageCandidate = () => {
  const dispatch = useDispatch();

  // Selectors
  const { loader, clientManageCandidate, clientManageCandidatePagination } = useSelector((state) => state.userManagement);
  const { sectorDropDown, clientJobRoleDropDown, clientBatchDropDown } = useSelector((state) => state.contentManagement);

  // States
  const [modalShow, setModalShow] = useState({
    editShow: false,
    deleteShow: false,
  });
  const [id, setId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Custom hooks
  const { currentPage, itemsPerPage, setItemsPerPage, paginate } = usePagination();
  const { exportPdfHandler } = useExportPdf("candidate");
  const { tablePrintRef, generatePdf } = useGeneratePdf("candidate");

  // handleModalShow
  const handleModalShow = (type, data = null) => {
    setModalShow({ ...modalShow, [type]: true });
    if (type === "editShow") setEditData(data);
    if (type === "deleteShow") setId(data);
  };

  // handleModalClose
  const handleModalClose = () => {
    setModalShow({ editShow: false, deleteShow: false });
  };

  // handleGetManageCandidate
  const handleGetManageCandidate = async () => {
    await dispatch(reqToGetClientManageCandidate({ page: currentPage, limit: itemsPerPage }));
  }

  // handleDelete
  const handleDelete = async () => {
    await dispatch(reqToDeleteClientManageCandidate(id));
    handleGetManageCandidate();
    handleModalClose();
  };

  // Filter Data
  const filterData = useMemo(() => clientManageCandidate?.filter((item) => {
    return (
      item?._id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.BatchName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.EnrollmentNumber?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.CandidateName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.FatherName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.Email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.Gender?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
  }), [clientManageCandidate, searchTerm]);

  // Get Manage Candidate Data
  useEffect(() => {
    handleGetManageCandidate();
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
      <Header name="User Management" />
      <section className="batch-upload-section">
        <h2 className="manage-question-title">Manage Candidate</h2>
        <div className="batch-upload-add-main">
          <div className="row align-items-end">
            <div className="col-lg-3 mb-lg-0 mb-4">
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
            <div className="col-lg-3 mb-lg-0 mb-4">
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
            <div className="col-lg-3 mb-lg-0 mb-4">
              <div className="sector-selector">
                <label htmlFor="jobRole" className="form-label mb-2">
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
            <button
              type="button"
              className="management-download-btns me-3"
              onClick={exportPdfHandler}
            >
              {SVGICON.PdfSvg}
            </button>
            <CSVLink
              data={filterData || []}
              headers={ManageCandidateHeader}
              filename="candidate.csv"
            >
              <button type="button" className="management-download-btns me-3">
                {SVGICON.listSvg}
              </button>
            </CSVLink>
            <button type="button" className="management-download-btns" onClick={generatePdf}>
              {SVGICON.printerSvg}
            </button>
          </div>
        </div>
        <div className="batch-upload-table">
          <div className="table-responsive" ref={tablePrintRef}>
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
            pagination={clientManageCandidatePagination}
            filterData={filterData}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </section>
      {/* Add Candidate */}
      <EditManageCandidate show={modalShow.editShow} handleClose={handleModalClose} editData={editData} handleGetManageCandidate={handleGetManageCandidate} clientBatchDropDown={clientBatchDropDown} />
      {/* Delete Child User */}
      <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
    </>
  );
};

export default ManageCandidate;
