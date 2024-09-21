import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from "react-csv";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import { SVGICON } from "../../../constants/IconList";
import { reqToDeleteClientQuestion, reqToGetClientQuestion, reqToGetNosDropDown } from "../../../reduxToolkit/services/contentManagementServices";

import "./ManageQuestion.scss";
import AddQuestion from './../../../components/offcanvas/add-question/AddQuestion';
import Header from "../../../components/header/admin/Header";
import TableComponent from "./TableComponent";
import DeleteModal from "../../../components/modal/delete/DeleteModal";
import Pagination from "../../../components/pagination/Pagination";
import { questionHeader } from "../../../constants/header";
import EditQuestion from "../../../components/offcanvas/add-question/EditQuestion";
import Loader from "../../../components/loader/Loader";
import QuestionBulkUpload from "../../../components/modal/client/question-bulk-upload/QuestionBulkUpload";
import usePagination from "../../../hooks/usePagination";
import useExportPdf from "../../../hooks/useExportPdf";
import useGeneratePdf from "../../../hooks/useGeneratePdf";
import DataNoFound from "../../../components/data-no-found/DataNoFound";
import TopSearchBar from "../../../components/top-search-bar/TopSearchBar";

const ManageQuestion = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    // Selectors
    const { clientQuestion, clientQuestionPagination, loader, clientNosDropDown } = useSelector((state) => state.contentManagement);

    // States
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState({
        show: false,
        editShow: false,
        deleteShow: false,
        statusShow: false
    })
    const [dataId, setDataId] = useState(null);
    const [editData, setEditData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    // Custom hooks
    const { currentPage, itemsPerPage, setItemsPerPage, paginate } = usePagination();
    const { exportPdfHandler } = useExportPdf("question");
    const { tablePrintRef, generatePdf } = useGeneratePdf("question");

    // handleModalShow
    const handleModalShow = (type, data = null) => {
        setModalShow({ ...modalShow, [type]: true });
        if (type === 'editShow') setEditData(data);
        if (type === 'deleteShow' || type === 'statusShow') setDataId(data);
    };

    // handleClose
    const handleClose = () => setShow(false);
    // handleShow
    const handleShow = () => setShow(true);

    // handleModalClose
    const handleModalClose = () => {
        setModalShow({ show: false, editShow: false, deleteShow: false, statusShow: false });
    };

    // handleGetQuestion
    const handleGetQuestion = async () => {
        await dispatch(reqToGetClientQuestion({ id: id, page: currentPage, limit: itemsPerPage }));
    }

    // handleDelete
    const handleDelete = async () => {
        await dispatch(reqToDeleteClientQuestion(dataId));
        handleGetQuestion();
        handleModalClose();
    }

    // Filter Data
    const filterData = useMemo(() => clientQuestion?.filter((item) => {
        return (
            item?.questionBankId?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.questionBankName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.nosName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.difficultyLevel?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.questionMarks?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            item?.question?.toLowerCase()?.includes(searchTerm.toLowerCase())
        )
    }), [clientQuestion, searchTerm]);

    // Get Question Data
    useEffect(() => {
        handleGetQuestion();
    }, [currentPage, itemsPerPage])

    // Get Nos Dropdown
    useEffect(() => {
        dispatch(reqToGetNosDropDown());
    }, [])

    return (
        <>
            {loader && <Loader />}
            <Header name="Content Management" />
            <section className="manage-child-section">
                <h2 className="manage-child-title">Manage Question Bank</h2>
                <div className="manage-child-body">
                    <div className="content-management-filters">
                        <TopSearchBar
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    </div>
                    <div className="manage-child-downloads">
                        <div className="manage-child-downloads-header">
                            <button
                                type="button"
                                className="management-add me-3"
                                onClick={() => handleModalShow("show")}
                            >
                                + Add New
                            </button>
                            <button type="button" className="management-upload-btn me-3" onClick={handleShow}>
                                {SVGICON.uploadSvg} Bulk Upload
                            </button>
                        </div>
                        <div className="management-icon-wrapper">
                            {/* <select className="form-select me-3">
                                <option value="1">English</option>
                                <option value="2">Hindi</option>
                                <option value="3">Spanish</option>
                            </select> */}
                            <button type="button" className="management-download-btns me-3" onClick={exportPdfHandler}>
                                {SVGICON.PdfSvg}
                            </button>
                            <CSVLink data={filterData || []} headers={questionHeader} filename='question.csv'>
                                <button
                                    type="button"
                                    className="management-download-btns me-3">
                                    {SVGICON.listSvg}
                                </button>
                            </CSVLink>
                            <button type="button" className="management-download-btns" onClick={generatePdf}>
                                {SVGICON.printerSvg}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="manage-child-table">
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
                        pagination={clientQuestionPagination}
                        filterData={filterData}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                )}
            </section>
            {/* Add Question */}
            <AddQuestion show={modalShow.show} handleClose={handleModalClose} handleGetQuestion={handleGetQuestion} clientNosDropDown={clientNosDropDown} id={id} />
            {/* Edit Question */}
            <EditQuestion show={modalShow.editShow} handleClose={handleModalClose} handleGetQuestion={handleGetQuestion} clientNosDropDown={clientNosDropDown} editData={editData} />
            {/* Delete Questionf */}
            <DeleteModal show={modalShow.deleteShow} handleClose={handleModalClose} handleDelete={handleDelete} />
            {/* Modal */}
            <QuestionBulkUpload
                show={show}
                id={id}
                handleClose={handleClose}
                handleShow={handleShow}
                handleGetQuestion={handleGetQuestion}
            />
        </>
    );
};

export default ManageQuestion;
