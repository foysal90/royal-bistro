//import { useEffect, useState } from "react";
import GreetingMessage from "../../../components/GreetingMessage/GreetingMessage";
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
    <div className="m-2">
        <h1 className="text-2xl text-cyan-200 font-extrabold "> <GreetingMessage/>,  {user?.displayName}</h1>
    <h2 className="text-2xl ">Total Payments: {payments.length}</h2>
    <div className="overflow-x-auto">
        <table className="table table-zebra">
            {/* head */}
            <thead className="text-lime-400">
                <tr>
                    <th>qty</th>
                    <th>price</th>
                    <th>Transaction Id</th>
                    <th>Status</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((payment) => <tr key={payment._id}>
                    {/* <th>{index + 1}</th> */}
                    <td>{payment.quantity}</td>
                    <td>${parseFloat(payment.totalPrice).toFixed(2)}</td>
                    <td>{payment.transactionId}</td>
                    <td>{payment.status}</td>
                    <td>{payment.email}</td>
                </tr>)}
                
            </tbody>
        </table>
    </div>
</div>
  );
};

export default PaymentHistory;
