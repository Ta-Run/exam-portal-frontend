
// **********************  Admin **********************

//? Manage Sector

export const sectorHeader = [
    { label: "Name", key: 'name' },
    { label: "Type", key: 'type' },
    { label: "CreateAt", key: 'createdAt' },
    { label: "Status", key: 'status' }
]

//? Manage Clients

export const clientsHeader = [
    { label: "Client Name", key: 'clientName' },
    { label: "Client Email", key: 'clientEmail' },
    { label: "Password", key: 'password' },
    { label: "Company Name", key: 'companyName' },
    { label: "Assigned Sector Name", key: 'assginedSectorsName' },
    { label: "Status", key: 'status' }
]

// **********************  Clients **********************

//? Manage SPOC Person

export const spocPersonHeader = [
    { label: "Spoc Person Name", key: 'spocPersonName' },
    { label: "Contact Number", key: 'contactNo' },
    { label: "Email", key: 'emailId' },
    { label: "Password", key: 'password' },
    { label: "Assigned Sector Name", key: 'assginedSectorsNames' },
    { label: "Client Name", key: 'clientName' },
    { label: "Status", key: 'status' },
]

//? Manage Job Role

export const jobRoleHeader = [
    { label: "Assigned Sector Name", key: 'assginedSectorsName' },
    { label: "Job Role Name", key: 'jobRoleName' },
    { label: "Job Role Type", key: 'jobRoleType' },
    { label: "Job Role Code", key: 'jobRoleCode' },
    { label: "Total Marks", key: 'totalMarks' },
    { label: "Total Theory Marks", key: 'totalTheoryMarks' },
    { label: "Total P&V Marks", key: 'totalPandVMarks' },
    { label: "Passing Percentage", key: 'passingPercentage' },
    { label: "Status", key: 'status' },
]

//? Manage Nos

export const nosHeader = [
    { label: "Assigned Sector Name", key: 'assginedSectorsName' },
    { label: "Job Role", key: 'jobRoleName' },
    { label: "NOS Name", key: 'nosName' },
    { label: "NOS Code", key: 'nosCode' },
    { label: "Total Theory Marks", key: 'totalTheoryMarks' },
    { label: "Total Viva Marks", key: 'totalVivaMarks' },
    { label: "Passing Practical Marks", key: 'totalPracticalMarks' },
]

//? Manage Scheme

export const schemeHeader = [
    { label: "Assigned Sector Id", key: 'assginedSectorsId' },
    { label: "Assigned Sector Name", key: 'assginedSectorsName' },
    { label: "Scheme Name", key: 'schemeName' },
    { label: "Status", key: 'status' },
]

//? Manage Question

export const questionHeader = [
    { label: "questionBankId", key: 'questionBankId' },
    { label: "questionBankName", key: 'questionBankName' },
    { label: "nosName", key: 'nosName' },
    { label: "difficultyLevel", key: 'difficultyLevel' },
    { label: "questionMarks", key: 'questionMarks' },
    { label: "questionType", key: 'questionType' },
    { label: "question", key: 'question' },
    { label: "attatchment", key: 'attatchment' },
    { label: "optionA", key: 'optionA' },
    { label: "optionAAttatchment", key: 'optionAAttatchment' },
    { label: "optionB", key: 'optionB' },
    { label: "optionBAttatchment", key: 'optionBAttatchment' },
    { label: "optionC", key: 'optionC' },
    { label: "optionCAttatchment", key: 'optionCAttatchment' },
    { label: "optionD", key: 'optionD' },
    { label: "optionDAttatchment", key: 'optionDAttatchment' },
    { label: "writeOption", key: 'writeOption' },
]

//? Manage Child user

export const childUserHeader = [
    { label: "First Name", key: 'firstName' },
    { label: "Last Name", key: 'lastName' },
    { label: "Contact No", key: 'contactNo' },
    { label: "Email ID", key: 'emailId' },
    { label: "Address", key: 'address' },
    { label: "Select Sector Permission Name", key: 'selectSectorPermissionName' },
    { label: "Status", key: 'status' },
]

//? Manage Assessor

export const childAssessorHeader = [
    { label: "Assessor Code", key: 'accessorCode' },
    { label: "Assessor Name", key: 'firstName' },
    { label: "Email ID", key: 'email' },
    { label: "Mobile NO", key: 'mobileNo' },
    { label: "State", key: 'state' },
    { label: "District", key: 'district' },
    { label: "Status", key: 'status' },
]

//? Candidate Bulk Upload

export const candidateBulkUploadHeader = [
    { label: "CandidateName", key: 'CandidateName' },
    { label: "EnrollmentNumber", key: 'EnrollmentNumber' },
    { label: "ContactNumber", key: 'ContactNumber' },
    { label: "FatherName", key: 'FatherName' },
    { label: "Email", key: 'Email' },
    { label: "Gender", key: 'Gender' },
    { label: "DateOfBirth", key: 'DateOfBirth' },
    { label: "AadharCard", key: 'AadharCard' },
    { label: "sector", key: 'sector' },
    { label: "jobRole", key: 'jobRole' },
    { label: "Batch", key: 'Batch' },
]

//? Manage Candidate

export const ManageCandidateHeader = [
    { label: "Enrollment Number", key: 'EnrollmentNumber' },
    { label: "Candidate Name", key: 'CandidateName' },
    { label: "Father Name", key: 'FatherName' },
    { label: "ContactNo", key: 'ContactNumber' },
    { label: "Email", key: 'Email' },
    { label: "Gender", key: 'Gender' },
]

//? Batch Upload

export const candidateBatchUploadHeader = [
    { label: "state", key: 'state' },
    { label: "district", key: 'district' },
    { label: "jobRoleId", key: 'jobRoleId' },
    { label: "assginedSectorsId", key: 'assginedSectorsId' },
    { label: "TrainingCenterName", key: 'TrainingCenterName' },
    { label: "TrainingPartnerEmail", key: 'TrainingPartnerEmail' },
    { label: "startTime", key: 'startTime' },
    { label: "endTime", key: 'endTime' },
    { label: "startDate", key: 'startDate' },
    { label: "endDate", key: 'endDate' },
    { label: "TotalCandidate", key: 'TotalCandidate' },
    { label: "BatchCode", key: 'BatchCode' },
    { label: "photo", key: 'photo' },
    { label: "video", key: 'video' },
]

//? Manage Batch

export const ManageBatchHeader = [
    { label: "Batch Code", key: 'BatchCode' },
    { label: "TCenter", key: 'TrainingCenterName' },
    { label: "State", key: 'state' },
    { label: "District", key: 'district' },
    { label: "Start Date", key: 'StartDate' },
    { label: "End Date", key: 'EndDate' },
]