import React from 'react'
import { SVGICON } from '../../../constants/IconList'

const TableComponent = ({ handleModalShow, filterData, currentPage, itemsPerPage }) => {
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
                            Assigned Sector Name
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Job Role Name
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Job Role Type
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Job Role Code
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Total Marks
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Total Theory Marks
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Total P&V Marks
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Passing Percentage
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
                                <h5 className="table_desc">{item?.assginedSectorsName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.jobRoleName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.jobRoleType}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.jobRoleCode}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.totalMarks}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.totalTheoryMarks}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.totalPandVMarks}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.passingPercentage}</h5>
                            </td>
                            <td>
                                <button type="button" className={`${item?.status === "Active" ? "active-sector" : "inActive-sector"}`} onClick={() => handleModalShow("statusShow", item?._id)}>
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