//import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payment/${user.email}`); // Ensure the endpoint matches your server route
      return response.data;
    },
  });

  if (isLoading) return <div><progress className="progress w-56 bg-yellow-600"></progress></div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
    <h2 className="text3-xl">Total Payments: {payments.length}</h2>
    <div className="overflow-x-auto">
        <table className="table table-zebra">
            {/* head */}
            <thead>
                <tr>
                    <th>#</th>
                    <th>price</th>
                    <th>Transaction Id</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((payment, index) => <tr key={payment._id}>
                    <th>{index + 1}</th>
                    <td>${parseFloat(payment.totalPrice).toFixed(2)}</td>
                    <td>{payment.transactionId}</td>
                    <td>{payment.status}</td>
                </tr>)}
                
            </tbody>
        </table>
    </div>
</div>
  );
};

export default PaymentHistory;
