import { createSlice } from "@reduxjs/toolkit";
import { reqToAddClientChildUser, reqToAddClientJobRole, reqToAddClientQuestion, reqToAddClientSector, reqToAddClients, reqToAddSector, reqToDeleteClientChildUser, reqToDeleteClientJobRole, reqToDeleteClientNos, reqToDeleteClientQuestion, reqToDeleteClientQuestionBank, reqToDeleteClients, reqToDeleteSector, reqToEditClienChildUser, reqToEditClientJobRole, reqToEditClientNos, reqToEditClientQuestion, reqToEditClientScheme, reqToEditClientSector, reqToEditSector, reqToEditStatusClientChildUser, reqToEditStatusClientJobRole, reqToEditStatusClientQuestion, reqToEditStatusClientScheme, reqToEditStatusClientSector, reqToEditStatusSector, reqToGetAdminSectorDropDown, reqToGetBatchDropDown, reqToGetClientChildUser, reqToGetClientJobRole, reqToGetClientJobRoleDropDown, reqToGetClientNos, reqToGetClientQuestion, reqToGetClientQuestionBank, reqToGetClientScheme, reqToGetNosDropDown, reqToGetSector, reqToGetSectorDropDown, reqToGetClients, reqToGetClientSector, reqToAddClientNos, reqToAddClientScheme, reqToAddClientQuestionBank, reqToEditClients, reqToDeleteClientSector, reqToDeleteClientScheme, reqToEditClientQuestionBank, reqToEditStatusClientQuestionBank, reqToUploadClientQuestions } from "../services/contentManagementServices";

const initialState = {
    loader: false,

    //? ************************** Admin  **************************

    sector: null,
    sectorPagination: {},

    client: null,
    clientPagination: {},

    //? ************************** Client  **************************

    // clientSector: null,
    spocClient: null,
    spocClientPagination: {},

    clientJobRole: null,
    clientJobRolePagination: {},

    clientNos: null,
    clientNosPagination: {},

    clientScheme: null,
    clientSchemePagination: {},

    clientQuestionBank: null,
    clientQuestionBankPagination: {},

    clientQuestion: null,
    clientQuestionPagination: null,

    clientChildUser: null,
    clientChildUserPagination: {},

    //? ************************** Admin DropDown **************************

    adminSectorDropDown: [],

    //? ************************** Client DropDown **************************

    sectorDropDown: [],
    clientJobRoleDropDown: [],
    clientNosDropDown: [],
    clientBatchDropDown: [],

    error: ""
}

