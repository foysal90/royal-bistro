import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { SlWallet } from "react-icons/sl";
const AdminHome = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/admin-stats");
      return res.data;
    },
  });

  return (
    <div className="w-full m-5 ">
      <h1 className="text-2xl my-2 "> Welcome Back, {user.displayName}</h1>
      <div className="stats shadow w-full text-center text-white ">
        <div className="stat bg-teal-400 p-5">
        <div className="absolute  "><SlWallet className="w-8 h-8" /></div>
          <div className="stat-value">${stats.revenue}</div>
          <div className="stat-title">Revenue</div>
          {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
        </div>

        <div className="stat bg-blue-400">
          <div className="stat-value">{stats.totalUsers}</div>
          <div className="stat-title">New Users</div>
        </div>

        <div className="stat bg-amber-400">
          <div className="stat-value">{stats.totalProducts}</div>
          <div className="stat-title">Products</div>
        </div>
        <div className="stat bg-violet-500">
          <div className="stat-value">{stats.totalOrders}</div>
          <div className="stat-title">Orders</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
