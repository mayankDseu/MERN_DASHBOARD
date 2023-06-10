import React from "react";
import { Link } from "react-router-dom";

const Message = ({data, name}) => {
    return(   
        <div>
        {data?.map((order)=>{
            return(
                <Link style={{textDecoration: "none"}} to={`/${name}/${order.orderId}`}>
                    <div class="order">
                        <span>OrderID: {order.orderId}</span>
                    </div>
                </Link>
            )
        })}
        </div>    
    )
}

export default Message;
