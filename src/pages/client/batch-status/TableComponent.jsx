import React from 'react'
import { SVGICON } from '../../../constants/IconList'

const TableComponent = ({ filterData, handleModalShow, currentPage, itemsPerPage }) => {

    return (
        <table className="table content-table" id='manage-candidate-table'>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            S.No
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Candidate Name
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Candidate Enrollment No
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Theory
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Practical
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Viva
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Theory Photo
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            UID Photo
                        </div>
                    </th>
                </tr>
            </thead>
            {/* <tbody>
                {filterData?.map((item, index) => {
                    const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                    return (
                        <tr key={item?._id}>
                            <td>
                                <h5 className="table_desc">{serialNumber}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.BatchCode}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.TrainingCenterName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.state}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.district}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.StartDate}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.EndDate}</h5>
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
            </tbody> */}
        </table>
    )
}

export default TableComponent