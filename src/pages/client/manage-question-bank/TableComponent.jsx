import React, { useEffect, useState } from 'react'
import { SVGICON } from '../../../constants/IconList'
import { Link } from 'react-router-dom'

const TableComponent = ({ filterData, handleModalShow, currentPage, itemsPerPage }) => {

    const [roleType, setRoleType] = useState("");

    useEffect(() => {
        const pathName = window.location.pathname;
        if (pathName.includes("client")) {
            setRoleType("client");
        } else if (pathName.includes("spoc-person")) {
            setRoleType("spoc-person");
        } else if (pathName.includes("child-user")) {
            setRoleType("child-user");
        } else if (pathName.includes("assessor")) {
            setRoleType("assessor");
        }
    }, [])

    return (
        <table className="table content-table">
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
                            Job Role Id
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
                            Type
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Question Bank Name
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            View Question
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
                        <tr key={item?._id}>
                            <td>
                                <h5 className="table_desc">{serialNumber}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.assginedSectorsName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.jobRoleId}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.jobRoleName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.type}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.questionBankName}</h5>
                            </td>
                            <td>
                                <Link to={`/${roleType}/question/${item?._id}`} type="button" className="view-que">
                                    {SVGICON.shapSvg} Question
                                </Link>
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