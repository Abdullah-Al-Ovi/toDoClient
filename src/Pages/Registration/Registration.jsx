import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react'; // Import useState hook
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import { authContext } from '../../Components/AuthProvider/AuthProvider';

const Registration = () => {
    const axiosPublic = useAxios();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 
    const {setCurrentUser } = useContext(authContext)
    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            setLoading(true); 
            const response = await axiosPublic.post("/users/createUser", { name, email, password });
            console.log(response);
            if (response.data?.success) {
                localStorage.setItem("userEmail", JSON.stringify(response.data?.data?.email));
                localStorage.setItem("userId", JSON.stringify(response.data?.data?.id));
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registration Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                setCurrentUser(JSON.parse(localStorage.getItem("userId")))
                navigate("/");
            } else {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Failed to register",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            // console.log(error);
            Swal.fire({
                position: "top",
                icon: "error",
                title: `${error?.response?.data?.message || error?.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setLoading(false); 
            
        }
    };

    return (
        <div className="h-[70vh] flex flex-col justify-center items-center gap-3">
            <div className="w-full">
                <form onSubmit={handleRegister} className="space-y-3 w-[30%] mx-auto">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-medium">Name</label>
                        <input className="border-2 rounded p-[3px]" type="text" name="name" placeholder="Enter your name" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-medium">Email</label>
                        <input className="border-2 rounded p-[3px]" type="email" name="email" placeholder="Enter your email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium">Password</label>
                        <input className="border-2 rounded p-[3px]" type="password" name="password" placeholder="Enter your password" />
                    </div>
                    <div className="w-[70%] mx-auto">
                        <input className="p-2 w-full bg-slate-900 text-white rounded" type="submit" value={loading ? "Registering..." : "Register"} disabled={loading} />
                    </div>
                </form>
            </div>
            <div>
                <p className="text-sm">Already have an account? <Link to="/login" className="underline text-blue-500 font-medium">Login</Link></p>
            </div>
        </div>
    );
};

export default Registration;
