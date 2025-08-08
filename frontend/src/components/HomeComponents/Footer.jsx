import React from "react";
import {FacebookFilled, InstagramFilled, TwitterSquareFilled} from "@ant-design/icons";
import FooterNavContent from "./FooterNavContent.jsx";
const footerData = [
    {
        title:"Solutions",
        items:[
            "Marketing",
            "Analyst",
            "Insight",
            "Commerce"
        ]
    },
    {
        title: "Support",
        items:[
            "Insight",
            "Analyst",
            "Marketing",
            "Commerce"

        ]
    },
    {
        title: "Company",
        items:[
            "Analyst",
            "Commerce",
            "Marketing",
            "Insight"

        ]
    },
    {
        title: "Legal",
        items:[
            "Commerce",
            "Analyst",
            "Insight",
            "Marketing"
        ]
    }
]
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-company-details">
                    <div className="footer-logo">{/* logo veya svg buraya */}</div>
                    <div className="footer-content">
                        <p>
                            IBANK Ltd. is a forward-thinking digital banking platform committed to redefining financial
                            experiences. Founded with the vision of delivering secure, accessible, and personalized
                            banking services, IBANK empowers individuals and businesses with cutting-edge tools to
                            manage their finances efficiently.
                        </p>
                    </div>
                    <div className="footer-icons">
                        <ul>
                            <li><a href="#"><FacebookFilled /></a></li>
                            <li><a href="#"><TwitterSquareFilled /></a></li>
                            <li><a href="#"><InstagramFilled /></a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-navbar">
                    {/* Her .footer-navbar-col sabit */}
                    {footerData.map((item, index) => (
                        <FooterNavContent
                            key={index}
                            title={item.title}
                            items={item.items}
                        />
                    ))}
                </div>

                <div className="footer-copyright">
                    <p>© {new Date().getFullYear()} IBANK Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;