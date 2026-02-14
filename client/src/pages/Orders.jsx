import { Filter, Download, Eye } from 'lucide-react';
import Layout from "../components/Layout"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loder from "../components/Loder"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllOrdersForAdmin, updateOrdersForAdmin } from '../feature/admin/adminSlice';

const Orders = () => {

  const { user } = useSelector(state => state.auth)

  const { adminIsLoading, adminIsError, adminMessage, allOrders } = useSelector(state => state.admin)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOrderUpdate = (orderData) => {
    dispatch(updateOrdersForAdmin(orderData))
  }

  useEffect(() => {

    if (!user?.isAdmin) {
      navigate("/")
    }

    // Api's Fetch 

   if(user?.isAdmin){
     dispatch(getAllOrdersForAdmin())
   }

    if (adminIsError && adminMessage) {
      toast.error(adminMessage, { position: "top-center" })
    }

  }, [user, adminIsError, adminMessage])


  if (adminIsLoading) {
    return (
      <Loder loadingMessage={"Orders Loading...."} />
    )
  }


  return (
    <Layout title="Users">
      <div className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select className="pl-10 pr-8 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white">
                  <option>All Orders</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="relative">
                <select className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white">
                  <option>Order Status</option>
                  <option>Placed</option>
                  <option>Dispatched</option>
                  <option>Cancelled</option>
                  <option>Delivered</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="date"
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Discount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allOrders.map(order => {
                      return (
                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order._id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{order?.user?.name}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">{!order.coupon ? "N/A" : order.coupon}</span>
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.totalBillAmount}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.createdAt.split("T")[0]}</td>

                          {/* ["placed", "dispatched", "cancelled", "delivered"], */}
                          <td className="px-6 py-4">
                            <select onChange={e => handleOrderUpdate({orderId : order._id, status: e.target.value})} defaultValue={order.status} className="px-3 py-1 text-xs font-semibold rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                              <option value={"placed"}>Placed</option>
                              <option value={"dispatched"}>Dispatched</option>
                              <option value={"cancelled"}>Cancelled</option>
                              <option value={"delivered"}>Delivered</option>
                            </select>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing 1 to 8 of 8,234 orders</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-semibold">1</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">2</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">3</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}


export default Orders