import React from 'react'
import { SVGICON } from '../../../constants/IconList'

const TableComponent = ({ filterData, handleModalShow, currentPage, itemsPerPage,reportData }) => {

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
                            BatchNo
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Sector
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            JobRole
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Scheme
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Assessment Start Date
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Assessment End Date
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Center Address
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Training Partner
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Contact Person
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Theory Question Bank
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Practical Question Bank
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Viva Question Bank
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Artificial Intelligence
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Assessor Name
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Assessor MobileNo
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Assessor Email
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Tech Support Name
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Tech Support MobileNo
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Tech Support Email
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            District
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            State
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Batch Size
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Enrolled Candidate
                        </div>
                    </th>
                    <th>
                        <div className="d-flex align-items-center justify-content-center">
                            Theory Complete
                        </div>
                    </th>
                </tr>
            </thead>
             <tbody>
                {reportData&&reportData?.map((item, index) => {
                    
                      const {BatchCode,EndDate,StartDate,TotalCandidate,TrainingCenterName,TrainingPartnerName,batchStatus,district,state,name} = item
                    const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                    return (
                        <tr key={item?._id}>
                            <td>
                                <h5 className="table_desc">{serialNumber}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{BatchCode}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{name}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{StartDate}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{EndDate}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{TrainingCenterName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{TrainingPartnerName}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{district}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{state}</h5>
                            </td>
                            <td>
                                <h5 className="table_desc">{TotalCandidate}</h5>
                            </td><td>
                                <h5 className="table_desc"></h5>
                            </td>
                            <td>
                                <h5 className="table_desc"></h5>
                            </td>

                            
                        </tr>
                    )
                })}
            </tbody> 
        </table>
    )
}

export default TableComponent