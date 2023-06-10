import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ResponseBox from "../components/ResponseBox";
import { useLocation } from "react-router-dom";
import { publicReq } from "../requestAPI";
import Footer from "../components/Footer";

function Responsepage() {
    const location = useLocation();
    const id = (location.pathname.split('/')[2]);
    const [response, setResponse] = useState({});
    const [order, setOrder] = useState({});

    useEffect(() => {    
        const getResponse = async () => {
            try{
                const res = await publicReq.get("/responses/find/" + id);
                // console.log(res);
                setResponse(res.data[0]);
                console.log(response);
            }catch(err){
                console.log(err.response.data)
            }
        }
        getResponse();

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
            <ResponseBox key={response._id} orderId={response.orderId} to={order.to} from={order.from} address={order.address} quantity={order.quantity} transporter={order.transporter} price={response.price} />
            <Footer />
        </div>
    )
}

export default Responsepage;
