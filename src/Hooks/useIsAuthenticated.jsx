import { useEffect, useState } from "react";


const useIsAuthenticated = () => {
 const [userEmail, setUserEmail] = useState(null)
 useEffect(()=>{
    const storedUserEmail = localStorage.getItem("userEmail")
    if(storedUserEmail){
        try {
            const userEmailJson = JSON.parse(storedUserEmail)
            setUserEmail(userEmailJson)
        } catch (error) {
            console.log(error);
        }
    }
 },[])
   return{ userEmail};
};

export default useIsAuthenticated;