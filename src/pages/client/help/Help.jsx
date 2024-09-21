import React from 'react'
import Header from '../../../components/header/admin/Header'
import Video from "../../../images/Batch-upload.mp4"
import "./Help.scss"

const Help = () => {
    return (
        <>
            <Header name="Support" />
            <section className="help-video-section">
                <h2 className="main-title">Video Support</h2>
                <div className="videos-collection-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-sm-6">
                                <div className="card-body">
                                    <video width={"100%"} controls>
                                        <source src={Video} type="video/mp4" />
                                        <source src={Video} type="video/ogg" />
                                        Your browser does not support HTML video.
                                    </video>
                                    <div className="video-post-content">
                                        <h3>Batch Upload</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="card-body">
                                    <video width={"100%"} controls>
                                        <source src={Video} type="video/mp4" />
                                        <source src={Video} type="video/ogg" />
                                        Your browser does not support HTML video.
                                    </video>
                                    <div className="video-post-content">
                                        <h3>Batch Upload</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="card-body">
                                    <video width={"100%"} controls>
                                        <source src={Video} type="video/mp4" />
                                        <source src={Video} type="video/ogg" />
                                        Your browser does not support HTML video.
                                    </video>
                                    <div className="video-post-content">
                                        <h3>Batch Upload</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="card-body">
                                    <video width={"100%"} controls>
                                        <source src={Video} type="video/mp4" />
                                        <source src={Video} type="video/ogg" />
                                        Your browser does not support HTML video.
                                    </video>
                                    <div className="video-post-content">
                                        <h3>Batch Upload</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="card-body">
                                    <video width={"100%"} controls>
                                        <source src={Video} type="video/mp4" />
                                        <source src={Video} type="video/ogg" />
                                        Your browser does not support HTML video.
                                    </video>
                                    <div className="video-post-content">
                                        <h3>Batch Upload</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="card-body">
                                    <video width={"100%"} controls>
                                        <source src={Video} type="video/mp4" />
                                        <source src={Video} type="video/ogg" />
                                        Your browser does not support HTML video.
                                    </video>
                                    <div className="video-post-content">
                                        <h3>Batch Upload</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="card-body">
                                    <video width={"100%"} controls>
                                        <source src={Video} type="video/mp4" />
                                        <source src={Video} type="video/ogg" />
                                        Your browser does not support HTML video.
                                    </video>
                                    <div className="video-post-content">
                                        <h3>Batch Upload</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Help