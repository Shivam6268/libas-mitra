import { Plus, Edit, Trash2, Copy } from 'lucide-react';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loder from '../components/Loder';
import { useNavigate } from 'react-router-dom';
import { createCouponByAdmin, getAllCoupon } from '../feature/admin/adminSlice';
import { toast } from "react-toastify";

const Coupons = () => {


  const { user } = useSelector(state => state.auth)

  const { adminIsLoading, adminIsError, adminMessage, allCoupons } = useSelector(state => state.admin)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [couponData, setCouponData] = useState({ couponCode: "", couponDiscount: "" })

  const { couponCode, couponDiscount } = couponData

  const handleChange = e => {
    setCouponData({ ...couponData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(createCouponByAdmin(couponData))

    setCouponData({
      couponCode: "", couponDiscount: ""
    })
  }

  useEffect(() => {

    if (!user?.isAdmin) {
      navigate("/")
    }




    if (user?.isAdmin) {
      // Api's Fetching
      dispatch(getAllCoupon())
    }



    if (adminIsError && adminMessage) {

      toast.error(adminMessage, { position: "top-center" })
    }

  }, [user, adminIsError, adminMessage])




  if (adminIsLoading) {
    return (
      <Loder loadingMessage={"Coupons Loading...."} />
    )
  }

  return (
    <Layout title="Users">
      <div className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <select className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white">
                <option>All Coupons</option>
                <option>Active</option>
                <option>Expired</option>
              </select>
              <select className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white">
                <option>Sort by Date</option>
                <option>Sort by Discount</option>
                <option>Sort by Usage</option>
              </select>
            </div>
            {/* <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Coupon
        </button> */}
          </div>


          <div className="bg-white rounded-xl shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Create Coupon</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="couponCode" className="block text-sm font-semibold text-gray-700 mb-2">
                      Coupon Code
                    </label>
                    <input
                      value={couponCode}
                      onChange={handleChange}
                      name='couponCode'
                      type="text"
                      id="couponCode"
                      placeholder="e.g., SUMMER2024"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="discount" className="block text-sm font-semibold text-gray-700 mb-2">
                      Discount Percentage
                    </label>
                    <input
                      value={couponDiscount}
                      onChange={handleChange}
                      name='couponDiscount'
                      type="number"
                      id="discount"
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>


          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Discount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created On</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allCoupons.map(coupon => {
                      return (
                        <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">{coupon.couponCode}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{coupon.couponDiscount}%</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{new Date(coupon.createdAt).toLocaleDateString('en-IN')}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">{coupon.isActive ? "Active" : "Expired"}</span>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}


export default Coupons