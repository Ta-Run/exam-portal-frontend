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
                            Question Bank Name
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            NOS
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Question
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Options
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Correct Ans
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Question Marks
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Difficulty
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    {/* <th>
                        <div className="d-flex align-items-center">
                            Status
                            {SVGICON.sortIcon}
                        </div>
                    </th> */}
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
                                <h5 className="table_desc">{item?.questionBankName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.nosName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.question}</h5>
                            </td>
                            {
                                item?.optionA && item?.optionB && item?.optionC && item?.optionD ? (
                                    <td>
                                        <h5 className="table_desc">1. {item?.optionA}</h5>
                                        <h5 className="table_desc">2. {item?.optionB}</h5>
                                        <h5 className="table_desc">3. {item?.optionC}</h5>
                                        <h5 className="table_desc">4. {item?.optionD}</h5>
                                    </td>
                                ) :
                                    <td> - </td>
                            }
                            <td>
                                <h5 className="table_desc">{item?.writeOption}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.questionMarks}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.difficultyLevel}</h5>
                            </td>
                            {/* <td>
                            <button type="button" className={`${item?.status === "Active" ? "active-que" : "inActive-que"}`} >
                                {item?.status}
                            </button>
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