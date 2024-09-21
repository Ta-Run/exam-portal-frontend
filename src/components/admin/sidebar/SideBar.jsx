import React, { useEffect, useState } from 'react'
import "./SideBar.scss"
import Accordion from 'react-bootstrap/Accordion';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SVGICON } from '../../../constants/IconList';

const SideBar = () => {

    const navigate = useNavigate();

    const [isContent, setIsContent] = useState(false);

    const isAccordianActive = () => {
        let path = window.location.pathname;

        if (path === "/content-management" || path === "/manage-clients") {
            setIsContent(true);
        } else {
            setIsContent(false);
        }
    }

    useEffect(() => {
        isAccordianActive();
    }, [navigate])

    return (
        <div className="left-side-nav-area">
            <div className="top-logo-image text-center">
                <h1>LOGO</h1>
            </div>
            <div className="navigation-menus">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <NavLink to={"/dashboard"}>
                            <Accordion.Header>
                                <span>
                                    {SVGICON.DashboardSvg}
                                </span>
                                Dashboard
                            </Accordion.Header>
                        </NavLink>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Link className={`${isContent && "active"} accordian-active-link`}>
                            <Accordion.Header>
                                <span>
                                    {SVGICON.ContentManagementSvg}
                                </span>
                                Content Management
                            </Accordion.Header>
                        </Link>
                        <Accordion.Body>
                            <div className="accordian-inner-navlists">
                                <ul>
                                    <li>
                                        <NavLink to={"/content-management"}> <span><i className="fa-solid fa-angle-right"></i> </span> Manage Sector</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/manage-clients"}> <span><i className="fa-solid fa-angle-right"></i> </span> Manage Clients</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item eventKey="2">
                        <NavLink to={"/user-management"}>
                            <Accordion.Header>
                                <span>
                                    {SVGICON.UserManagementSvg}
                                </span>
                                User Management
                            </Accordion.Header>
                        </NavLink>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <NavLink to={"/assessment"}>
                            <Accordion.Header>
                                <span>
                                    {SVGICON.AssessmentSvg}
                                </span>
                                Assessment
                            </Accordion.Header>
                        </NavLink>
                        <Accordion.Body>
                            <div className="accordian-inner-navlists">
                                <ul>
                                    <li>
                                        <NavLink to={"/assessment"}> <span><i className="fa-solid fa-angle-right"></i> </span> Batch Upload</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/manage-job-role"}> <span><i className="fa-solid fa-angle-right"></i> </span> Manage Job Role</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/manage-nos"}> <span><i className="fa-solid fa-angle-right"></i> </span> Manage NOS</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/manage-scheme"}> <span><i className="fa-solid fa-angle-right"></i> </span> Manage Scheme</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/manage-question-bank"}> <span><i className="fa-solid fa-angle-right"></i> </span> Manage Question Bank</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/manage-child-user"}> <span><i className="fa-solid fa-angle-right"></i> </span> Manage Child User</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item> */}
                    {/* <Accordion.Item eventKey="4">
                        <NavLink to={"/monitoring"}>
                            <Accordion.Header>
                                <span>
                                    {SVGICON.MonitoringSvg}
                                </span>
                                Monitoring
                            </Accordion.Header>
                        </NavLink>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <NavLink to={"/reports"}>
                            <Accordion.Header>
                                <span>
                                    {SVGICON.ReportsSvg}
                                </span>
                                Reports
                            </Accordion.Header>
                        </NavLink>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                        <NavLink to={"/support"}>
                            <Accordion.Header>
                                <span>
                                    {SVGICON.SupportSvg}
                                </span>
                                Support
                            </Accordion.Header>
                        </NavLink>
                        <Accordion.Body>
                            <div className="accordian-inner-navlists">
                                <ul>
                                    <li>
                                        <NavLink to={"/support"}> <span><i className="fa-solid fa-angle-right"></i> </span> Open Ticket</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/close-ticket"}> <span><i className="fa-solid fa-angle-right"></i> </span> Closed Ticket</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/user-manual"}> <span><i className="fa-solid fa-angle-right"></i> </span> User Manual</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="7">
                        <NavLink to={"/analystics-report"}>
                            <Accordion.Header>
                                <span>
                                    {SVGICON.AnalyticsReportSvg}
                                </span>
                                Analytics Report
                            </Accordion.Header>
                        </NavLink>
                    </Accordion.Item> */}
                </Accordion>
            </div>
        </div>
    )
}

export default SideBar