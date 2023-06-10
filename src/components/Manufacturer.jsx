import React, { useContext, useEffect, useState } from "react";
import { publicReq, userReq } from "../requestAPI";
import { User } from "../Context/context";
import Message from "./Message";


let num = 100000;
function Manufacturer(){
    const [transporters, setTransporters] = useState([]);
    const [responses, setResponses] = useState([]);

    const [orderid, setOrderid] = useState("");
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [quantity, setQuantity] = useState("1 ton");
    const [address, setAddress] = useState("");
    const [transporter, setTransporter] = useState("default");
    const [err, setErr] = useState(false);

    const [query,setQuery] = useState("");
    const keys = ["orderId", "to", "from"]; 

    const {user} = useContext(User);

    const alphanumeric_id = () => {
        let k = Math.floor(Math.random()*100000)+11;
        // console.log(k);
        num += k;
        return num.toString(16);
    }

    useEffect(()=>{
        const order_id = alphanumeric_id();
        setOrderid(order_id);
        setAddress(user.address);

        const getTransporters = async () => {
            try{
                const res = await publicReq.get('/users/transporter');
                // console.log(res);
                setTransporters(res.data);
            } catch(err){
                console.log(err.response.data);
            }
        };
        getTransporters();

        const getResponses = async () => {
            try{
                const res = await publicReq.get('/responses/' + user.id);
                console.log(res);
                setResponses(res.data);
                // console.log(responses);
            } catch(err){
                console.log(err.response.data);
            }
        };
        getResponses();

    }, [])

    const res = () => {
        responses.map((k) => { 
            
        });
    }
    res();
    
    

    // console.log(transporters);
    
    const search = (data) => {
        return data.filter((item) => item.orderId.toLowerCase().includes(query) || item.order.to.toLowerCase().includes(query) || item.order.from.toLowerCase().includes(query));
    }

    const handleTo = (e) => {
        setTo(e.target.value);
    }

    const handleFrom = (e) => {
        setFrom(e.target.value);
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value);
        // console.log(e.target.value);
    }

    const handleTransporter = (e) => {
        setTransporter(e.target.value);
        // console.log(e.target.value);
    }

    const handleSend = (e) => {
        if(to && from && transporter){
            const sendMsg = async () => {
                try{
                    const res = await userReq.post('/orders/',{
                        userId: user.id,
                        orderId: orderid,
                        to: to,
                        from: from,
                        quantity: quantity,
                        address: address,
                        transporter: transporter
                    });
                    console.log(res);
                } catch(err){
                    setErr(true);
                }
            }
            sendMsg();
            setErr(false);
            setOrderid("")
            setTo("");
            setFrom("");
            setQuantity("1 ton");
            setTransporter("default");
            setOrderid(alphanumeric_id());
        } else{ 
            setErr(true);
        };
        e.preventDefault();
    }

    return(
        <div className="container">
                <div className="input-container">
                    <form>
                        <fieldset className="input-form">
                            <legend>Input Form</legend>
                            <div className="input-form-field">
                                <label htmlFor="">Order ID</label>
                                <input type="text" name="order-id" placeholder=" " value={orderid} disabled/>
                            </div>
                            <div className="input-form-field">
                                <label htmlFor="">To</label>
                                <input type="text" onChange={handleTo} name="to" placeholder=" " value={to} />
                            </div>
                            <div className="input-form-field">
                                <label htmlFor="">From</label>
                                <input type="text" onChange={handleFrom} name="from" placeholder=" " value={from} />
                            </div>
                            <div className="input-form-field">
                                <label htmlFor="">Quantity</label>
                                <select onChange={handleQuantity} className="select-wrapper" name="quantity" value={quantity}>
                                    <option value="1 ton">1 ton</option>
                                    <option value="2 ton">2 ton</option>
                                    <option value="3 ton">3 ton</option>
                                </select>
                            </div>
                            <div className="input-form-field">
                                <label htmlFor="">Address</label>
                                <input type="text" name="address" placeholder=" " value={user.address} disabled/>
                            </div>
                            <div className="input-form-field">
                                <label htmlFor="">Transporter</label>
                                <select onChange={handleTransporter} defaultValue={'default'} className="select-wrapper" name="transporter" value={transporter}>
                                    <option disabled value="default"> -- select a transporter -- </option>
                                    {transporters.map((k)=>{
                                        return <option value={k.name}>{k.name}</option>
                                    })}
                                </select>
                            </div>
                            <button type="submit" className="send-btn" onClick={handleSend}>Send</button>
                        </fieldset>
                    </form>
                </div>
                <div className="messages-container">
                    <div className="search-bar">
                        <label htmlFor=" ">Search (like OrderID/to/from values):  </label>
                        <input type="text" placeholder="Search your orders ..." className="search" onChange={(e) => {setQuery(e.target.value)}} />
                    </div> 
                    <Message data={search(responses)} name="response"/>
                </div>
            </div>
    )
};

export default Manufacturer;
