import React, { useContext, useState } from 'react';
import "./Header.scss";
import { SVGICON } from '../../../constants/IconList';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reqToAdminLogOut } from '../../../reduxToolkit/services/adminAuthServices';
import { StateContext } from '../../../context/StateContext';

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
        navigate("/");
        dispatch(reqToAdminLogOut());
    }

    return (
        <header className='main-header'>
            <nav className="navbar navbar-expand-xl p-0">
                <div className="container-fluid p-0">

                    <h2 className="navbar-main-text">{name}</h2>

                    {/* <button className="navbar-toggler d-xl-block d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#headerOffcanvas" aria-controls="headerOffcanvas">
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