import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import { reqToDeleteClientAssessor, reqToEditStatusClientAssessor, reqToGetClientAssessor } from "../../../reduxToolkit/services/userManagementServices";
import { reqToGetClientJobRoleDropDown, reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";
import { childAssessorHeader } from "../../../constants/header";

import Header from "../../../components/header/client/Header";
import Loader from "../../../components/loader/Loader";
import DeleteModal from "../../../components/modal/delete/DeleteModal";
import StatusModal from "../../../components/modal/status/StatusModal";
import Pagination from "../../../components/pagination/Pagination";
import TableComponent from "./TableComponent";
import AddAssessor from "./../../../components/offcanvas/manage-assessor/AddAssessor";
import EditAssessor from "../../../components/offcanvas/manage-assessor/EditAssessor";
import usePagination from "../../../hooks/usePagination";
import useExportPdf from "../../../hooks/useExportPdf";
import useGeneratePdf from "../../../hooks/useGeneratePdf";
import TopSearchBar from "../../../components/top-search-bar/TopSearchBar";
import DataNoFound from "../../../components/data-no-found/DataNoFound";
import { SVGICON } from "../../../constants/IconList";

const ManageAssessor = () => {
  const dispatch = useDispatch();

  // Selectors
  const { loader, clientAssessor, clientAssessorPagination } = useSelector((state) => state.userManagement);
  const { sectorDropDown, clientJobRoleDropDown } = useSelector((state) => state.contentManagement);

  // States
  const [modalShow, setModalShow] = useState({
    show: false,
    editShow: false,
    deleteShow: false,
    statusShow: false,
  });
  const [id, setId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Custom hooks
  const { currentPage, itemsPerPage, setItemsPerPage, paginate } = usePagination();
  const { exportPdfHandler } = useExportPdf("assessor");
  const { tablePrintRef, generatePdf } = useGeneratePdf("assessor");

  // handleModalShow
  const handleModalShow = (type, data = null) => {
    setModalShow({ ...modalShow, [type]: true });
    if (type === "editShow") setEditData(data);
    if (type === "deleteShow" || type === "statusShow") setId(data);
  };

  // handleModalClose
  const handleModalClose = () => {
    setModalShow({ show: false, editShow: false, deleteShow: false, statusShow: false });
  };

  // handleGetAssessor
  const handleGetAssessor = async () => {
    await dispatch(reqToGetClientAssessor({ page: currentPage, limit: itemsPerPage }));
  };

  // handleDelete
  const handleDelete = async () => {
    await dispatch(reqToDeleteClientAssessor(id));
    handleGetAssessor();
    handleModalClose();
  };

  // handleStatusChange
  const handleStatusChange = async () => {
    await dispatch(reqToEditStatusClientAssessor(id));
    handleGetAssessor();
    handleModalClose();
  };

  // Filter Data
  const filterData = useMemo(() => clientAssessor?.filter((item) => {
    return (
      item?._id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.accessorCode
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase()) ||
      item?.firstName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.lastName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.state?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
  }), [clientAssessor, searchTerm]);

  // Get Question Bank Data
  useEffect(() => {
    handleGetAssessor();
  }, [dispatch, currentPage, itemsPerPage]);

  // Get Sector & Job Role Dropdown
  useEffect(() => {
    dispatch(reqToGetSectorDropDown());
    dispatch(reqToGetClientJobRoleDropDown());
  }, []);

  return (
    <>
      {loader && <Loader />}
      <Header name="User Management" />
      <section className="manage-question-section">
        <h2 className="manage-question-title">Manage Assessor</h2>
        <div className="manage-question-add-main">
          <button
            type="button"
            className="management-add me-3"
            onClick={() => handleModalShow("show")}
          >
            + Add New
          </button>
          <hr />
          <div className="row">
            <div className="col-lg-4">
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
            <div className="col-lg-4">
              <div className="sector-selector ms-lg-4 ms-0 mt-lg-0 mt-4">
                <label htmlFor="jobRole" className="form-label mb-2">
                  State
                </label>
                <select className="form-select">
                  <option value="1">All</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
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
              headers={childAssessorHeader}
              filename="assessor.csv"
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
        <div className="manage-question-table">
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
            pagination={clientAssessorPagination}
            filterData={filterData}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </section>
      {/* Add Assessor Bank */}
      <AddAssessor show={modalShow.show} handleClose={handleModalClose} sectorDropDown={sectorDropDown} clientJobRoleDropDown={clientJobRoleDropDown} handleGetAssessor={handleGetAssessor} />
      {/* Edit Assessor Bank */}
      <EditAssessor show={modalShow.editShow} handleClose={handleModalClose} sectorDropDown={sectorDropDown}
        clientJobRoleDropDown={clientJobRoleDropDown} handleGetAssessor={handleGetAssessor} editData={editData} />
      {/* Delete Assessor Bank */}
      <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
      {/* Status Change */}
      <StatusModal show={modalShow.statusShow} handleClose={handleModalClose} handleStatusChange={handleStatusChange} />
    </>
  );
};

export default ManageAssessor;
