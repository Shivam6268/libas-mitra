import { ShoppingBag, Sparkles } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../feature/auth/authSlice';

const Navbar = () => {

    const { user } = useSelector(state => state.auth)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()



    const userLogout = () => {
        dispatch(logoutUser())
        navigate("/login")
    }

    return (
        <nav className={location.pathname.includes("admin") ? "hidden" : "fixed top-0 left-0 w-full z-50 bg-stone-100/80 backdrop-blur border-b border-gray-200 "}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/">
                        <div className="flex items-center space-x-2">
                            <Sparkles className="w-8 h-8 text-emerald-500" />
                            <span className="text-2xl font-bold text-slate-900">Meta Fashion</span>
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-slate-900 font-medium">Home</Link>
                        <Link to="/collections" className="text-gray-700 hover:text-slate-900 font-medium">Collections</Link>
                        <Link to="/auth/profile" className="text-gray-700 hover:text-slate-900 font-medium">About</Link>
                    </div>
                    <div>
                        {
                            user ? (
                                <div className='flex items-center justify-center space-x-5'>
                                       <Link to={user?.isAdmin ? "/admin/dashboard" : "/auth/profile"}> <h1>Welcome {user?.name}</h1></Link>
                                    <button onClick={() => userLogout()} className="text-gray-700 text-white font-medium bg-red-400 py-2 px-6 rounded-full hover:bg-red-600 cursor-pointer ">Logout</button>
                                </div>

                            ) : (<Link to="/login" className="text-gray-700 text-white font-medium bg-green-500 py-2 px-6 rounded-full hover:bg-green-600 cursor-pointer ">Login</Link>)
                        }

                        {/* <ShoppingBag className="w-6 h-6 text-slate-900 cursor-pointer" /> */}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar