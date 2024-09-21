import React from 'react'
import "./Loader.scss"

const Loader = () => {
    return (
        <div className="page-loader">
            <svg
                version="1.1"
                id="L5"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
            >
                <circle fill="#ffffff" stroke="none" cx="26" cy="50" r="6">
                    <animateTransform
                        attributeName="transform"
                        dur="1s"
                        type="translate"
                        values="0 15 ; 0 -15; 0 15"
                        repeatCount="indefinite"
                        begin="0.1"
                    ></animateTransform>
                </circle>
                <circle fill="#ffffff" stroke="none" cx="50" cy="50" r="6">
                    <animateTransform
                        attributeName="transform"
                        dur="1s"
                        type="translate"
                        values="0 10 ; 0 -10; 0 10"
                        repeatCount="indefinite"
                        begin="0.2"
                    ></animateTransform>
                </circle>
                <circle fill="#ffffff" stroke="none" cx="74" cy="50" r="6">
                    <animateTransform
                        attributeName="transform"
                        dur="1s"
                        type="translate"
                        values="0 5 ; 0 -5; 0 5"
                        repeatCount="indefinite"
                        begin="0.3"
                    ></animateTransform>
                </circle>
            </svg>
        </div>
    )
}

export default Loader