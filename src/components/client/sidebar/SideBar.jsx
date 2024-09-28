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
  const [isTestModule, setTestModule] =  useState(false);

  let path = window.location.pathname;

  const isAccordianActive = () => {
    if (path === "/client/manage-sector" ||
      path === "/client/manage-job-role" ||
      path === "/client/manage-nos" ||
      path === "/client/manage-scheme" ||
      path === "/client/manage-question-bank" ||
      path === "/client/manage-child-user" ||
      matchPath("/client/question/:id", path)) {
      setIsContent(true);
      setIsUserManagement(false);
      setIsAssessment(false);
      setReports(false);
      setSupport(false);
      setAnalyticsReport(false);
      setTestModule(false);
    } else if (path === "/client/manage-assessor" ||
      path === "/client/candidate-bulk-upload" ||
      path === "/client/manage-candidate") {
      setIsUserManagement(true);
      setIsContent(false);
      setIsAssessment(false);
      setIsMonitoring(false);
      setReports(false);
      setSupport(false);
      setAnalyticsReport(false);
      setTestModule(false);
    } else if (path === "/client/batch-upload" ||
      path === "/client/manage-batch" ||
      path === "/client/scheduled-batch" ||
      path === "/client/current-batch" ||
      path === "/client/assessment-completed") {
      setIsUserManagement(false);
      setIsContent(false);
      setIsAssessment(true);
      setIsMonitoring(false);
      setReports(false);
      setSupport(false);
      setAnalyticsReport(false);
      setTestModule(false);
    } else if (path === "/client/batch-status" ||
      path === "/client/candidate-evidence" ||
      path === "/client/batch-evidence-record") {
      setIsUserManagement(false);
      setIsContent(false);
      setIsAssessment(false);
      setIsMonitoring(true);
      setReports(false);
      setSupport(false);
      setAnalyticsReport(false);
      setTestModule(false);
    } else if (path === "/client/mis-report" ||
      path === "/client/batch-result" ||
      path === "/client/batch-report") {
      setIsUserManagement(false);
      setIsContent(false);
      setIsAssessment(false);
      setIsMonitoring(false);
      setReports(true);
      setSupport(false);
      setAnalyticsReport(false);
    } else if (path === "/client/open-ticket" ||
      path === "/client/closed-ticket" ||
      path === "/client/user-manual" ||
      path === "/client/help" ||
      path === "/client/email-templates") {
      setIsUserManagement(false);
      setIsContent(false);
      setIsAssessment(false);
      setIsMonitoring(false);
      setReports(false);
      setSupport(true);
      setAnalyticsReport(false);
    } else if (path === "/client/assessors-analytics" ||
      path === "/client/sectors-analytics" ||
      path === "/client/question-bank-analytics" ||
      path === "/client/batchs-analytics" ||
      path === "/client/job-roles-analytics") {
      setIsUserManagement(false);
      setIsContent(false);
      setIsAssessment(false);
      setIsMonitoring(false);
      setReports(false);
      setSupport(false);
      setAnalyticsReport(true);
      // setTestModule(false);
    } else {
      setIsContent(false);
      setIsUserManagement(false);
      setIsAssessment(false);
      setIsMonitoring(false);
      setReports(false);
      setSupport(false);
      setAnalyticsReport(false);
      setTestModule(false);
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
            <NavLink to={"/client/dashboard"}>
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
                    <NavLink to={"/client/manage-sector"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Manage SPOC Person
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/manage-job-role"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Manage Job Role
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/manage-nos"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Manage NOS
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/manage-scheme"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Manage Scheme
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/client/manage-question-bank"}
                      className={
                        matchPath("/client/question/:id", path) && "active"
                      }
                    >
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Manage Question Bank
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/manage-child-user"}>
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
                    <NavLink to={"/client/manage-assessor"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Manage Assessor
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/candidate-bulk-upload"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Candidate Bulk upload
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/manage-candidate"}>
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
                    <NavLink to={"/client/batch-upload"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Batch Upload
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/manage-batch"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Manage Batch
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/scheduled-batch"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Scheduled Batch
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/current-batch"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Current Batch
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/assessment-completed"}>
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
                    <NavLink to={"/client/batch-status"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Batch Status
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/candidate-evidence"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Candidate Evidence
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/batch-evidence-record"}>
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
                    <NavLink to={"/client/mis-report"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      MIS Report
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/batch-result"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Batch Result
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/batch-report"}>
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
                    <NavLink to={"/client/open-ticket"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Open Ticket
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/closed-ticket"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Closed Ticket
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/user-manual"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      User Manual
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/help"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Help
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/email-templates"}>
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
                    <NavLink to={"/client/assessors-analytics"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Assessor's Analytics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/sectors-analytics"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Sector's Analytics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/question-bank-analytics"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Question Bank's Analytics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/batchs-analytics"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Batch's Analytics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/client/job-roles-analytics"}>
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

        {/* test module */}
        <Accordion.Item eventKey="8">
            <Link className={`${isTestModule && "active"}`}>
              <Accordion.Header>
                <span>{SVGICON.AnalyticsReportSvg}</span>
                Test Section
              </Accordion.Header>
            </Link>
            <Accordion.Body>
              <div className="accordian-inner-navlists">
                <ul>
                  {/* <li>
                    <NavLink to={"/client/test-modules/TestModule"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Question Bank's 
                    </NavLink>
                  </li> */}
                  
                  <li>
                    <NavLink to={"/client/test-modules/UploadDocument"}>
                      <span>
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                      Test Attempt
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
