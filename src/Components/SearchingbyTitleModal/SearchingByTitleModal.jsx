import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import useIsAuthenticated from "../../Hooks/useIsAuthenticated";
import Swal from "sweetalert2";

const SearchingByTitleModal = ({ id, setIsErrorFromSearch, setTasksToPriview }) => {
    const [isLoading, setIsLoading] = useState(false)
    const axiosPublic = useAxios()
    const { userId } = useIsAuthenticated()

    const handleSearchTasksByTitle = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const searchValue = e.target.searchValue.value
        console.log(searchValue);
        try {
            const response = await axiosPublic.get(`/todos/searchTask?searchValue=${searchValue}&userId=${parseInt(userId)}`)
            console.log(response?.data);
            if (response?.data?.success) {
                setTasksToPriview(response?.data?.data)
            }
        } catch (error) {
            console.log(error);
            setIsErrorFromSearch(true)

        }
        finally {
            setIsLoading(false)
            const dialog = document.getElementById(id);
            dialog.close();
        }

    }
    return (
        <div>
            <dialog id={id} className="modal modal-top">
                <div className="modal-box text-center space-y-2">
                    <h3 className="font-medium text-base ">Search for tasks.</h3>
                    <form onSubmit={handleSearchTasksByTitle}>
                        <input
                            className="border-2 p-[3px] rounded-l-md relative  mr-[-2px] " type="text"
                            name="searchValue" placeholder="Enter title"

                        />
                        <input type="submit" value={`${isLoading ? "Searching..." : "Search"}`} className="py-[3px] px-2 rounded-r-md text-white bg-slate-900 cursor-pointer" />
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default SearchingByTitleModal;