const contentManagementSlice = createSlice({
    name: "contentManagement",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // ************************************** Admin **************************************

        //? ********** Manage Sector **********

        // reqToGetSector
        builder.addCase(reqToGetSector.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetSector.fulfilled, (state, action) => {
            state.loader = false;
            state.sector = action.payload?.data;
            state.sectorPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetSector.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddSector
        builder.addCase(reqToAddSector.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddSector.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddSector.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditSector
        builder.addCase(reqToEditSector.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditSector.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditSector.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteSector
        builder.addCase(reqToDeleteSector.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteSector.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteSector.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditStatusSector
        builder.addCase(reqToEditStatusSector.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditStatusSector.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditStatusSector.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        //? ********** Manage Clients **********

        // reqToGetClients
        builder.addCase(reqToGetClients.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClients.fulfilled, (state, action) => {
            state.loader = false;
            state.client = action.payload?.data;
            state.clientPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClients.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddClients
        builder.addCase(reqToAddClients.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddClients.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddClients.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditClients
        builder.addCase(reqToEditClients.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditClients.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditClients.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClients
        builder.addCase(reqToDeleteClients.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClients.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClients.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // ************************************** Client **************************************

        //? ********** Manage SPOC Person **********

        // reqToGetClientSector
        builder.addCase(reqToGetClientSector.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientSector.fulfilled, (state, action) => {
            state.loader = false;
            state.spocClient = action.payload?.data;
            state.spocClientPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientSector.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddClientSector
        builder.addCase(reqToAddClientSector.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddClientSector.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddClientSector.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditClientSector
        builder.addCase(reqToEditClientSector.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditClientSector.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditClientSector.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientSector
        builder.addCase(reqToDeleteClientSector.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientSector.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientSector.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditStatusClientSector
        builder.addCase(reqToEditStatusClientSector.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditStatusClientSector.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditStatusClientSector.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        //? ********** Manage Job Role **********

        // reqToGetClientJobRole
        builder.addCase(reqToGetClientJobRole.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientJobRole.fulfilled, (state, action) => {
            state.loader = false;
            state.clientJobRole = action.payload?.data;
            state.clientJobRolePagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientJobRole.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddClientJobRole
        builder.addCase(reqToAddClientJobRole.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddClientJobRole.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddClientJobRole.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditClientJobRole
        builder.addCase(reqToEditClientJobRole.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditClientJobRole.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditClientJobRole.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientJobRole
        builder.addCase(reqToDeleteClientJobRole.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientJobRole.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientJobRole.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditStatusClientJobRole
        builder.addCase(reqToEditStatusClientJobRole.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditStatusClientJobRole.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditStatusClientJobRole.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        //? ********** Manage NOS **********

        // reqToGetClientNos
        builder.addCase(reqToGetClientNos.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientNos.fulfilled, (state, action) => {
            state.loader = false;
            state.clientNos = action.payload?.data;
            state.clientNosPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientNos.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddClientNos
        builder.addCase(reqToAddClientNos.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddClientNos.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddClientNos.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditClientNos
        builder.addCase(reqToEditClientNos.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditClientNos.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditClientNos.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientNos
        builder.addCase(reqToDeleteClientNos.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientNos.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientNos.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })


        //? ********** Manage Scheme **********

        // reqToGetClientScheme
        builder.addCase(reqToGetClientScheme.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientScheme.fulfilled, (state, action) => {
            state.loader = false;
            state.clientScheme = action.payload?.data;
            state.clientSchemePagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientScheme.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddClientScheme
        builder.addCase(reqToAddClientScheme.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddClientScheme.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddClientScheme.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditClientScheme
        builder.addCase(reqToEditClientScheme.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditClientScheme.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditClientScheme.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientScheme
        builder.addCase(reqToDeleteClientScheme.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientScheme.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientScheme.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditStatusClientScheme
        builder.addCase(reqToEditStatusClientScheme.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditStatusClientScheme.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditStatusClientScheme.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })


        //? ********** Manage Question Bank **********

        // reqToGetClientQuestionBank
        builder.addCase(reqToGetClientQuestionBank.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientQuestionBank.fulfilled, (state, action) => {
            state.loader = false;
            state.clientQuestionBank = action.payload?.data;
            state.clientQuestionBankPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientQuestionBank.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddClientQuestionBank
        builder.addCase(reqToAddClientQuestionBank.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddClientQuestionBank.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddClientQuestionBank.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditClientQuestionBank
        builder.addCase(reqToEditClientQuestionBank.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditClientQuestionBank.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditClientQuestionBank.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientQuestionBank
        builder.addCase(reqToDeleteClientQuestionBank.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientQuestionBank.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientQuestionBank.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditStatusClientQuestionBank
        builder.addCase(reqToEditStatusClientQuestionBank.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditStatusClientQuestionBank.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditStatusClientQuestionBank.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        //? ********** Manage Question **********

        // reqToGetClientQuestion
        builder.addCase(reqToGetClientQuestion.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientQuestion.fulfilled, (state, action) => {
            state.loader = false;
            state.clientQuestion = action.payload?.data;
            state.clientQuestionPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientQuestion.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToUploadClientQuestions
        builder.addCase(reqToUploadClientQuestions.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToUploadClientQuestions.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToUploadClientQuestions.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddClientQuestion
        builder.addCase(reqToAddClientQuestion.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddClientQuestion.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddClientQuestion.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditClientQuestion
        builder.addCase(reqToEditClientQuestion.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditClientQuestion.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditClientQuestion.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientQuestion
        builder.addCase(reqToDeleteClientQuestion.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientQuestion.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientQuestion.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditStatusClientQuestion
        builder.addCase(reqToEditStatusClientQuestion.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditStatusClientQuestion.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditStatusClientQuestion.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })


        //? ********** Manage Child User **********

        // reqToGetClientChildUser
        builder.addCase(reqToGetClientChildUser.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientChildUser.fulfilled, (state, action) => {
            state.loader = false;
            state.clientChildUser = action.payload?.data;
            state.clientChildUserPagination = action.payload?.paginate;
        })
        builder.addCase(reqToGetClientChildUser.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToAddClientChildUser
        builder.addCase(reqToAddClientChildUser.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToAddClientChildUser.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToAddClientChildUser.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditClienChildUser
        builder.addCase(reqToEditClienChildUser.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditClienChildUser.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditClienChildUser.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToDeleteClientChildUser
        builder.addCase(reqToDeleteClientChildUser.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToDeleteClientChildUser.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToDeleteClientChildUser.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToEditStatusClientChildUser
        builder.addCase(reqToEditStatusClientChildUser.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToEditStatusClientChildUser.fulfilled, (state) => {
            state.loader = false;
        })
        builder.addCase(reqToEditStatusClientChildUser.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // ************************************** Admin DropDown **************************************

        // reqToGetAdminSectorDropDown
        builder.addCase(reqToGetAdminSectorDropDown.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetAdminSectorDropDown.fulfilled, (state, action) => {
            state.loader = false;
            state.adminSectorDropDown = action.payload;
        })
        builder.addCase(reqToGetAdminSectorDropDown.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // ************************************** Client DropDown **************************************

        // reqToGetSectorDropDown
        builder.addCase(reqToGetSectorDropDown.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetSectorDropDown.fulfilled, (state, action) => {
            state.loader = false;
            state.sectorDropDown = action.payload;
        })
        builder.addCase(reqToGetSectorDropDown.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToGetClientJobRoleDropDown
        builder.addCase(reqToGetClientJobRoleDropDown.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetClientJobRoleDropDown.fulfilled, (state, action) => {
            state.loader = false;
            state.clientJobRoleDropDown = action.payload;
        })
        builder.addCase(reqToGetClientJobRoleDropDown.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToGetNosDropDown
        builder.addCase(reqToGetNosDropDown.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetNosDropDown.fulfilled, (state, action) => {
            state.loader = false;
            state.clientNosDropDown = action.payload;
        })
        builder.addCase(reqToGetNosDropDown.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })

        // reqToGetBatchDropDown
        builder.addCase(reqToGetBatchDropDown.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(reqToGetBatchDropDown.fulfilled, (state, action) => {
            state.loader = false;
            state.clientBatchDropDown = action.payload;
        })
        builder.addCase(reqToGetBatchDropDown.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        })
    }
})

export default contentManagementSlice.reducer;