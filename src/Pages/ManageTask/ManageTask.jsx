import { useEffect, useState } from 'react';
import useGetUserTasks from '../../Hooks/useGetUserTasks';
import Swal from 'sweetalert2';
import TaskAddingModal from '../../Components/TaskAddingModal/TaskAddingModal';
import useAxios from '../../Hooks/useAxios';
import SearchingByTitleModal from '../../Components/SearchingbyTitleModal/SearchingByTitleModal';

const ManageTask = () => {
    const [tasks, refetch, isError] = useGetUserTasks();
    const [tasksToPreview,setTasksToPriview] = useState([])
    const [isErrorFromSearch,setIsErrorFromSearch] = useState(false)
    console.log(tasks);
    console.log(tasksToPreview);
    const axiosPublic = useAxios()

    useEffect(() => {
        setTasksToPriview(tasks)
        if (isError) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else if(isErrorFromSearch){
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Failed to search task",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }, [isError,tasks,isErrorFromSearch]);

    const handleUpdateTaskStatus = async (taskId, statusValue) => {
        // console.log(taskStatus);
        try {
            const response = await axiosPublic.patch(`/todos/updateTask/${taskId}`, { status: statusValue })
            // console.log(response?.data?.data);
            if (response?.data?.success) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Task Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
            else {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Failed to update task",
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

    const handleDeleteTask=async(taskId)=>{
        // console.log(taskId);
        try {
            const response = await axiosPublic.delete(`/todos/deleteTask/${taskId}`)
            // console.log(response);
            if (response?.data?.success) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Task deleted Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
            else {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Failed to delete task",
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

    const handleCheckboxChange = async (taskId) => {
        const doneStatusValue = "done"
        await handleUpdateTaskStatus(taskId, doneStatusValue)
    }

    const handleStatusChange = async (e, taskId) => {
        const statusValue = e.target.value
        await handleUpdateTaskStatus(taskId, statusValue)

    }

    return (
        <div className='w-[90%] mx-auto my-10'>
            <div className='flex justify-between mb-7'>
                <div>
                    <p className='font-medium text-xl'>Task List</p>
                </div>
                <div className='space-x-5 text-lg'>
                    <i onClick={() => document.getElementById('my_modal_3').showModal()} className="fa-solid fa-plus"></i>
                    <i onClick={()=>document.getElementById('my_modal_2').showModal()} className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <div>
                {tasksToPreview?.length > 0 ? (
                    <table className=' w-full'>
                        <thead>
                            <tr className="border-b-2">
                                <th className="px-4 py-2 text-left">Task</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Create Date</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasksToPreview?.map((task, idx) => (

                                <tr key={idx} className="border-b-2">
                                    <td className="px-4 py-2">
                                        <label className="cursor-pointer flex items-center">
                                            <input type="checkbox" disabled={task?.status === "done"}
                                                checked={task?.status === "done"}
                                                onChange={() => handleCheckboxChange(task.id)}
                                                className="checkbox checkbox-success mr-2" />
                                            {task?.title}
                                        </label>
                                    </td>
                                    <td className="px-4 py-2">{task?.description}</td>
                                    <td className="px-4 py-2">{task?.createdAt}</td>
                                    <td className="px-4 py-2">
                                        <select
                                            value={task?.status}
                                            onChange={(e) => handleStatusChange(e, task?.id)}
                                            disabled={task?.status === "done"}
                                            className="select select-bordered max-w-xs"
                                        >
                                            <option disabled value="">Select Status</option>
                                            <option value="todo">Upcoming</option>
                                            <option value="going">Ongoing</option>
                                            <option value="done">Completed</option>
                                        </select>

                                    </td>

                                    <td className="px-4 py-2">
                                        <button onClick={()=>handleDeleteTask(task?.id)} className="bg-red-500 text-white px-4 py-1 rounded"><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='h-[50vh] flex justify-center items-center font-semibold text-2xl'>
                        <h2>No tasks to show</h2>
                    </div>
                )}
            </div>
            <TaskAddingModal id="my_modal_3" refetch={refetch} />
            <SearchingByTitleModal 
            id="my_modal_2"
            setIsErrorFromSearch={setIsErrorFromSearch}
            setTasksToPriview={setTasksToPriview}
            ></SearchingByTitleModal>
        </div>
    );
};

export default ManageTask;
