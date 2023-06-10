import React from "react";

function ResponseBox(order){
    return (
        <div class="message">
            <div className="message-field">
                <span><strong>OrderID:</strong></span>
                <p>{order.orderId}</p>
            </div>
            <div className="message-field">
                <span>To:</span>
                <p>{order.to}</p>
            </div>
            <div className="message-field">
                <span>From:</span>
                <p>{order.from}</p>
            </div>
            <div className="message-field">
                <span>Quantity:</span>
                <p>{order.quantity}</p>
            </div>
            <div className="message-field">
                <span>Address:</span>
                <p>{order.address}</p>
            </div>
            <div className="message-field">
                <span>Transporter:</span>
                <p>{order.transporter}</p>
            </div>
            <div className="message-field">
                <span>Price:</span>
                <p style={{color: "green"}}>Rs. {order.price}</p>
            </div>
        </div>
    )
}

export default ResponseBox;
