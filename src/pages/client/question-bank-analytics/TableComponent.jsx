import React from 'react'
import { SVGICON } from '../../../constants/IconList'

const TableComponent = ({  currentPage, itemsPerPage, questionData }) => {
    console.log(questionData)
    return (
        <table className="table content-table" id='client-sector-table'>
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
                            Question
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Option
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Total Attempts
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Correct Attempts
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Pass %
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Fail %
                            {/* {SVGICON.sortIcon} */}
                        </div>
                    </th>
                </tr>
            </thead>
            {/* <tbody>

                {
                    questionData && questionData.map((data)=>{
                        console.log(data.questionsData)
                    })
                }
            </tbody> */}
            <tbody>
                {questionData && questionData.map((item, index) => {
                    // console.log(item.questionsData.optionA)
                    // console.log(item.questionsData.optionB)
                    // const questionsOp={
                    // questionsData.question.Optio
                    // }
                    const { optionA, optionB, optionC, optionD } = item.questionsData
                    const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;

                    return (
                        <tr key={item?._id} >
                            <td>
                                <h5 className="table_desc">{serialNumber}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.questionsData.question}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">
                                    <ol>
                                    <li>{optionA}</li>
                                
                                <li>{optionB}</li>
                                <li>{optionC}</li>
                                <li>{optionD}</li>
                                </ol>
                                
                                </h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.emailId}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.password}</h5>
                            </td>
                            <td>
                                {
                                    item?.assginedSectorsNames?.map((item, index) =>
                                        <h5 className="table_desc" key={index}>{item}</h5>
                                    )
                                }
                            </td>
                            <td>
                                <h5 className="table_desc">{item?.clientName}</h5>
                            </td>
                            {/* <td>
                                <button type="button" className={`${item?.status === "Active" ? "active-sector" : "inActive-sector"}`} onClick={() => handleModalShow("statusShow", item?._id)}>
                                    {item?.status}
                                </button>
                            </td> */}
                            {/* <td>
                                <div className="table_icons">
                                    <button type="button" className="table-btn me-3" onClick={() => handleModalShow("editShow", item)}>
                                        {SVGICON.editSvg}
                                    </button>
                                    <button type="button" className="table-btn" onClick={() => handleModalShow("deleteShow", item?._id)}>
                                        {SVGICON.deleteSvg}
                                    </button>
                                </div>
                            </td> */}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableComponent