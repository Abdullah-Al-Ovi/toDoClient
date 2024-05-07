const TaskTable = ({ task }) => {
    const { title, description, createdAt, status } = task;
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              
                <tbody>
                    <tr className="border-b-2">
                        <td className="px-4 py-2">
                            <label className="cursor-pointer flex items-center">
                                <input type="checkbox" disabled={status === "done"} defaultChecked={status === "done"} className="checkbox checkbox-success mr-2" />
                                {title}
                            </label>
                        </td>
                        <td className="px-4 py-2">{description}</td>
                        <td className="px-4 py-2">{createdAt}</td>
                        <td className="px-4 py-2">
                        <select disabled={status === "done"} className="select select-bordered max-w-xs">
                            <option disabled selected>{status}</option>
                            <option>Upcoming</option>
                            <option>Ongoing</option>
                            <option>Completed</option>
                        </select>
                        </td>
                        
                        <td className="px-4 py-2">
                            <button className="bg-red-500 text-white px-4 py-1 rounded"><i className="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
