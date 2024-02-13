//import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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
      const response = await axiosSecure.get(`/payment/${user.email}`);
      return response.data;
    },
  });

  if (isLoading)
    return (
      <div>
        <progress className="progress w-56 bg-yellow-600"></progress>
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="m-2">
      <Helmet><title>Royal | PaymentHistory</title></Helmet>
      <h1 className="text-2xl text-cyan-200 font-extrabold ">
        <GreetingMessage />, {user?.displayName}
      </h1>
      <h2 className="text-2xl">Total Payments: {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="text-lime-400">
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Transaction Id</th>
              <th>Status</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              // Ensure qty is an array and has values; otherwise, default to [0]
              const qtyArray = Array.isArray(payment.qty) ? payment.qty : [0];
              const totalQty = qtyArray.reduce(
                (acc, currentQty) => acc + currentQty,
                0
              );

              return (
                <tr key={payment._id}>
                  <td>{payment.item}</td>
                  <td>{totalQty}</td> {/* Display the total quantity */}
                  <td>${parseFloat(payment.totalPrice).toFixed(2)}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.status}</td>
                  <td>{payment.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
