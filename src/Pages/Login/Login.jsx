import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { authContext } from "../../Components/AuthProvider/AuthProvider";


const Login = () => {
    const { setCurrentUser } = useContext(authContext)
    const axiosPublic = useAxios()
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log({ email, password });
        try {
            const response = await axiosPublic.post("/users/login", { email, password })
            console.log(response?.data);
            if (response?.data?.success) {
                localStorage.setItem("userEmail", JSON.stringify(response?.data?.data?.email))
                localStorage.setItem("userId", JSON.stringify(response?.data?.data?.id))
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                setCurrentUser(JSON.parse(localStorage.getItem("userId")))
                navigate("/manageTask")

            }
            else {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Failed to login",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error?.response?.data);
            Swal.fire({
                position: "top",
                icon: "error",
                title: `${error?.response?.data?.message || error?.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div className="h-[70vh] flex flex-col justify-center items-center gap-3">
            <div className="w-full">
                <form onSubmit={handleLogin} className="space-y-3 w-[30%] mx-auto">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-medium">Email</label>
                        <input className="border-2 rounded p-[3px]" type="email" name="email" placeholder="Enter your email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium">Password</label>
                        <input className="border-2 rounded  p-[3px]" type="password" name="password" placeholder="Enter your password" />
                    </div>
                    <div className="w-[70%] mx-auto">
                        <input className="p-2 w-full bg-slate-900 text-white rounded" type="submit" value="Login" />
                    </div>
                </form>
            </div>
            <div>
                <p className="text-sm">Don&apos;t have an account? <Link to="/registration" className="underline text-blue-500 font-medium">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;