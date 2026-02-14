import Layout from "../components/Layout";
import Loder from "../components/Loder";
import {
  Users,
  ShoppingCart,
  Ticket,
  Package,
  TrendingUp,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCoupon, getAllOrdersForAdmin, getAllProducts, getAllUsersForAdmin } from "../feature/admin/adminSlice";

const Dashboard = () => {

  const { user } = useSelector(state => state.auth)

  const { adminIsLoading, adminIsError, adminMessage, allUsers, allProducts, allOrders, allCoupons } = useSelector(state => state.admin)

  const dispatch = useDispatch()
  const navigate = useNavigate()



  useEffect(() => {

    if (!user?.isAdmin) {
      navigate("/")
    }


    // Api's fetching  

    if (user?.isAdmin) {
      dispatch(getAllUsersForAdmin())
      dispatch(getAllOrdersForAdmin())
      dispatch(getAllProducts())
      dispatch(getAllCoupon())
    }



    if (adminIsError && adminMessage) {
      navigate("/")
      toast.error(adminMessage, { position: "top-center" })
    }

  }, [user, adminIsError, adminMessage])




  const kpis = [
    {
      label: "Total Users",
      value: allUsers.length,
      change: "+12.5%",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Total Orders",
      value: allOrders.length,
      change: "+8.2%",
      icon: ShoppingCart,
      color: "bg-emerald-500",
    },
    {
      label: "Active Coupons",
      value: allCoupons.length,
      change: "+18.7%",
      icon: Ticket,
      color: "bg-purple-500",
    },
    {
      label: "Total Products",
      value: allProducts.length,
      change: "+5.3%",
      icon: Package,
      color: "bg-orange-500",
    },
  ];

  if (adminIsLoading) {
    return (
      <Loder loadingMessage={"Admin Panel Loading...."} />
    )
  }

  return (
    <Layout currentPage="dashboard">
      <div className="space-y-8">
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${kpi.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="flex items-center text-sm text-emerald-600 font-semibold">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {kpi.change}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{kpi.label}</h3>
                <p className="text-3xl font-bold text-gray-700">{kpi.value}</p>
              </div>
            );
          })}
        </div>

        {/* ORDERS + USERS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* RECENT ORDERS */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-6">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    {["Order ID", "Customer", "Date", "Amount", "Status"].map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm font-medium text-gray-700">{order._id}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{order.user.name}</td>
                      <td className="py-4 px-4 text-sm text-gray-500">{order.createdAt}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-gray-700">{order.totalBillAmount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${order.status === "delivered" ? 'bg-green-100 text-green-800' : order.status === "cancelled" ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RECENT USERS */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Recent Users</h3>
            </div>

            <div className="p-6 space-y-4">
              {allUsers.length ? (
                allUsers.slice(0, 5).map((user) => (
                  <div key={user._id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                      <span className="text-violet-600 font-semibold">
                        {user.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center">No users found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
