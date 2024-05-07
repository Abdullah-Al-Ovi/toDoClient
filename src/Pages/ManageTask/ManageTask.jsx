import React, { useContext, useEffect } from 'react';
import { authContext } from '../../Components/AuthProvider/AuthProvider';
import useAxios from '../../Hooks/useAxios';

const ManageTask = () => {
    const {currentUser} = useContext(authContext)
    const userId = currentUser?.id
    const axiosPublic = useAxios()
    useEffect(()=>{
        async function fetchUserTask(){
            const response = await axiosPublic.get("/users/:userId")
            console.log(response?.data);
        }
        fetchUserTask()
    },[])
    return (
        <div>
           todo 
        </div>
    );
};

export default ManageTask;