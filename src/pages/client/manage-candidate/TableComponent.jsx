import React from 'react'
import { SVGICON } from '../../../constants/IconList'
import { IMAGE_URL } from '../../../config'

const TableComponent = ({ filterData, handleModalShow, currentPage, itemsPerPage }) => {
    return (
        <table className="table content-table" id='export-pdf-table'>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            S.No
                        </div>
                    </th>
                    {/* <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Batch Name
                        </div>
                    </th> */}
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Enrollment Number
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Candidate Name
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Father Name
                        </div>
                    </th>
                    <th scope="col">
                        <div className="d-flex align-items-center justify-content-center">
                            ContactNo
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Email
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Gender
                        </div>
                    </th>
                    {/* <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Profile pic
                        </div>
                    </th> */}
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Action
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {filterData?.map((item, index) => {
                    const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;

                    return (
                        <tr key={item?._id}>
                            <td>
                                <h5 className="table_desc">{serialNumber}</h5>
                            </td>
                            {/* <td>
                                <h5 className="table_desc">{item?.BatchName}</h5>
                            </td> */}
                            <td>
                                <h5 className="table_desc">{item?.EnrollmentNumber}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.CandidateName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.FatherName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.ContactNumber}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.Email}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.Gender}</h5>
                            </td>
                            {/* <td>
                                <img src={`${IMAGE_URL}${item?.ProfilePicture}`} height={40} alt="profile-img" />
                            </td> */}
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