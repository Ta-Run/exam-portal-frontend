import React, { useContext, useState } from 'react';
import { SVGICON } from '../../../constants/IconList';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StateContext } from '../../../context/StateContext';
import { reqToSpocPersonLogOut } from '../../../reduxToolkit/services/spocPersonAuthServices';

const Header = ({ name }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isToogle, setIsToogle } = useContext(StateContext);

    // States
    const [isActive, setIsActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // handleIconClick
    const handleIconClick = () => {
        setIsActive(!isActive);
    };

    // handleSignOut
    const handleSignOut = () => {
        navigate("/spoc-person/login");
        dispatch(reqToSpocPersonLogOut());
    }

    return (
        <header className='main-header'>
            <nav className="navbar navbar-expand-xl p-0">
                <div className="container-fluid p-0">

                    <h2 className="navbar-main-text">{name}</h2>

                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#headerOffcanvas" aria-controls="headerOffcanvas">
                        <span><i className="fa-solid fa-bars-staggered"></i></span>
                    </button> */}

                    <div className="navbar-toggler cursor-pointer" onClick={() => setIsToogle(!isToogle)}>
                        {
                            !isToogle ? <i className="fa-solid fa-bars-staggered"></i> : <i className="fa-solid fa-xmark"></i>
                        }
                    </div>

                    <div className="offcanvas offcanvas-start" tabIndex={-1} id="headerOffcanvas">
                        <div className="offcanvas-header justify-content-end">
                            <span data-bs-dismiss="offcanvas"><i className="fa-solid fa-xmark"></i></span>
                        </div>
                        <div className="offcanvas-body align-items-center justify-content-between">
                            {/* <ul className="navbar-nav me-auto mb-2 mb-xl-0 d-xl-none">
                                <li className="nav-item" data-bs-dismiss="offcanvas">
                                    <Link to={"/client/dashboard"} className="nav-link">Dashboard</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Content Management
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/client/manage-sector"} className="dropdown-item">Manage SPOC Person</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/client/manage-job-role"} className="dropdown-item">Manage Job Role</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/client/manage-nos"} className="dropdown-item">Manage NOS</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/client/manage-scheme"} className="dropdown-item">Manage Scheme</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/client/manage-question-bank"} className="dropdown-item">Manage Question Bank</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/client/manage-child-user"} className="dropdown-item">Manage Child User</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item" data-bs-dismiss="offcanvas">
                                    <Link className="nav-link" to={"/user-management"}>User Management</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Assessment
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/assessment"} className="dropdown-item">Batch Upload</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/manage-job-role"} className="dropdown-item">Manage Job Role</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/manage-nos"} className="dropdown-item">Manage NOS</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/manage-scheme"} className="dropdown-item">Manage Scheme</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/manage-question-bank"} className="dropdown-item">Manage Question Bank</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/manage-child-user"} className="dropdown-item">Manage Child User</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item" data-bs-dismiss="offcanvas">
                                    <Link to={"/monitoring"} className="nav-link">Monitoring</Link>
                                </li>
                                <li className="nav-item" data-bs-dismiss="offcanvas">
                                    <Link to={"/reports"} className="nav-link">Reports</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Support
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/support"} className="dropdown-item">Open Ticket</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/close-ticket"} className="dropdown-item">Closed Ticket</Link>
                                        </li>
                                        <li data-bs-dismiss="offcanvas">
                                            <Link to={"/user-manual"} className="dropdown-item">User Manual</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item" data-bs-dismiss="offcanvas">
                                    <Link to={"/analystics-report"} className="nav-link">Analytics Report</Link>
                                </li>
                                <li className="nav-item" data-bs-dismiss="offcanvas" onClick={handleSignOut}>
                                    <Link className="nav-link">Sign Out</Link>
                                </li>
                            </ul> */}

                            {/* <form className="d-xl-none d-flex mobile-search" role="search">
                                <input className="form-control" type="text" name="search" placeholder="Search" aria-label="Search" />
                                <button type="submit">
                                    {SVGICON.SearchIcon}
                                </button>
                            </form> */}

                            <div className={`search d-xl-block d-none ${isActive ? 'active' : ''}`}>
                                <div className="icon" onClick={handleIconClick}>
                                    {SVGICON.SearchIcon}
                                </div>
                                <div className="input">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        id="mySearch"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='d-xl-flex d-none align-items-center'>
                                <div className="setting-icon">
                                    {SVGICON.SettingSvg}
                                </div>
                                <div className="dropdown user-profile-dropdown">
                                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className='me-3'><img src="/img/dashboard/profile-img.png" alt="User Profile" /></span>  Joo Muri
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li onClick={handleSignOut}>
                                            <Link className="dropdown-item">Sign Out</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header