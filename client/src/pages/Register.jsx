import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../feature/auth/authSlice';
import { toast } from 'react-toastify';


const Register = () => {

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "", address: "" })

  const { name, email, phone, password, confirmPassword, address } = formData

  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.warning("Password and Confirm Password both are not same", { position: "top-center" })
    } else {
      dispatch(registerUser(formData))
      setFormData({})
    }
  }

  useEffect(() => {

    if (user) {
      navigate("/")
    }

    if (isError && message) {
      toast.error(message, { position: "top-center" })
    }

  }, [user, message, isError])


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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Your Account</h1>
          <p className="text-gray-700">Join the future of luxury fashion shopping</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name='name'
                value={name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

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
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                Phone Number
              </label>
              <input
                type="phone"
                id="phone"
                name='phone'
                value={phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="9898989898"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-slate-900 mb-2">
                Loaction
              </label>
              <input
                type="text"
                id="address"
                name='address'
                value={address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="indore"
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
                placeholder="Create a strong password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Re-enter your password"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="font-medium text-emerald-500 hover:text-emerald-600">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-emerald-500 hover:text-emerald-600">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-600 transition-all"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-emerald-500 hover:text-emerald-600">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
