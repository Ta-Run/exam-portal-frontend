import React from 'react'
import { SVGICON } from '../../../constants/IconList'

const TableComponent = ({ filterData, handleModalShow, currentPage, itemsPerPage }) => {
    return (
        <table className="table content-table" id='export-pdf-table'>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            S.No
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Assessor Code
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Assessor Name
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Email ID
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Mobile NO
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            State
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            District
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Status
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Action
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {filterData?.map((item, index) => {
                    const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;

                    return (
                        <tr key={item?._id} >
                            <td>
                                <h5 className="table_desc">{serialNumber}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.accessorCode}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.firstName} {item?.lastName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.email}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.mobileNo}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.state}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.district}</h5>
                            </td>
                            <td>
                                <button type="button" className={`${item?.status === "Active" ? "active-que" : "inActive-que"}`} onClick={() => handleModalShow("statusShow", item?._id)}>
                                    {item?.status}
                                </button>
                            </td>
                            <td>
                                <div className="table_icons">
                                    <button type="button" className="table-btn me-3" onClick={() => handleModalShow("editShow", item)}>
                                        {SVGICON.editSvg}
                                    </button>
                                    <button type="button" className="table-btn" onClick={() => handleModalShow("deleteShow", item?._id)}>
                                        {SVGICON.deleteSvg}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableComponent