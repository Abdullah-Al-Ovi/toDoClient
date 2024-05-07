import { useEffect } from 'react';
import useIsAuthenticated from '../../Hooks/useIsAuthenticated';
import useGetUserTasks from '../../Hooks/useGetUserTasks';
import Swal from 'sweetalert2';
import TaskTable from '../../Components/TaskTable/TaskTable';
import TaskAddingModal from '../../Components/TaskAddingModal/TaskAddingModal';

const ManageTask = () => {
    const [tasks, refetch, isError] = useGetUserTasks();

    useEffect(() => {
        if (isError) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }, [isError]);

    return (
        <div className='w-[90%] mx-auto my-10'>
            <div className='flex justify-between mb-7'>
                <div>
                    <p className='font-medium text-xl'>Task List</p>
                </div>
                <div className='space-x-5 text-lg'>
                    <i onClick={() => document.getElementById('my_modal_3').showModal()} className="fa-solid fa-plus"></i>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <div>
                {tasks?.length > 0 ? (
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
                            {tasks.map((task, idx) => (

                                <tr key={idx} className="border-b-2">
                                    <td className="px-4 py-2">
                                        <label className="cursor-pointer flex items-center">
                                            <input type="checkbox" disabled={task?.status === "done"} defaultChecked={task?.status === "done"} className="checkbox checkbox-success mr-2" />
                                            {task?.title}
                                        </label>
                                    </td>
                                    <td className="px-4 py-2">{task?.description}</td>
                                    <td className="px-4 py-2">{task?.createdAt}</td>
                                    <td className="px-4 py-2">
                                        <select disabled={task?.status === "done"} className="select select-bordered max-w-xs">
                                            <option disabled selected>{
                                                task?.status === "todo" ? "Upcoming" :
                                                task?.status === "going" ? "Ongoing" :
                                                task?.status === "done" ? "Completed" : null
                                            }</option>
                                            { task?.status === "todo" || <option>Upcoming</option>}
                                           { task?.status === "going" || <option>Ongoing</option> }
                                           { task?.status === "done" || <option>Completed</option> }
                                        </select>
                                    </td>

                                    <td className="px-4 py-2">
                                        <button className="bg-red-500 text-white px-4 py-1 rounded"><i className="fa-solid fa-trash"></i></button>
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
        </div>
    );
};

export default ManageTask;
