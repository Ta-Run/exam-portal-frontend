import React from "react";
import { Route, Routes } from "react-router-dom";
import "./css/App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminLayout, ChildUserLayout, ClientLayout, SpocPersonLayout } from "./constants/layoutList";
import NoPageFound from "./pages/no-page-found/NoPageFound";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

//? ********************************** Admin **********************************

import Login from "./pages/admin/login/Login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import ContentManagement from "./pages/admin/content-management/ContentManagement";
import ManageClients from "./pages/admin/manage-clients/ManageClients";
import Assessment from "./pages/client/assessment/Assessment";
import Support from "./pages/client/support/Support";

//? ********************************** Client **********************************

import ClientLogin from "./pages/client/login/Login";
import ManageChildUser from "./pages/client/manage-child-user/ManageChildUser";
import ClientDashboard from "./pages/client/dashboard/Dashboard";
import ManageQuestionBank from "./pages/client/manage-question-bank/ManageQuestionBank";
import ManageSector from "./pages/client/manage-sector/ManageSector";
import ManageJobRole from "./pages/client/manage-job-role/ManageJobRole";
import ManageNos from "./pages/client/manage-nos/ManageNos";
import ManageScheme from "./pages/client/manage-scheme/ManageScheme";
import ManageQuestion from "./pages/client/manage-question/ManageQuestion";
import ManageAssessor from "./pages/client/manage-assessor/ManageAssessor";
import ManageCandidate from "./pages/client/manage-candidate/ManageCandidate";
import CandidateBulkUpload from "./pages/client/candidate-bulk-upload/CandidateBulkUpload";
import BatchUpload from "./pages/client/batch-upload/BatchUpload";
import ManageBatch from "./pages/client/manage-batch/ManageBatch";
import ScheduledBatch from "./pages/client/scheduled-batch/ScheduledBatch";
import CurrentBatch from "./pages/client/current-batch/CurrentBatch";
import AssessmentCompleted from "./pages/client/assessment-completed/AssessmentCompleted";
import BatchStatus from "./pages/client/batch-status/BatchStatus";
import CandidateEvidence from "./pages/client/candidate-evidence/CandidateEvidence";
import BatchEvidenceRecord from "./pages/client/batch-evidence-record/BatchEvidenceRecord";
import MisReport from "./pages/client/mis-report/MisReport";
import BatchResult from "./pages/client/batch-result/BatchResult";
import BatchReport from "./pages/client/batch-report/BatchReport";
import OpenTicket from "./pages/client/open-ticket/OpenTicket";
import ClosedTicket from "./pages/client/closed-ticket/ClosedTicket";
import UserManual from "./pages/client/user-manual/UserManual";
import Help from "./pages/client/help/Help";
import EmailTemplates from "./pages/client/email-templates/EmailTemplates";
import AssessorsAnalytics from "./pages/client/assessors-analytics/AssessorsAnalytics";
import QuestionBankAnalytics from "./pages/client/question-bank-analytics/QuestionBankAnalytics";
import JobRolesAnalytics from "./pages/client/job-roles-analytics/JobRolesAnalytics";
import SectorsAnalytics from "./pages/client/sectors-analytics/SectorsAnalytics";
import BatchsAnalytics from './pages/client/batchs-analytics/BatchsAnalytics';

import TestModule from "./pages/client/test-modules/TestModule";
import UploadDocument from "./pages/client/test-modules/UploadDocument";
//? ********************************** SPOC Person **********************************

import SpocPersonLogin from "./pages/spoc-person/login/Login";

//? ********************************** Child user **********************************

import ChildUserLogin from "./pages/child-user/login/Login";


