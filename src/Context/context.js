import { createContext, useReducer, useState } from "react";

export const User = createContext();
 
const Context = ({children}) => {
    const [user, setUser] = useState({
        loggedIn: false,
        id: "",
        name: "",
        email:"",
        role:"",
        address:""
    });

    return <User.Provider value={{user, setUser}}>{children}</User.Provider>
}

export default Context;
