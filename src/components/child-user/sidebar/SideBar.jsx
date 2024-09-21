import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link, NavLink, matchPath, useNavigate } from "react-router-dom";
import { SVGICON } from "../../../constants/IconList";

const SideBar = () => {
    const navigate = useNavigate();

    const [selectPageViewPermission, setSelectPageViewPermission] = useState([]);

    const [isContent, setIsContent] = useState(false);
    const [isUserManagement, setIsUserManagement] = useState(false);
    const [isAssessment, setIsAssessment] = useState(false);
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [isReports, setReports] = useState(false);
    const [isSupport, setSupport] = useState(false);
    const [isAnalyticsReport, setAnalyticsReport] = useState(false);

    let path = window.location.pathname;

    const isAccordianActive = () => {
        if (path === "/child-user/manage-sector" ||
            path === "/child-user/manage-job-role" ||
            path === "/child-user/manage-nos" ||
            path === "/child-user/manage-scheme" ||
            path === "/child-user/manage-question-bank" ||
            path === "/child-user/manage-child-user" ||
            matchPath("/child-user/question/:id", path)) {
            setIsContent(true);
            setIsUserManagement(false);
            setIsAssessment(false);
            setReports(false);
            setSupport(false);
            setAnalyticsReport(false);
        } else if (path === "/child-user/manage-assessor" ||
            path === "/child-user/candidate-bulk-upload" ||
            path === "/child-user/manage-candidate") {
            setIsUserManagement(true);
            setIsContent(false);
            setIsAssessment(false);
            setIsMonitoring(false);
            setReports(false);
            setSupport(false);
            setAnalyticsReport(false);
        } else if (path === "/child-user/batch-upload" ||
            path === "/child-user/manage-batch" ||
            path === "/child-user/scheduled-batch" ||
            path === "/child-user/current-batch" ||
            path === "/child-user/assessment-completed") {
            setIsUserManagement(false);
            setIsContent(false);
            setIsAssessment(true);
            setIsMonitoring(false);
            setReports(false);
            setSupport(false);
            setAnalyticsReport(false);
        } else if (path === "/child-user/batch-status" ||
            path === "/child-user/candidate-evidence" ||
            path === "/child-user/batch-evidence-record") {
            setIsUserManagement(false);
            setIsContent(false);
            setIsAssessment(false);
            setIsMonitoring(true);
            setReports(false);
            setSupport(false);
            setAnalyticsReport(false);
        } else if (path === "/child-user/mis-report" ||
            path === "/child-user/batch-result" ||
            path === "/child-user/batch-report") {
            setIsUserManagement(false);
            setIsContent(false);
            setIsAssessment(false);
            setIsMonitoring(false);
            setReports(true);
            setSupport(false);
            setAnalyticsReport(false);
        } else if (path === "/child-user/open-ticket" ||
            path === "/child-user/closed-ticket" ||
            path === "/child-user/user-manual" ||
            path === "/child-user/help" ||
            path === "/child-user/email-templates") {
            setIsUserManagement(false);
            setIsContent(false);
            setIsAssessment(false);
            setIsMonitoring(false);
            setReports(false);
            setSupport(true);
            setAnalyticsReport(false);
        } else if (path === "/child-user/assessors-analytics" ||
            path === "/child-user/sectors-analytics" ||
            path === "/child-user/question-bank-analytics" ||
            path === "/child-user/batchs-analytics" ||
            path === "/child-user/job-roles-analytics") {
            setIsUserManagement(false);
            setIsContent(false);
            setIsAssessment(false);
            setIsMonitoring(false);
            setReports(false);
            setSupport(false);
            setAnalyticsReport(true);
        } else {
            setIsContent(false);
            setIsUserManagement(false);
            setIsAssessment(false);
            setIsMonitoring(false);
            setReports(false);
            setSupport(false);
            setAnalyticsReport(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("persist:childUser");
        if (token) {
            const parsedData = JSON.parse(token);
            const userToken = parsedData && parsedData.childUser ? JSON.parse(parsedData.childUser)?.selectPageViewPermission : null;
            setSelectPageViewPermission(userToken);
        }
    }, [])

    useEffect(() => {
        isAccordianActive();
    }, [navigate]);

    return (
        <div className="left-side-nav-area">
            <div className="top-logo-image text-center">
                <h1>LOGO</h1>
            </div>
            <div className="navigation-menus">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <NavLink to={"/child-user/dashboard"}>
                            <Accordion.Header>
                                <span>{SVGICON.DashboardSvg}</span>
                                Dashboard
                            </Accordion.Header>
                        </NavLink>
                    </Accordion.Item>
                    {
                        (selectPageViewPermission?.includes("ManageJobRole") ||
                            selectPageViewPermission?.includes("ManageNos") ||
                            selectPageViewPermission?.includes("ManageScheme") ||
                            selectPageViewPermission?.includes("ManageQuestionBank")) && (
                            <Accordion.Item eventKey="1">
                                <Link className={`${isContent && "active"}`}>
                                    <Accordion.Header>
                                        <span>{SVGICON.ContentManagementSvg}</span>
                                        Content Management
                                    </Accordion.Header>
                                </Link>
                                <Accordion.Body>
                                    <div className="accordian-inner-navlists">
                                        <ul>
                                            {selectPageViewPermission?.includes("ManageJobRole") && (
                                                <li>
                                                    <NavLink to={"/child-user/manage-job-role"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Manage Job Role
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("ManageNos") && (
                                                <li>
                                                    <NavLink to={"/child-user/manage-nos"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Manage NOS
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("ManageScheme") && (
                                                <li>
                                                    <NavLink to={"/child-user/manage-scheme"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Manage Scheme
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("ManageQuestionBank") && (
                                                <li>
                                                    <NavLink
                                                        to={"/child-user/manage-question-bank"}
                                                        className={matchPath("/child-user/question/:id", path) && "active"}
                                                    >
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Manage Question Bank
                                                    </NavLink>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    }
                    {
                        (selectPageViewPermission?.includes("ManageAssessor") ||
                            selectPageViewPermission?.includes("CandidateBulkupload") ||
                            selectPageViewPermission?.includes("ManageCandidate")) && (
                            <Accordion.Item eventKey="2">
                                <Link className={`${isUserManagement && "active"}`}>
                                    <Accordion.Header>
                                        <span>{SVGICON.UserManagementSvg}</span>
                                        User Management
                                    </Accordion.Header>
                                </Link>
                                <Accordion.Body>
                                    <div className="accordian-inner-navlists">
                                        <ul>
                                            {selectPageViewPermission?.includes("ManageAssessor") && (
                                                <li>
                                                    <NavLink to={"/child-user/manage-assessor"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Manage Assessor
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("CandidateBulkupload") && (
                                                <li>
                                                    <NavLink to={"/child-user/candidate-bulk-upload"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Candidate Bulk upload
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("ManageCandidate") && (
                                                <li>
                                                    <NavLink to={"/child-user/manage-candidate"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Manage Candidate
                                                    </NavLink>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    }
                    {
                        (selectPageViewPermission?.includes("BatchUpload") ||
                            selectPageViewPermission?.includes("ManageBatch") ||
                            selectPageViewPermission?.includes("ScheduledBatch") ||
                            selectPageViewPermission?.includes("CurrentBatch") ||
                            selectPageViewPermission?.includes("AssessmentCompleted")) && (
                            <Accordion.Item eventKey="3">
                                <Link className={`${isAssessment && "active"}`}>
                                    <Accordion.Header>
                                        <span>{SVGICON.AssessmentSvg}</span>
                                        Assessment
                                    </Accordion.Header>
                                </Link>
                                <Accordion.Body>
                                    <div className="accordian-inner-navlists">
                                        <ul>
                                            {selectPageViewPermission?.includes("BatchUpload") && (
                                                <li>
                                                    <NavLink to={"/child-user/batch-upload"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Batch Upload
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("ManageBatch") && (
                                                <li>
                                                    <NavLink to={"/child-user/manage-batch"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Manage Batch
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("ScheduledBatch") && (
                                                <li>
                                                    <NavLink to={"/child-user/scheduled-batch"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Scheduled Batch
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("CurrentBatch") && (
                                                <li>
                                                    <NavLink to={"/child-user/current-batch"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Current Batch
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("AssessmentCompleted") && (
                                                <li>
                                                    <NavLink to={"/child-user/assessment-completed"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Assessment Completed
                                                    </NavLink>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    }
                    {
                        (selectPageViewPermission?.includes("BatchStatus") ||
                            selectPageViewPermission?.includes("CandidateEvidence") ||
                            selectPageViewPermission?.includes("BatchEvidenceRecord")) && (
                            <Accordion.Item eventKey="4">
                                <Link className={`${isMonitoring && "active"}`}>
                                    <Accordion.Header>
                                        <span>{SVGICON.MonitoringSvg}</span>
                                        Monitoring
                                    </Accordion.Header>
                                </Link>
                                <Accordion.Body>
                                    <div className="accordian-inner-navlists">
                                        <ul>
                                            {selectPageViewPermission?.includes("BatchStatus") && (
                                                <li>
                                                    <NavLink to={"/child-user/batch-status"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Batch Status
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("CandidateEvidence") && (
                                                <li>
                                                    <NavLink to={"/child-user/candidate-evidence"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Candidate Evidence
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("BatchEvidenceRecord") && (
                                                <li>
                                                    <NavLink to={"/child-user/batch-evidence-record"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Batch Evidence Record
                                                    </NavLink>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    }
                    {
                        (selectPageViewPermission?.includes("MISReport") ||
                            selectPageViewPermission?.includes("BatchResult") ||
                            selectPageViewPermission?.includes("BatchReport")) && (
                            <Accordion.Item eventKey="5">
                                <Link className={`${isReports && "active"}`}>
                                    <Accordion.Header>
                                        <span>{SVGICON.ReportsSvg}</span>
                                        Reports
                                    </Accordion.Header>
                                </Link>
                                <Accordion.Body>
                                    <div className="accordian-inner-navlists">
                                        <ul>
                                            {selectPageViewPermission?.includes("MISReport") && (
                                                <li>
                                                    <NavLink to={"/child-user/mis-report"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        MIS Report
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("BatchResult") && (
                                                <li>
                                                    <NavLink to={"/child-user/batch-result"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Batch Result
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("BatchReport") && (
                                                <li>
                                                    <NavLink to={"/child-user/batch-report"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Batch Report
                                                    </NavLink>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    }


                    {/* <Accordion.Item eventKey="6">
                        <Link className={`${isSupport && "active"}`}>
                            <Accordion.Header>
                                <span>{SVGICON.SupportSvg}</span>
                                Support
                            </Accordion.Header>
                        </Link>
                        <Accordion.Body>
                            <div className="accordian-inner-navlists">
                                <ul>
                                    <li>
                                        <NavLink to={"/child-user/open-ticket"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Open Ticket
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/child-user/closed-ticket"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Closed Ticket
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/child-user/user-manual"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            User Manual
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/child-user/help"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Help
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/child-user/email-templates"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Email Templates
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item> */}

                    {
                        (selectPageViewPermission?.includes("AssessorsAnalytics") ||
                            selectPageViewPermission?.includes("SectorsAnalytics") ||
                            selectPageViewPermission?.includes("QuestionBanksAnalytics") ||
                            selectPageViewPermission?.includes("BatchsAnalytics") ||
                            selectPageViewPermission?.includes("JobRolesAnalytics")
                        ) && (
                            <Accordion.Item eventKey="7">
                                <Link className={`${isAnalyticsReport && "active"}`}>
                                    <Accordion.Header>
                                        <span>{SVGICON.AnalyticsReportSvg}</span>
                                        Analytics Report
                                    </Accordion.Header>
                                </Link>
                                <Accordion.Body>
                                    <div className="accordian-inner-navlists">
                                        <ul>
                                            {selectPageViewPermission?.includes("AssessorsAnalytics") && (
                                                <li>
                                                    <NavLink to={"/child-user/assessors-analytics"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Assessor's Analytics
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("SectorsAnalytics") && (
                                                <li>
                                                    <NavLink to={"/child-user/sectors-analytics"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Sector's Analytics
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("QuestionBanksAnalytics") && (
                                                <li>
                                                    <NavLink to={"/child-user/question-bank-analytics"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Question Bank's Analytics
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("BatchsAnalytics") && (
                                                <li>
                                                    <NavLink to={"/child-user/batchs-analytics"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        Batch's Analytics
                                                    </NavLink>
                                                </li>
                                            )}
                                            {selectPageViewPermission?.includes("JobRolesAnalytics") && (
                                                <li>
                                                    <NavLink to={"/child-user/job-roles-analytics"}>
                                                        <span>
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                        JobRole's Analytics
                                                    </NavLink>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                        
                    }
                    
                </Accordion>
            </div>
        </div>
    );
};

export default SideBar;