const App = () => {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/spoc-person/login" element={<SpocPersonLogin />} />
        <Route path="/child-user/login" element={<ChildUserLogin />} />

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Content Management */}
          <Route path="/content-management" element={<ContentManagement />} />
          <Route path="/manage-clients" element={<ManageClients />} />
          {/* <Route path='/assessment' element={<Assessment />} /> */}
          {/* <Route path='/support' element={<Support />} /> */}
        </Route>

        {/* Client Routes */}
        <Route element={<ClientLayout />}>
          {/* Dashboard */}
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          {/* Content Management */}
          <Route path="/client/manage-sector" element={<ManageSector />} />
          <Route path="/client/manage-job-role" element={<ManageJobRole />} />
          <Route path="/client/manage-nos" element={<ManageNos />} />
          <Route path="/client/manage-scheme" element={<ManageScheme />} />
          <Route path="/client/manage-question-bank" element={<ManageQuestionBank />} />
          <Route path="/client/question/:id" element={<ManageQuestion />} />
          <Route path="/client/manage-child-user" element={<ManageChildUser />} />
          {/* User Management */}
          <Route path="/client/manage-assessor" element={<ManageAssessor />} />
          <Route path="/client/candidate-bulk-upload" element={<CandidateBulkUpload />} />
          <Route path="/client/manage-candidate" element={<ManageCandidate />} />
          {/* Assessment */}
          <Route path="/client/batch-upload" element={<BatchUpload />} />
          <Route path="/client/manage-batch" element={<ManageBatch />} />
          <Route path="/client/scheduled-batch" element={<ScheduledBatch />} />
          <Route path="/client/current-batch" element={<CurrentBatch />} />
          <Route path="/client/assessment-completed" element={<AssessmentCompleted />} />
          {/* Monitoring */}
          <Route path="/client/batch-status" element={<BatchStatus />} />
          <Route path="/client/candidate-evidence" element={<CandidateEvidence />} />
          <Route path="/client/batch-evidence-record" element={<BatchEvidenceRecord />} />
          {/* Reports */}
          <Route path="/client/mis-report" element={<MisReport />} />
          <Route path="/client/batch-result" element={<BatchResult />} />
          <Route path="/client/batch-report" element={<BatchReport />} />
          {/* Support */}
          <Route path="/client/open-ticket" element={<OpenTicket />} />
          <Route path="/client/closed-ticket" element={<ClosedTicket />} />
          <Route path="/client/user-manual" element={<UserManual />} />
          <Route path="/client/help" element={<Help />} />
          <Route path="/client/email-templates" element={<EmailTemplates />} />
          {/* Analytics Report */}
          <Route path="/client/assessors-analytics" element={<AssessorsAnalytics />} />
          <Route path="/client/sectors-analytics" element={<SectorsAnalytics />} />
          <Route path="/client/question-bank-analytics" element={<QuestionBankAnalytics />} />
          <Route path="/client/batchs-analytics" element={<BatchsAnalytics />} />
          <Route path="/client/job-roles-analytics" element={<JobRolesAnalytics />} />
           {/* Test Module */}
           <Route path="/client/test-modules/TestModule" element={<TestModule />} />
{/* Test Module */}
 <Route path="/client/test-modules/UploadDocument" element={<UploadDocument />} />


        </Route>

        {/* SPOC Person Routes */}
        <Route element={<SpocPersonLayout />}>
          {/* Dashboard */}
          <Route path="/spoc-person/dashboard" element={<ClientDashboard />} />
          {/* Content Management */}
          <Route path="/spoc-person/manage-sector" element={<ManageSector />} />
          <Route path="/spoc-person/manage-job-role" element={<ManageJobRole />} />
          <Route path="/spoc-person/manage-nos" element={<ManageNos />} />
          <Route path="/spoc-person/manage-scheme" element={<ManageScheme />} />
          <Route path="/spoc-person/manage-question-bank" element={<ManageQuestionBank />} />
          <Route path="/spoc-person/question/:id" element={<ManageQuestion />} />
          <Route path="/spoc-person/manage-child-user" element={<ManageChildUser />} />
          {/* User Management */}
          <Route path="/spoc-person/manage-assessor" element={<ManageAssessor />} />
          <Route path="/spoc-person/candidate-bulk-upload" element={<CandidateBulkUpload />} />
          <Route path="/spoc-person/manage-candidate" element={<ManageCandidate />} />
          {/* Assessment */}
          <Route path="/spoc-person/batch-upload" element={<BatchUpload />} />
          <Route path="/spoc-person/manage-batch" element={<ManageBatch />} />
          <Route path="/spoc-person/scheduled-batch" element={<ScheduledBatch />} />
          <Route path="/spoc-person/current-batch" element={<CurrentBatch />} />
          <Route path="/spoc-person/assessment-completed" element={<AssessmentCompleted />} />
          {/* Monitoring */}
          <Route path="/spoc-person/batch-status" element={<BatchStatus />} />
          <Route path="/spoc-person/candidate-evidence" element={<CandidateEvidence />} />
          <Route path="/spoc-person/batch-evidence-record" element={<BatchEvidenceRecord />} />
          {/* Reports */}
          <Route path="/spoc-person/mis-report" element={<MisReport />} />
          <Route path="/spoc-person/batch-result" element={<BatchResult />} />
          <Route path="/spoc-person/batch-report" element={<BatchReport />} />
          {/* Support */}
          <Route path="/spoc-person/open-ticket" element={<OpenTicket />} />
          <Route path="/spoc-person/closed-ticket" element={<ClosedTicket />} />
          <Route path="/spoc-person/user-manual" element={<UserManual />} />
          <Route path="/spoc-person/help" element={<Help />} />
          <Route path="/spoc-person/email-templates" element={<EmailTemplates />} />
          {/* Analytics Report */}
          <Route path="/spoc-person/assessors-analytics" element={<AssessorsAnalytics />} />
          <Route path="/spoc-person/sectors-analytics" element={<SectorsAnalytics />} />
          <Route path="/spoc-person/question-bank-analytics" element={<QuestionBankAnalytics />} />
          <Route path="/spoc-person/batchs-analytics" element={<BatchsAnalytics />} />
          <Route path="/spoc-person/job-roles-analytics" element={<JobRolesAnalytics />} />
        </Route>

        {/* Child user Routes */}
        <Route element={<ChildUserLayout />}>
          {/* Dashboard */}
          <Route path="/child-user/dashboard" element={<ClientDashboard />} />
          {/* Content Management */}
          <Route path="/child-user/manage-job-role" element={<ManageJobRole />} />
          <Route path="/child-user/manage-nos" element={<ManageNos />} />
          <Route path="/child-user/manage-scheme" element={<ManageScheme />} />
          <Route path="/child-user/manage-question-bank" element={<ManageQuestionBank />} />
          <Route path="/child-user/question/:id" element={<ManageQuestion />} />
          {/* User Management */}
          <Route path="/child-user/manage-assessor" element={<ManageAssessor />} />
          <Route path="/child-user/candidate-bulk-upload" element={<CandidateBulkUpload />} />
          <Route path="/child-user/manage-candidate" element={<ManageCandidate />} />
          {/* Assessment */}
          <Route path="/child-user/batch-upload" element={<BatchUpload />} />
          <Route path="/child-user/manage-batch" element={<ManageBatch />} />
          <Route path="/child-user/scheduled-batch" element={<ScheduledBatch />} />
          <Route path="/child-user/current-batch" element={<CurrentBatch />} />
          <Route path="/child-user/assessment-completed" element={<AssessmentCompleted />} />
          {/* Monitoring */}
          <Route path="/child-user/batch-status" element={<BatchStatus />} />
          <Route path="/child-user/candidate-evidence" element={<CandidateEvidence />} />
          <Route path="/child-user/batch-evidence-record" element={<BatchEvidenceRecord />} />
          {/* Reports */}
          <Route path="/child-user/mis-report" element={<MisReport />} />
          <Route path="/child-user/batch-result" element={<BatchResult />} />
          <Route path="/child-user/batch-report" element={<BatchReport />} />
          {/* Support */}
          {/* <Route path="/child-user/open-ticket" element={<OpenTicket />} />
          <Route path="/child-user/closed-ticket" element={<ClosedTicket />} />
          <Route path="/child-user/user-manual" element={<UserManual />} />
          <Route path="/child-user/help" element={<Help />} />
          <Route path="/child-user/email-templates" element={<EmailTemplates />} /> */}
          {/* Analytics Report */}
          <Route path="/child-user/assessors-analytics" element={<AssessorsAnalytics />} />
          <Route path="/child-user/sectors-analytics" element={<SectorsAnalytics />} />
          <Route path="/child-user/question-bank-analytics" element={<QuestionBankAnalytics />} />
          <Route path="/child-user/batchs-analytics" element={<BatchsAnalytics />} />
          <Route path="/child-user/job-roles-analytics" element={<JobRolesAnalytics />} />

         

        </Route>

        <Route path="*" element={<NoPageFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
