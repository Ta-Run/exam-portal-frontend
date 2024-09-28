export const apiendpoints = {

    //? ***************** Admin *****************

    // Auth

    login: "/admin/login",
    logOut: "/admin/logout",

    // Content Management

    getSector: "/sector",
    addSector: "/sector-add",
    editSector: "/sector/:id",
    deleteSector: "/sector-remove/:id",
    editStatusSector: "/sector-status/:id",

    //? ***************** Client *****************

    getClient: "/client",
    addClient: "/client-add",
    editClient: "/client/:id",
    deleteClient: "/client-remove/:id",
    editStatusClient: "/client-status/:id",


    getSpocPerson: "/spoc-person",
    addSpocPerson: "/spoc-person/add",
    editSpocPerson: "/spoc-person/:id",
    deleteSpocPerson: "/spoc-person/remove/:id",
    editStatusSpocPerson: "/spoc-person/status/:id",


    getClientJobRole: "/job-role",
    addClientJobRole: "/job-role/add",
    editClientJobRole: "/job-role/:id",
    deleteClientJobRole: "/job-role/remove/:id",
    editStatusClientJobRole: "/job-role/status/:id",


    getClientNos: "/nos",
    addClientNos: "/nos/add",
    editClientNos: "/nos/:id",
    deleteClientNos: "/nos/:id",


    getClientScheme: "/scheme",
    addClientScheme: "/scheme/add",
    editClientScheme: "/scheme-edit/:id",
    deleteClientScheme: "/scheme/remove/:id",
    editStatusClientScheme: "/scheme-status/:id",


    getClientQuestionBank: "/question-bank",
    addClientQuestionBank: "/question-bank/add",
    editClientQuestionBank: "/question-bank/edit/:id",
    deleteClientQuestionBank: "/question-bank/remove/:id",
    editStatusClientQuestionBank: "/question-bank/status/:id",


    getClientQuestion: "/question/:id",
    uploadClientQuestion: "/question/bulkUpload",
    addClientQuestion: "/question/add",
    editClientQuestion: "/question-edit/:id",
    deleteClientQuestion: "/question-remove/:id",
    editStatusClientQuestion: "/question-status/:id",


    getClientChildUser: "/child-user",
    addClientChildUser: "/child-user/add",
    editClientChildUser: "/child-user/edit/:id",
    deleteClientChildUser: "/child-user/remove/:id",
    editStatusClientChildUser: "/child-user/status/:id",

    // User Management

    getClientAssessor: "/assessor/get",
    addClientAssessor: "/assessor/register",
    editClientAssessor: "/assessor/:id",
    deleteClientAssessor: "/assessor/delete-ass/:id",
    editStatusClientAssessor: "/assessor/update-status/:id",


    getClientCandidate: "/candidate/list",
    addClientCandidate: "/candidate/add",
    clientCandidateBulkUpload: "/candidate/bulkUpload",
    moveClientCandidate: "/manageCandidate/move",
    deleteCandidateBulkUpload: "/manageCandidate/delete",


    getClientManageCandidate: "/manageCandidate/list",
    editClientManageCandidate: "/manageCandidate/Edit/:id",
    deleteClientManageCandidate: "/manageCandidate/delete/:id",

    // Assessment

    getClientBatchUpload: "/assessment/bulkDataList",
    clientBatchUpload: "/assessment/bulk_upload",
    moveClientBatchUpload: "/assessment/moveBulk",
    deleteBatchUpload: "/assessment/deleteBulkData",


    getClientManageBatch: "/assessment/getBatchData",
    addClientManageBatch: "/assessment/addBatch",
    editClientManageBatch: "/assessment/editBatchData/:id",
    deleteClientManageBatch: "/assessment/deleteBatchData/:id",


    getClientScheduledbatch: "/manageCandidate/scheduleBatch",


    getClientCurrentbatch: "/manageCandidate/currentBatch",

    // Dropdowns

    getSectorDropDown: "/sector/drop-down",
    getClientJobRoleDropDown: "/job-role/drop-down",
    getNosDropDown: "/nos/drop-dwon",
    getBatchDropDown: "/manageCandidate/batch/dropDown",

    //? ***************** Spoc person *****************

    // Auth

    spocPersonLogin: "/spoc-person/login",
    spocPersonLogOut: "/spoc-person/logout",

    //? ***************** Child User *****************

    // Auth

    childUserLogin: "/child-user/login",
    childUserLogOut: "/child-user/logout",

    
    //? ***************** Test Module *****************
    getTestModuleQuestion : "/question/66837b9a27698669a00706e8",
    uploadTestDocument : "",
    getExamUserDetail:"exam/get-document/:id"
}

export const messages = {
    toast: {
        auth: {
            login: "Login successfully!",
            logOut: "LogOut successfully!",
        },
        sector: {
            addSector: "successfully added !",
            addClient: "successfully added !",
            editSector: "successfully edit !",
            deleteSector: "successfully delete !",
            move: "successfully move !"
        }
    }
}