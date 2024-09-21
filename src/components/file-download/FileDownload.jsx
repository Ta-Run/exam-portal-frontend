import React from 'react'
import { SVGICON } from '../../constants/IconList'
import { CSVLink } from "react-csv";

const FileDownload = ({ handleModalShow, exportPdfHandler, filterData, generatePdf, fileName, headers }) => {
    return (
        <div className="content-management-downloads">
            <button
                type="button"
                className="management-add me-3"
                onClick={() => handleModalShow("show")}
            >
                + Add New
            </button>
            <button
                type="button"
                className="management-download-btns me-3"
                onClick={exportPdfHandler}
            >
                {SVGICON.PdfSvg}
            </button>
            <CSVLink data={filterData || []} headers={headers} filename={fileName}>
                <button
                    type="button"
                    className="management-download-btns me-3">
                    {SVGICON.listSvg}
                </button>
            </CSVLink>
            <button
                type="button"
                className="management-download-btns"
                onClick={generatePdf}
            >
                {SVGICON.printerSvg}
            </button>
        </div>
    )
}

export default FileDownload