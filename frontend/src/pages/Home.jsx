import React from "react";
import Navigator from "../components/HomeComponents/Navigator.jsx";
import Carousel from "../components/HomeComponents/Carousel.jsx";
import Introduction from "../components/HomeComponents/Introduction.jsx";
import Card from "../components/HomeComponents/Card.jsx";
import Footer from "../components/HomeComponents/Footer.jsx";

function Home() {
    return(
        <div className="home-container">
            <Navigator/>
            <Carousel/>
            <Introduction/>
            <Card/>
            <Footer/>
        </div>
    );
}

export default Home;