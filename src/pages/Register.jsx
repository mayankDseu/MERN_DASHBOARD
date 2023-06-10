import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicReq } from "../requestAPI";
import { User } from "../Context/context";



function Register(){
    const [err, setErr] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, [])

    const { setUser } = useContext(User);

    const handleUsername = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmpass = (e) => {
        setConfirmpass(e.target.value);
    }

    const handleAddress = (e) => {
        setAddress(e.target.value);
        // console.log(e.target.value);
    }

    const handleSubmit = (e) => {
        if(password === confirmpass){
            setErr(false);
            const registerData = async () => {
                try{
                    const res = await publicReq.post('/auth/register',{
                        name: name,
                        email: email,
                        password: password,
                        address: address,
                        role: role
                    });
                    console.log(res.data);
                    localStorage.setItem("user", JSON.stringify({loggedIn: true, id:`${res.data._id}`, name:`${res.data.name}`, email:`${res.data.email}`, role: `${res.data.role}`, address: `${res.data.address}`}))
                    setUser({loggedIn: true, id:`${res.data._id}`, name:`${res.data.name}`, email:`${res.data.email}`, role: `${res.data.role}`, address: `${res.data.address}`});
                } catch(err){
                    //console.log(err.response.data);
                }
            }
            registerData();
        } else{
            setErr(true);
        }
        e.preventDefault();
    }

    return (
        <div className="signup-page">
            <div className="signup-box">
                <form className="signup-form">
                    <h3>Register</h3>
                    <div className="input-field">
                        <input type="text" name="name" placeholder=" " onChange={handleUsername} />
                        <label for="">Name</label>
                    </div>
                    <div className="input-field">
                        <input type="email" name="email" placeholder=" " onChange={handleEmail} />
                        <label for="">Email</label>
                    </div>
                    <div className="input-field">
                        <input type="password" name="password" placeholder=" " onChange={handlePassword} />
                        <label for="">Password</label>
                    </div>
                    <div className="input-field">
                        <input type="password" name="confirm_password" placeholder=" " onChange={handleConfirmpass} />
                        <label for="">Confirm Password</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="address" placeholder=" " onChange={handleAddress} />
                        <label for="">Address</label>
                    </div>
                    <div className="radio-field">
                        <div>
                            <input type="radio" id="html" name="role" value="manufacturer" onChange={()=>setRole("manufacturer")} />
                            <label for="html">Manufacturer</label>
                        </div>
                        <div>
                            <input type="radio" id="html" name="role" value="transporter" onChange={()=>setRole("transporter")} />
                            <label for="html">Transporter</label>
                        </div>
                    </div>
                    {err && <p style={{color: "red"}}>Wrong Credentials.</p>}
                    <button type="submit" className="btn btn-light signup-btn" onClick={handleSubmit}>Sign Up</button>
                    <div className="auth-link">
                        <p>Already have an account? <Link to="/login"><a>Login</a></Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
