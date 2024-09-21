import React from 'react'
import "./NoPageFound.scss"
import { Link } from 'react-router-dom'

const NoPageFound = () => {
    return (
        <section className='page-not-found-section'>
            <h1 className="error">404</h1>
            <div className="page">Ooops!!! The page you are looking for is not found</div>
            <Link to={"/"} className="back-home">Back to home</Link>
        </section>
    )
}

export default NoPageFound