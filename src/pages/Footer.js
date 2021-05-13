import React from "react";

export default function Footer() {
    return (
        <React.Fragment>
            <footer className="footer-wrapper">
                <ul className="footer-list">
                        <li className="footer-link"><p className="footer-text mb-0">© All rights reserved by Julius Goi</p></li>
                        <li className="footer-link"><p className="footer-text mb-0" >(+65) 8448 8240</p></li>
                        <li className="footer-link"><a className="footer-text" href="https://github.com/yongsannnn/exp-tracker-react" target="_blank" rel="noreferrer">Github</a></li>
                    </ul>
            </footer>
        </React.Fragment>

    )
}