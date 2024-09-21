import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link, NavLink, matchPath, useNavigate } from "react-router-dom";
import { SVGICON } from "../../../constants/IconList";

const SideBar = () => {
    const navigate = useNavigate();

    const [isContent, setIsContent] = useState(false);
    const [isUserManagement, setIsUserManagement] = useState(false);
    const [isAssessment, setIsAssessment] = useState(false);
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [isReports, setReports] = useState(false);
    const [isSupport, setSupport] = useState(false);
    const [isAnalyticsReport, setAnalyticsReport] = useState(false);

    let path = window.location.pathname;

    const isAccordianActive = () => {
        if (path === "/spoc-person/manage-sector" ||
            path === "/spoc-person/manage-job-role" ||
            path === "/spoc-person/manage-nos" ||
            path === "/spoc-person/manage-scheme" ||
            path === "/spoc-person/manage-question-bank" ||
            path === "/spoc-person/manage-child-user" ||
            matchPath("/spoc-person/question/:id", path)) {
            setIsContent(true);
            setIsUserManagement(false);
            setIsAssessment(false);
            setReports(false);
            setSupport(false);
            setAnalyticsReport(false);
        } else if (path === "/spoc-person/manage-assessor" ||
            path === "/spoc-person/candidate-bulk-upload" ||
            path === "/spoc-person/manage-candidate") {
            setIsUserManagement(true);
            setIsContent(false);
            setIsAssessment(false);
            setIsMonitoring(false);
            setReports(false);
            setSupport(false);
            setAnalyticsReport(false);
        } else if (path === "/spoc-person/batch-upload" ||
            path === "/spoc-person/manage-batch" ||
            path === "/spoc-person/scheduled-batch" ||
            path === "/spoc-person/current-batch" ||
            path === "/spoc-person/assessment-completed") {
            setIsUserManagement(false);
            setIsContent(false);
            setIsAssessment(true);
            setIsMonitoring(false);
            setReports(false);
            setSupport(false);
            setAnalyticsReport(false);
        } else if (path === "/spoc-person/batch-status" ||
            path === "/spoc-person/candidate-evidence" ||
            path === "/spoc-person/batch-evidence-record") {
            setIsUserManagement(false);
            setIsContent(false);
            setIsAssessment(false);
            setIsMonitoring(true);
            setReports(false);
            setSupport(false);
            setAnalyticsReport(false);
        } else if (path === "/spoc-person/mis-report" ||
            path === "/spoc-person/batch-result" ||
            path === "/spoc-person/batch-report") {
            setIsUserManagement(false);
            setIsContent(false);
            setIsAssessment(false);
            setIsMonitoring(false);
            setReports(true);
            setSupport(false);
            setAnalyticsReport(false);
        } else if (path === "/spoc-person/open-ticket" ||
            path === "/spoc-person/closed-ticket" ||
            path === "/spoc-person/user-manual" ||
            path === "/spoc-person/help" ||
            path === "/spoc-person/email-templates") {
            setIsUserManagement(false);
            setIsContent(false);
            setIsAssessment(false);
            setIsMonitoring(false);
            setReports(false);
            setSupport(true);
            setAnalyticsReport(false);
        } else if (path === "/spoc-person/assessors-analytics" ||
            path === "/spoc-person/sectors-analytics" ||
            path === "/spoc-person/question-bank-analytics" ||
            path === "/spoc-person/batchs-analytics" ||
            path === "/spoc-person/job-roles-analytics") {
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
                        <NavLink to={"/spoc-person/dashboard"}>
                            <Accordion.Header>
                                <span>{SVGICON.DashboardSvg}</span>
                                Dashboard
                            </Accordion.Header>
                        </NavLink>
                    </Accordion.Item>
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
                                    <li>
                                        <NavLink to={"/spoc-person/manage-sector"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Manage SPOC Person
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/manage-job-role"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Manage Job Role
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/manage-nos"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Manage NOS
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/manage-scheme"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Manage Scheme
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={"/spoc-person/manage-question-bank"}
                                            className={
                                                matchPath("/spoc-person/question/:id", path) && "active"
                                            }
                                        >
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Manage Question Bank
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/manage-child-user"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Manage Child User
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
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
                                    <li>
                                        <NavLink to={"/spoc-person/manage-assessor"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Manage Assessor
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/candidate-bulk-upload"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Candidate Bulk upload
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/manage-candidate"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Manage Candidate
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
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
                                    <li>
                                        <NavLink to={"/spoc-person/batch-upload"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Batch Upload
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/manage-batch"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Manage Batch
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/scheduled-batch"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Scheduled Batch
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/current-batch"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Current Batch
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/assessment-completed"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Assessment Completed
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
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
                                    <li>
                                        <NavLink to={"/spoc-person/batch-status"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Batch Status
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/candidate-evidence"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Candidate Evidence
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/batch-evidence-record"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Batch Evidence Record
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
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
                                    <li>
                                        <NavLink to={"/spoc-person/mis-report"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            MIS Report
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/batch-result"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Batch Result
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/batch-report"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Batch Report
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
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
                                        <NavLink to={"/spoc-person/open-ticket"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Open Ticket
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/closed-ticket"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Closed Ticket
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/user-manual"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            User Manual
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/help"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Help
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/email-templates"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Email Templates
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
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
                                    <li>
                                        <NavLink to={"/spoc-person/assessors-analytics"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Assessor's Analytics
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/sectors-analytics"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Sector's Analytics
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/question-bank-analytics"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Question Bank's Analytics
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/batchs-analytics"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            Batch's Analytics
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/spoc-person/job-roles-analytics"}>
                                            <span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </span>
                                            JobRole's Analytics
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
};

export default SideBar;
