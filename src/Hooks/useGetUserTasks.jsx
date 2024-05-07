import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useIsAuthenticated from "./useIsAuthenticated";


const useGetUserTasks = () => {
    const {userEmail, userId} =  useIsAuthenticated()
    const axiosPublic = useAxios()
    const {data:tasks=[],refetch,isError} = useQuery({
        queryKey:["tasks",userEmail],
        enabled: !!userEmail,
        queryFn: async()=>{
            const response = await axiosPublic.get(`/todos/myTasks/${userId}`);
            // console.log(response?.data?.data);
            return response?.data?.data
        }
    })

    return [tasks,refetch,isError]
};

export default useGetUserTasks;