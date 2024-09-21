import React, { useState } from 'react'

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
                            State
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            District
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            TCName
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            TPEmail
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Start Time
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            End Time
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
                                <h5 className="table_desc">{item?.state}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.district}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.TrainingCenterName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.TrainingPartnerEmail}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.startTime}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.endTime}</h5>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableComponent