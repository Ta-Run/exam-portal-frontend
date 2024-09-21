import React from "react";

const TableComponent = ({ filterData, handleModalShow, currentPage, itemsPerPage }) => {
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
              Batch Code
              {/* {SVGICON.sortIcon} */}
            </div>
          </th>
          <th>
            <div className="d-flex align-items-center justify-content-center">
              TPName
              {/* {SVGICON.sortIcon} */}
            </div>
          </th>
          <th>
            <div className="d-flex align-items-center justify-content-center">
              TCenter
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
              Start Date
              {/* {SVGICON.sortIcon} */}
            </div>
          </th>
          <th>
            <div className="d-flex align-items-center justify-content-center">
              End Date
              {/* {SVGICON.sortIcon} */}
            </div>
          </th>
          <th>
            <div className="d-flex align-items-center justify-content-center">
              Status
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
                <h5 className="table_desc">{item?.BatchCode}</h5>
              </td>
              <td>
                <h5 className="table_desc">{item?.TrainingPartnerName}</h5>
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
                <button
                  type="button"
                  className={`${item?.status === "Active" ? "active-que" : "inActive-que"
                    }`}
                  onClick={() => handleModalShow("statusShow", item?._id)}
                >
                  {item?.status}
                </button>
              </td>
              {/* <td>
              <div className="table_icons">
                <button
                  type="button"
                  className="table-btn me-3"
                  onClick={() => handleModalShow("editShow", item)}
                >
                  {SVGICON.editSvg}
                </button>
                <button
                  type="button"
                  className="table-btn"
                  onClick={() => handleModalShow("deleteShow", item?._id)}
                >
                  {SVGICON.deleteSvg}
                </button>
              </div>
            </td> */}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
