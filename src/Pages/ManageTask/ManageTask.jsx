import { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';
import TaskTable from '../../Components/TaskTable/TaskTable';


const ManageTask = () => {
    const [tasksToShow, setTasksToShow] = useState([])
    const axiosPublic = useAxios()

    useEffect(() => {
        async function fetchUserTask() {
            try {
                const response = await axiosPublic.get(`/todos/myTasks/${JSON.parse(localStorage.getItem("userId"))}`)
                console.log(response?.data);
                if (response?.data?.success) {
                    setTasksToShow(response?.data?.data)
                }
                else {
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "Something went wrong",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${error?.response?.data?.message || error?.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        fetchUserTask()
    }, [])
    return (
        <div className='w-[90%] mx-auto my-10'>
            <div className='flex justify-between mb-7'>
                <div>
                    <p className='font-medium text-xl'>Task List</p>
                </div>
                <div className='space-x-5 text-lg'>
                    <i className="fa-solid fa-plus"></i>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
          <div>
          {
                tasksToShow?.length > 0 
                ?
                tasksToShow?.map((task,idx)=>{
                    return <TaskTable key={idx} task={task}></TaskTable>
                })
                :
                <h2>No tasks to show</h2>
            }
          </div>
        </div>
    );
};

export default ManageTask;