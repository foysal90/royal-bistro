import { useQuery } from "@tanstack/react-query";
import "./MyBookings.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import GreetingMessage from "../../../components/GreetingMessage/GreetingMessage";

import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";

const MyBookings = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: reservations = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reservations", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/reservations/${user.email}`);
      return response.data;
    },
  });

  // Delete operation
  const handleBookingDelete = (id) => {
    Swal.fire({
      title: `Do You Want to delete ${id}?`,
     
      imageWidth: 400,
      imageHeight: 200,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reservations/${id}`)
          .then((response) => {
           
            if (response.data.deletedCount>0) {
              refetch(); 
              Swal.fire({
                position: "top-end",
                title: 'Booking has been deleted.',
                icon: "success",
                timer: 1500,
              });
            } else {
              // Handle unsuccessful deletion
              Swal.fire({
                title: 'Failed to delete the booking. Please try again.',
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Failed to delete the booking:", error);
            // Handle error case
            Swal.fire({
              title: 'An error occurred while deleting the booking. Please try again.',
              icon: "error",
            });
          });
      }
    });
  };

  if (isLoading)
    return (
      <div>
        <progress className="progress w-56 bg-yellow-600"></progress>
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <div className="max-w-max">
      <Helmet>
        <title>Royal | MyBookings</title>
      </Helmet>
      <h1 className="text-2xl text-cyan-200 font-extrabold py-2">
        <GreetingMessage />, {user?.displayName}
      </h1>
      <h1 className="text-2xl my-5 p-2 font-extrabold">
        Total Bookings : {reservations.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto table-zebra">
          <thead className="text-lime-400 uppercase bg-gray-700">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Guest</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Mobile</th>

              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-amber-600 text-md">
            {reservations.map((booking, index) => (
              <tr key={booking._id} className="border-b">
                <td className="pl-4 py-2">{index + 1},</td>
                <td className="pl-4 py-2">{booking.name}</td>
                <td className="pl-4 py-2">{booking.email}</td>
                <td className="pl-4 py-2">{booking.date}</td>
                <td className="pl-4 py-2 ">{booking.time}</td>
                <td className="pl-5 py-2">{booking.guest}</td>
                <td className="px-4 py-2">{booking.message}</td>
                <td className="px-4 py-2">{booking.mobile}</td>

                <td className="px-4 py-2">
                  <button
                    className="btn btn-error btn-xs rounded-full w-8 h-8"
                    onClick={() => handleBookingDelete(booking._id)}
                  >
                    <FaRegTrashAlt className="text-white" />
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

export default MyBookings;
