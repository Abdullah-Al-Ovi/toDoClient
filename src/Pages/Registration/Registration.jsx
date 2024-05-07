
import { Link } from 'react-router-dom';

const Registration = async () => {
    const handleregister=(e)=>{
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        console.log({name,email,password});
    }
    return (
        <div className="h-[70vh] flex flex-col justify-center items-center gap-3">
            <div className="w-full">
            <form onSubmit={handleregister} className="space-y-3 w-[30%] mx-auto">
                <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-medium">Name</label>
                <input className="border-2 rounded p-[3px]" type="text" name="name" placeholder="Enter your name"/>
                </div>
                <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium">Email</label>
                <input className="border-2 rounded p-[3px]" type="email" name="email" placeholder="Enter your email"/>
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
                <p className="text-sm">Already have an account? <Link to="/login" className="underline text-blue-500 font-medium">Login</Link></p>
            </div>
        </div>
    );
};

export default Registration;