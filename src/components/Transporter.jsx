import React, { useContext, useEffect, useState } from "react";
import { publicReq, userReq } from "../requestAPI";
import { User } from "../Context/context";
import Message from "./Message";

function Transporter(){
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [err, setErr] = useState(false);
    const {user} = useContext(User);

    const [query,setQuery] = useState("");
    const keys = ["orderId", "to", "from"]; 

    const [orderid, setOrderid] = useState("default");
    const [price, setPrice] = useState();

    useEffect(()=>{
        const getOrders = async () => {
            try{
                const res = await publicReq.get("/orders/" + user.name);
                console.log(res);
                setOrders(res.data);
            } catch(err){
                console.log(err.response.data);
            }
        }
        getOrders();
    }, []);

    const search = (data) => {
        return data.filter((item) => item.orderId.toLowerCase().includes(query) || item.to.toLowerCase().includes(query) || item.from.toLowerCase().includes(query));
    }

    const handleOrder = (e) => {
        setOrderid(e.target.value);
    }

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleReply = (e) => {
        const order = orders.filter(k => k.orderId === orderid);
        if(orderid && price){
            const replyMsg = async () => {
                try{
                    const res = await userReq.post('/responses/',{
                        senderId: order[0].userId,
                        order: order[0],
                        orderId: orderid,
                        price: price
                    });
                    console.log(res);
                } catch(err){
                    setErr(true);
                }
            }
            replyMsg();
            setErr(false);
            setOrderid("default")
            setPrice(0);

            const deleteOrder = async () => {
                try{
                    const res = await userReq.delete('/responses/' + order._id);
                    console.log(res);
                } catch(err){
                    setErr(true);
                }
            }
            deleteOrder();
        } else{ 
            setErr(true);
        };
        e.preventDefault();
    }

    return (
        <div className="container">
            <div className="input-container">
                <form>
                    <fieldset className="input-form">
                        <legend>Input Form</legend>
                        <div className="input-form-field">
                            <label for="">Order ID</label>
                            <select onChange={handleOrder} defaultValue={'default'} className="select-wrapper" name="orderid" value={orderid}>
                                <option disabled value={'default'}> -- select -- </option>
                                {orders.map((order)=>{
                                    return <option value={order.orderId}>{order.orderId}</option>
                                })}
                            </select>
                        </div>
                        <div className="input-form-field">
                            <label for="">Price(in Rs.)</label>
                            <input onChange={handlePrice} type="number" name="price" placeholder=" " value={price} />
                        </div>
                        <button onClick={handleReply} className="send-btn" type="submit">Reply</button>
                    </fieldset>
                </form>
            </div>
            <div className="messages-container">
                <div className="search-bar">
                    <label htmlFor=" ">Search (like OrderID/to/from values):  </label>
                    <input type="text" placeholder="Search your orders ..." className="search" onChange={(e) => {setQuery(e.target.value)}} />
                </div>
                <Message data={search(orders)} name="order" />
            </div>
        </div>
    )
}

export default Transporter;
