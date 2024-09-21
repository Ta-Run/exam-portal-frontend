import React from 'react'

const TableComponent = ({ selectAll, filterData, handleSelectAll, selectedItems, handleSelectItem, currentPage, itemsPerPage }) => {

    return (
        <table className="table content-table">
            <thead>
                <tr>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </div>
                    </th>
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
                            Enrollment Number
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Father Name
                        </div>
                    </th>
                    <th>
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
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            DOB
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Aadhar Number
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
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selectedItems?.includes(item?._id)}
                                    onChange={() => handleSelectItem(item?._id)}
                                />
                            </td>
                            <td>
                                <h5 className="table_desc">{serialNumber}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.CandidateName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.EnrollmentNumber}</h5>
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
                            <td>
                                <h5 className="table_desc">{item?.DateOfBirth}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.AadharCard}</h5>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableComponent