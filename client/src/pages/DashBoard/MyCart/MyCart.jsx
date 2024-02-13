import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, refetch] = useCart();

  // Calculate total price correctly by multiplying each item's price by its quantity and summing up
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleDelete = (row) => {
    Swal.fire({
      title: `Do You Want to delete ${row.name}?`,
      imageUrl: `${row.image}`,
      imageWidth: 400,
      imageHeight: 200,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${row._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                title: `${row.name} has been deleted.`,
                icon: 'success',
                timer: 1500,
              });
            }
          });
      }
    });
  };
  return (
    <div className="w-[700px]">
      <Helmet>
        <title>TOH | My Cart</title>
      </Helmet>
      <div className="flex justify-evenly items-center h-[60px]">
        <h2 className="text-2xl">Total Items: {cart.length}</h2>
        <h2 className="text-2xl">Sub-Total: $ {total.toFixed(2)}</h2>
        <Link to="/dashboard/payment">
          <button className="btn bg-[#d1a054] hover:bg-[#d7a354] btn-sm text-base-200 w-24">
            Pay
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#d1a054] text-base-200">
            <tr>
              <th>Qty</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((row) => (
              <tr key={row._id}>
                <td>{row.qty}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={row.image} alt={row.name} />
                    </div>
                  </div>
                </td>
                <td>{row.name}</td>
                <td>${row.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(row)}
                    className="btn btn-error btn-xs rounded-full w-8 h-8"
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

export default MyCart;
