import { useEffect, useState } from "react";


const useIsAuthenticated = () => {
 const [userEmail, setUserEmail] = useState(null)
 const [userId, setUserId] = useState(null)
 useEffect(()=>{
    const storedUserEmail = localStorage.getItem("userEmail")
    const storedUserId = localStorage.getItem("userId")
    if(storedUserEmail && storedUserId){
        try {
            const userEmailJson = JSON.parse(storedUserEmail)
            setUserEmail(userEmailJson)
            const storedUserIdJson = JSON.parse(storedUserId)
            setUserId(storedUserIdJson)
        } catch (error) {
            console.log(error);
        }
    }
 },[])
   return{ userEmail, userId};
};

export default useIsAuthenticated;