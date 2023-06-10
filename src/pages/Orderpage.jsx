import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import OrderBox from "../components/OrderBox";
import { useLocation } from "react-router-dom";
import { publicReq } from "../requestAPI";
import Footer from "../components/Footer";

function Orderpage() {
    const location = useLocation();
    const id = (location.pathname.split('/')[2]);
    const [order, setOrder] = useState({});

    useEffect(() => {    
        const getOrder = async () => {
            try{
                const res = await publicReq.get("/orders/find/" + id);
                // console.log(res);
                setOrder(res.data[0]);
                console.log(order);
            }catch(err){
                console.log(err.response.data)
            }
        }
        getOrder();
    }, [id])

    return (
        <div>
            <Navbar />
            <OrderBox key={order._id} orderId={order.orderId} to={order.to} from={order.from} quantity={order.quantity} address={order.address} transporter={order.transporter} />
            <Footer />
        </div>
    )
}

export default Orderpage;
