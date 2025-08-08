import React from "react";
import { CheckOutlined } from "@ant-design/icons";

function CardBodyContent(props) {
    return (
        <div className="col">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <ul>
                        {props.items.map((item, index) => (
                            <li key={index}><CheckOutlined /> {item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CardBodyContent;
