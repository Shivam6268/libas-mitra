import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { loginUser } from '../feature/auth/authSlice';

const Login = () => {

  const [formData, setFormData] = useState({ email: "", password: "" })

  const { email, password } = formData

  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handelSubmit = e => {
    e.preventDefault()
    dispatch(loginUser(formData))

  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }

    if (isError && message) {
      toast.error(message, { position: "top-center" })
    }


  }, [user, isError, message])


  if (isLoading) {
    return (
      <h1 className="text-center my-10">Loading...</h1>
    )
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center mt-12 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-10 h-10 text-emerald-500" />
            <span className="text-3xl font-bold text-slate-900">Meta Fashion</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-gray-700">Enter your credentials to access your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handelSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name='email'
                value={email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name='password'
                value={password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500" />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-emerald-500 hover:text-emerald-600">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-600 transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-emerald-500 hover:text-emerald-600">
                Create one now
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-700 hover:text-slate-900 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;