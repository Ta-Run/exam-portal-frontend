import React from 'react';
import { Link } from 'react-router-dom';
import CandidateCount from './../../../components/candidate-count/CandidateCount';
import BarChartCom from './../../../components/bar-chart/BarChartCom';
import Header from '../../../components/header/client/Header';

const Dashboard = () => {

    return (
        <>
            <Header name="Dashboard" />
            <section className='dashboard-section'>
                <div className="top-cards-wrapper justify-content-between">
                    <div className="row">
                        <div className="col-xxl-3 col-md-4 col-sm-6">
                            <div className="card-area" style={{ backgroundColor: "#FEEDE2" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-1.svg" alt="Sector" className='img-fluid' />
                                            </div>
                                            <div className="link">
                                                <Link> <span className='me-2'> More info </span> <i className="fa-solid fa-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#F37321" }}>
                                                <h4>2</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Sector</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-4 col-sm-6">
                            <div className="card-area" style={{ backgroundColor: "#E2FEF6" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-2.svg" alt="Registered Assessor" className='img-fluid' />
                                            </div>
                                            <div className="link">
                                                <Link> <span className='me-2'> More info </span> <i className="fa-solid fa-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#20FFBF" }}>
                                                <h4>9</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Registered Assessor</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-4 col-sm-6">
                            <div className="card-area" style={{ backgroundColor: "#E2FCFE" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-3.svg" alt="Candidates Enrolled" className='img-fluid' />
                                            </div>
                                            <div className="link">
                                                <Link> <span className='me-2'> More info </span> <i className="fa-solid fa-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#20FFBF" }}>
                                                <h4>650</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Candidates Enrolled</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-4 col-sm-6">
                            <div className="card-area" style={{ backgroundColor: "#D5DFF4" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-4.svg" alt="Candidates Assessed" className='img-fluid' />
                                            </div>
                                            <div className="link">
                                                <Link> <span className='me-2'> More info </span> <i className="fa-solid fa-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#6B57E9" }}>
                                                <h4>650</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Candidates Enrolled</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-4 col-sm-6">
                            <div className="card-area" style={{ backgroundColor: "#DFFEFF" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-4.svg" alt="Total Batches" className='img-fluid' />
                                            </div>
                                            <div className="link">
                                                <Link> <span className='me-2'> More info </span> <i className="fa-solid fa-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#00E8EF" }}>
                                                <h4>2</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Total Batches</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-4 col-sm-6">
                            <div className="card-area" style={{ backgroundColor: "#FFE1F4" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-4.svg" alt="Current Batches" className='img-fluid' />
                                            </div>
                                            <div className="link">
                                                <Link> <span className='me-2'> More info </span> <i className="fa-solid fa-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#F8009D" }}>
                                                <h4>9</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Current Batches</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-4 col-sm-6">
                            <div className="card-area" style={{ backgroundColor: "#E5E1FF" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-4.svg" alt="Scheduled Batches" className='img-fluid' />
                                            </div>
                                            <div className="link">
                                                <Link> <span className='me-2'> More info </span> <i className="fa-solid fa-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#5338FF" }}>
                                                <h4>650</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Scheduled Batches</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-3 col-md-4 col-sm-6">
                            <div className="card-area" style={{ backgroundColor: "#FFF4E7" }}>
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="left-side-area">
                                            <div className="icon mb-4">
                                                <img src="/img/dashboard/dashboard-icon-2.svg" alt="Completed Batches" className='img-fluid' />
                                            </div>
                                            <div className="link">
                                                <Link> <span className='me-2'> More info </span> <i className="fa-solid fa-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="right-side-area text-end">
                                            <div className="number mb-4" style={{ borderColor: "#F98700" }}>
                                                <h4>650</h4>
                                            </div>
                                            <div className="text">
                                                <h5>Completed Batches</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="today-assessment-status-wrapper">
                    <div className="top-text">
                        <h4>Today Assessment Status</h4>
                    </div>
                    <div className="row">
                        <div className="col-xxl-4 col-md-5 mb-md-0 mb-4">
                            <div className="left-side-box">
                                <div className="box-wrapper mb-4 d-flex justify-content-between align-items-center">
                                    <div className="l-side-icon">
                                        <img src="/img/dashboard/dashboard-icon-5.svg" alt="Assessment Inprogress" className='img-fluid mb-4' />
                                        <div className="link">
                                            <a href="">
                                                <span className='me-2'>More info</span>
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="r-side-content text-center">
                                        <h5>Assessment Inprogress</h5>
                                        <h3>0</h3>
                                    </div>
                                </div>
                                <div className="box-wrapper d-flex justify-content-between align-items-center">
                                    <div className="l-side-icon">
                                        <img src="/img/dashboard/dashboard-icon-6.svg" alt="Assessment completed Today" className='img-fluid mb-4' />
                                        <div className="link">
                                            <a href="">
                                                <span className='me-2'>More info</span>
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="r-side-content text-center">
                                        <h5>Assessment completed Today</h5>
                                        <h3>0</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-8 col-md-7">
                            <CandidateCount />
                        </div>
                    </div>
                    <div className="select-box-groups-wrapper my-4">
                        <div className="row">
                            <div className="col-sm-4 mb-sm-0 mb-3">
                                <label htmlFor="sector" className="form-label">Sector</label>
                                <select className="form-select" id='sector'>
                                    <option>Please select</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                            <div className="col-sm-4 mb-sm-0 mb-3">
                                <label htmlFor="jobRule" className="form-label">Job Role</label>
                                <select className="form-select" id='jobRule'>
                                    <option>Please select</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="batch" className="form-label">Batch</label>
                                <select className="form-select" id='batch'>
                                    <option>Please select</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <BarChartCom />
                </div>
            </section>
        </>
    )
}

export default Dashboard