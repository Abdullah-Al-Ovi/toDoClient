import { useState } from "react";
import useIsAuthenticated from "../../Hooks/useIsAuthenticated";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";


const TaskAddingModal = ({ id,refetch }) => {
    const [category, setCategory] = useState("")
    const {userId} = useIsAuthenticated()
    const axiosPublic = useAxios()
    const handleAddTask = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        try {
            const response = await axiosPublic.post("/todos/createTask",{
                userId,
                title,
                description: category
            })
            console.log(response?.data);
            if(response?.data?.success){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Task added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch()
            }
            else{
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Failed to add task",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: `${error?.response?.data?.message || error?.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        finally{
            handleCloseModal()
        }
    }
    
    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }
    const handleCloseModal = () => {
        const dialog = document.getElementById(id);
        dialog.close(); // Close the dialog
    }
    return (
        <div >
            <dialog id={id} className="modal">
                <div className="modal-box">
                    <h3 className="my-7 text-center text-lg font-medium">Add a new task</h3>
                    <form onSubmit={handleAddTask} className="w-[80%] mx-auto space-y-5" method="dialog">
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="title">Title</label>
                            <input className="border-2 px-[4px] py-2 rounded" type="text" name="title" placeholder="Title of the task" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-medium" htmlFor="description">Category</label>
                            <select onChange={handleCategoryChange} className="select select-bordered ">
                                <option disabled selected>Select Category</option>
                                <option value={"work"}>Work</option>
                                <option value={"personal"}> Personal</option>
                            </select>
                        </div>
                        {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
                        <input className="p-2 w-full bg-slate-900 text-white rounded" type="submit" value="Add to task" />
                    </form>
                    <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </div>
            </dialog>
        </div>
    );
};

export default TaskAddingModal;