import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserAlt, FaUserShield } from "react-icons/fa";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      return res.json();
    },
  });

  
  return (
    <div className="w-full">
      <Helmet>
        <title> TOH | All users </title>
      </Helmet>
      <h1>all users : {users.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra text-teal-600">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{
                user.role === 'admin' ? 'admin'
                :
                <button className="btn btn-circle bg-yellow-600 btn-sm">
                    <FaUserShield className="text-white"/>
                  </button>
                }</td>
                <td>
                  <button className="btn btn-circle bg-red-600 btn-sm">
                    <FaTrashAlt className="text-white"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
