import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const TableComponent = ({ filterData, handleModalShow, currentPage, itemsPerPage, candidatesData }) => {

    // Download PDF function
    const downloadPdf = async (candidateId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/exam/download-pdf/${candidateId}`, {
                method: "GET",
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${candidateId}_exam_report.pdf`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error("Failed to download PDF");
            }
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    // Download Excel function with styled rows
    const downloadExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Candidates Data");

        // Define accessor data (this data will be added to the sheet)
        const accessorData = [
            {
                Batch: '2535868',
                Assessment_Date: '28-06-2024',
                Assessor: 'dummy',
                Job_Role: 'testing'
            }
        ];

        // Add 6 blank rows to shift the header to row 8 (if required)
        for (let i = 0; i < 3; i++) {
            worksheet.addRow([]);
        }


        // Add accessor data at the top of the sheet (this will be displayed before the headers)
        accessorData.forEach((data) => {
            // Adding the four details in four rows with two columns
            const accessorRow1 = worksheet.addRow(["Batch:", data.Batch]);
            const accessorRow2 = worksheet.addRow(["Assessment Date:", data.Assessment_Date]);
            const accessorRow3 = worksheet.addRow(["Assessor:", data.Assessor]);
            const accessorRow4 = worksheet.addRow(["Job Role:", data.Job_Role]);

            // Apply bold font and center alignment for these rows
            [accessorRow1, accessorRow2, accessorRow3, accessorRow4].forEach((row) => {
                row.eachCell((cell) => {
                    cell.font = { bold: true };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF99' } }; // Light yellow background
                });
            });
        });
        

 
        // Define column colors based on column name
        const columnColors = {
            "Candidate Id": "FFFF0000", // Red
            "Candidate Name": "FF00FF00", // Green
            "Contact No.": "FF0000FF", // Blue
            "Email Id": "FFFFA500", // Orange
            "Enrollment No": "FF800080", // Purple
            "Batch Id": "FF00FFFF", // Cyan
            "Job Role Name": "FFFF6347", // Tomato
            "Theory Assessment Date": "FF4682B4", // Steel Blue
            "Practical Assessment Date": "FF32CD32", // Lime Green
            "Viva Assessment Date": "FFD2691E", // Chocolate
            "Theory Marks": "FF8A2BE2", // Blue Violet
            "Practical Marks": "FFFF1493", // Deep Pink
            "Viva Marks": "FFDC143C", // Crimson
            "Total Percentage": "FF7FFF00", // Chartreuse
            "Result": "FFFF00FF" // Fuchsia
        };

        // Define headers with styles (header starts from row 8)
        worksheet.columns = [
            { header: "Candidate Id", key: "id", width: 20 },
            { header: "Candidate Name", key: "name", width: 25 },
            { header: "Contact No.", key: "contact", width: 20 },
            { header: "Email Id", key: "email", width: 30 },
            { header: "Enrollment No", key: "enrollment", width: 20 },
            { header: "Batch Id", key: "batch", width: 20 },
            { header: "Job Role Name", key: "jobRole", width: 25 },
            { header: "Theory Assessment Date", key: "theoryDate", width: 20, style: { numFmt: 'yyyy-mm-dd' } },
            { header: "Practical Assessment Date", key: "practicalDate", width: 20, style: { numFmt: 'yyyy-mm-dd' } },
            { header: "Viva Assessment Date", key: "vivaDate", width: 20, style: { numFmt: 'yyyy-mm-dd' } },
            { header: "Theory Marks", key: "theoryMarks", width: 15 },
            { header: "Practical Marks", key: "practicalMarks", width: 15 },
            { header: "Viva Marks", key: "vivaMarks", width: 15 },
            { header: "Total Percentage", key: "percentage", width: 15 },
            { header: "Result", key: "result", width: 10 }
        ];

        // Apply background color for the header row
        worksheet.getRow(6).eachCell((cell, colNumber) => {
            const headerName = worksheet.getColumn(colNumber).header;
            const color = columnColors[headerName] || "FFFFFF"; // Default to white if no color is found
            cell.font = { bold: true };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: color } };
        });

        // Add subject name and maximum marks rows (starting from row 9)
        const subjectRow = worksheet.addRow([
            "", "", "", "", "", "", "", "", "", "",
            "SGJ/N0101", "SGJ/N0101", "SGJ/N0101", "", ""
        ]);
        subjectRow.eachCell((cell, colNumber) => {
            if ([11, 12, 13].includes(colNumber)) { // Theory, Practical, Viva columns
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFDBE6F1" } // Light blue background for subject row
                };
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
            }
        });

        const maxMarksRow = worksheet.addRow([
            "", "", "", "", "", "", "", "", "", "",
            "MM- 21", "MM- 21", "MM- 21", "", ""
        ]);
        maxMarksRow.eachCell((cell, colNumber) => {
            if ([11, 12, 13].includes(colNumber)) { // Theory, Practical, Viva columns
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFE699" } // Light yellow background for max marks row
                };
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
                cell.font = { bold: true };
            }
        });

        // Merge cells for unused columns in subject and max marks rows
        worksheet.mergeCells(`A9:J9`);
        worksheet.mergeCells(`A10:J10`);
        worksheet.mergeCells(`O9:O10`); // Merge for columns unrelated to marks

        // Add candidate data rows
        candidatesData.forEach((item, index) => {
            const row = worksheet.addRow({
                id: item.candidateId,
                name: item.candidateName,
                contact: item.contactNo,
                email: item.emailId,
                enrollment: item.enrollmentNo,
                batch: item.batchId,
                jobRole: item.jobRoleName,
                theoryDate: item.theoryAssessmentDate ? new Date(item.theoryAssessmentDate) : null,
                practicalDate: item.practicalAssessmentDate ? new Date(item.practicalAssessmentDate) : null,
                vivaDate: item.vivaAssessmentDate ? new Date(item.vivaAssessmentDate) : null,
                theoryMarks: item.theoryMarks || 0,
                practicalMarks: item.practicalMarks || 0,
                vivaMarks: item.vivaMarks || 0,
                percentage: item.totalPercentage || 0,
                result: item.result || "Pass"
            });

            // Apply background colors for candidate data rows
            row.eachCell((cell, colNumber) => {
                const headerName = worksheet.getColumn(colNumber).header;
                const color = columnColors[headerName] || "FFFFFF"; // Default to white if no color is found
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: color }
                };
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
            });
        });

        // Generate buffer and download the file
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), "candidates_data.xlsx");
    };

    return (
        <div>
            <button
                onClick={downloadExcel}
                style={{
                    marginBottom: "10px",
                    padding: "10px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px"
                }}
            >
                Download Excel
            </button>
            <table className="table content-table" id="manage-candidate-table">
                <thead>
                    <tr>
                        <th>Candidate Id</th>
                        <th>Candidate Name</th>
                        <th>Contact No.</th>
                        <th>Email Id</th>
                        <th>Enrollment No</th>
                        <th>Batch Id</th>
                        <th>Job Role Name</th>
                        <th>Theory Assessment Date</th>
                        <th>Practical Assessment Date</th>
                        <th>Viva Assessment Date</th>
                        <th>Theory Marks</th>
                        <th>Practical Marks</th>
                        <th>Viva Marks</th>
                        <th>Total Percentage</th>
                        <th>Result</th>
                        <th>Pdf</th>
                    </tr>
                </thead>
                <tbody>
                    {candidatesData && candidatesData.map((item, index) => {
                        const {
                            batchId,
                            candidateId,
                            candidateName,
                            contactNo,
                            emailId,
                            enrollmentNo,
                            jobRoleName,
                            theoryAssessmentDate,
                            practicalAssessmentDate,
                            vivaAssessmentDate,
                            theoryMarks,
                            practicalMarks,
                            vivaMarks,
                            totalMarks,
                            totalPercentage,
                            result
                        } = item;

                        const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;

                        return (
                            <tr key={candidateId}>
                                <td>{candidateId}</td>
                                <td>{candidateName}</td>
                                <td>{contactNo}</td>
                                <td>{emailId}</td>
                                <td>{enrollmentNo}</td>
                                <td>{batchId}</td>
                                <td>{jobRoleName}</td>
                                <td>{theoryAssessmentDate}</td>
                                <td>{practicalAssessmentDate}</td>
                                <td>{vivaAssessmentDate}</td>
                                <td>{theoryMarks}</td>
                                <td>{practicalMarks}</td>
                                <td>{vivaMarks}</td>
                                <td>{totalMarks}</td>
                                <td>{result}</td>
                                <td>
                                    <button
                                        onClick={() => downloadPdf(candidateId)}
                                        style={{
                                            backgroundColor: "#4CAF50",
                                            color: "white",
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            fontSize: "16px",
                                            transition: "background-color 0.3s ease"
                                        }}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                                        onMouseDown={(e) => (e.target.style.backgroundColor = "#3e8e41")}
                                        onMouseUp={(e) => (e.target.style.backgroundColor = "#45a049")}
                                    >
                                        Download PDF
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
