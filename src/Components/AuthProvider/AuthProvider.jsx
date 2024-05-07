import {  createContext, useState } from "react";

export const authContext=createContext(null)
const AuthProvider=({children})=>{
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("userId")))
    const authInfo = {currentUser,setCurrentUser}

    return <authContext.Provider value={authInfo}>
        {children}
    </authContext.Provider>
}

export default AuthProvider