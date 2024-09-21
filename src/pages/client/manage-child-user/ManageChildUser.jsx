import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { reqToDeleteClientChildUser, reqToEditStatusClientChildUser, reqToGetClientChildUser, reqToGetSectorDropDown } from "../../../reduxToolkit/services/contentManagementServices";
import { childUserHeader } from "../../../constants/header";

import AddChildUser from "../../../components/offcanvas/child-user/AddChildUser";
import Header from "../../../components/header/client/Header";
import Loader from "../../../components/loader/Loader";
import EditChildUser from "../../../components/offcanvas/child-user/EditChildUser";
import DeleteModal from "../../../components/modal/delete/DeleteModal";
import StatusModal from "../../../components/modal/status/StatusModal";
import Pagination from "../../../components/pagination/Pagination";
import TableComponent from "./TableComponent";
import usePagination from "../../../hooks/usePagination";
import useExportPdf from "../../../hooks/useExportPdf";
import useGeneratePdf from "../../../hooks/useGeneratePdf";
import DataNoFound from "../../../components/data-no-found/DataNoFound";
import TopSearchBar from "../../../components/top-search-bar/TopSearchBar";
import FileDownload from "../../../components/file-download/FileDownload";

const ManageChildUser = () => {
  const dispatch = useDispatch();

  // Selectors
  const { clientChildUser, clientChildUserPagination, loader, sectorDropDown } =
    useSelector((state) => state.contentManagement);

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
  const { exportPdfHandler } = useExportPdf("child-user");
  const { tablePrintRef, generatePdf } = useGeneratePdf("child-user");;

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

  // handleGetChildUser
  const handleGetChildUser = async () => {
    await dispatch(reqToGetClientChildUser({ page: currentPage, limit: itemsPerPage }));
  };

  // handleDelete
  const handleDelete = async () => {
    await dispatch(reqToDeleteClientChildUser(id));
    handleGetChildUser();
    handleModalClose();
  };

  // handleStatusChange
  const handleStatusChange = async () => {
    await dispatch(reqToEditStatusClientChildUser(id));
    handleGetChildUser();
    handleModalClose();
  };

  // Filter Data
  const filterData = useMemo(() => clientChildUser?.filter((item) => {
    return (
      item?._id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.firstName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.lastName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.contactNo?.includes(searchTerm) ||
      item?.emailId?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      item?.address?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
  }), [clientChildUser, searchTerm]);

  // Get Child User Data
  useEffect(() => {
    handleGetChildUser();
  }, [dispatch, currentPage, itemsPerPage]);

  // Get Sector Dropdown
  useEffect(() => {
    dispatch(reqToGetSectorDropDown());
  }, []);

  return (
    <>
      {loader && (<Loader />)}
      <Header name="Content Management" />
      <section className="content-management-section">
        <h2 className="content-management-title">Manage Child User</h2>
        <div className="content-management-body">
          <div className="content-management-filters">
            <TopSearchBar
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <FileDownload
            handleModalShow={handleModalShow}
            exportPdfHandler={exportPdfHandler}
            filterData={filterData}
            generatePdf={generatePdf}
            headers={childUserHeader}
            fileName="child-user.csv"
          />
        </div>
        <div className="content-management-table">
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
            pagination={clientChildUserPagination}
            filterData={filterData}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </section>
      {/* Add Child User */}
      <AddChildUser show={modalShow.show} handleClose={handleModalClose} sectorDropDown={sectorDropDown}
        handleGetChildUser={handleGetChildUser} />
      {/* Edit Child User */}
      <EditChildUser show={modalShow.editShow} handleClose={handleModalClose} editData={editData} sectorDropDown={sectorDropDown} handleGetChildUser={handleGetChildUser} />
      {/* Delete Child User */}
      <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
      {/* Status Change */}
      <StatusModal show={modalShow.statusShow} handleClose={handleModalClose} handleStatusChange={handleStatusChange} />
    </>
  );
};

export default ManageChildUser;
