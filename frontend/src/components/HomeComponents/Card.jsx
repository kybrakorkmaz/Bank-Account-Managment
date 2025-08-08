import React from "react";
import CardBodyContent from "./CardBodyContent.jsx";
const cardData = [
    {
        title: "Strategy & Planning",
        items: [
            "Market research & risk assessment",
            "Goal-oriented financial roadmaps",
            "Data-driven decision making"
        ]
    },
    {
        title:  "Investment Policy",
        items: [
            "Diversified portfolio structures",
            "Asset allocation strategies",
            "Compliance with financial regulations"
        ]
    },
    {
        title:  "Wealth & Asset Management",
        items: [
            "Diversified investment portfolios",
            "Risk assessment & profiling",
            "Long-term wealth preservation"
        ]
    }
]
function Card(){
    return (
        <div className="card-wrapper">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {cardData.map((card, index) => (
                    <CardBodyContent
                        key= {index}
                        title={card.title}
                        items={card.items}
                    />
                ))}
            </div>
        </div>

    );
}

export default Card;