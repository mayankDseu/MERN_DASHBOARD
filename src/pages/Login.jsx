import React, { useContext, useEffect, useState } from "react";
import { publicReq } from "../requestAPI";
import { User } from "../Context/context";
import { Link } from "react-router-dom";

function Login(){
    const [err, setErr] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const { setUser } = useContext(User);

    useEffect(()=>{
        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, [])

    const handleChange = (e) => {
        setValues((prev) => ({...prev, [e.target.name]: [e.target.value]}))
        // console.log(values);
    }

    const handleSubmit = (e) => {
        const loginData = async () => {
            try{
                const res = await publicReq.post('/auth/login',{
                    email: values.email[0],
                    password: values.password[0]
                });
                console.log(res.data);
                localStorage.setItem("user", JSON.stringify({loggedIn: true, id:`${res.data._id}`, name:`${res.data.name}`, email:`${res.data.email}`, role: `${res.data.role}`, address: `${res.data.address}`}))
                setUser({loggedIn: true, id:`${res.data._id}`, name:`${res.data.name}`, email:`${res.data.email}`, role: `${res.data.role}`, address: `${res.data.address}`});
            } catch(err){
                // console.log(err.response.data);
                setErr(true);
            }
        }
        loginData();
        e.preventDefault();
    }

    return (
        <div className="login-page">
            <div className="login-box">
            <form className="login-form">
                <h3>Login</h3>
                <div className="input-field">
                    <ion-icon name="mail"></ion-icon>
                    <input type="text" name="email" placeholder=" " onChange={handleChange} />
                    <label htmlFor="">Email</label>
                </div>
                <div className="input-field">
                <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" name="password" placeholder=" " onChange={handleChange} />
                    <label htmlFor="">Password</label>
                </div>
                {err && <p style={{color: "red"}}>Invalid Credentials</p>}
                <button type="submit" className="btn btn-light login-btn" onClick={handleSubmit} >Login</button>
                <div className="auth-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Login;
