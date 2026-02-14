import { Search, Eye, Ban, Check } from 'lucide-react';
import Layout from '../components/Layout';
import Loder from '../components/Loder';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllUsersForAdmin, updateUserForAdmin } from '../feature/admin/adminSlice';

const Users = () => {

  const { user } = useSelector(state => state.auth)

  const { adminIsLoading, adminIsError, adminMessage, allUsers } = useSelector(state => state.admin)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  // update user 

  const handleUpdateUser = (status) => {
    dispatch(updateUserForAdmin(status))
  }


  useEffect(() => {

    if (!user?.isAdmin) {
      navigate("/")
    }

    // Api's fetching

    if(user?.isAdmin){
      dispatch(getAllUsersForAdmin())
    }



    if (adminIsError && adminMessage) {
      toast.error(adminMessage, { position: "top-center" })
    }

  }, [user, adminIsError, adminMessage])


  if (adminIsLoading) {
    return (
      <Loder loadingMessage={"Admin Panel Loading...."} />
    )
  }

  return (
    <Layout title="Users">
      <div className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button className="ml-4 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
              Export Users
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">#{user._id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-100 text-violet-800">{user.phone}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={user.isActive ? "px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" : "px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"}>{user.isActive ? "Active" : "InActive"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {
                            user.isActive ? (
                              <button onClick={() => handleUpdateUser({ userId: user._id, isActive: false })} className=" cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Ban className="w-4 h-4" />
                              </button>
                            ) : (
                              <button onClick={() => handleUpdateUser({ userId: user._id, isActive: true })} className=" cursor-pointer p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                <Check className="w-4 h-4" />
                              </button>
                            )
                          }
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing 1 to 8 of 24,580 users</p>
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
export default Users