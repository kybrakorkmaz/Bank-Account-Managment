import React from "react";

function FooterNavContent(props) {
    return (
        <div className="footer-navbar-col">
            <h5>{props.title}</h5>
            <ul>
                {props.items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default FooterNavContent;