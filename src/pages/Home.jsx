import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Manufacturer from "../components/Manufacturer";
import Transporter from "../components/Transporter";
import { User } from "../Context/context";
import Footer from "../components/Footer";

let num = 100000;
function Home () {

    const {user} = useContext(User);

    return (
        <div>
            <Navbar />
            {user.role === "manufacturer"? <Manufacturer /> : <Transporter />} 
            <Footer />
        </div>
    )
}

export default Home;
