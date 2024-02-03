import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyCart = () => {
  const [cart, refetch] = useCart();

  const total = cart.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (row) => {
    Swal.fire({
      title: `Do You Want to delete ${row.name} ?`,

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete it !!`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${row._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${row.name} has been deleted`,
                icon: "success"
              });
            }
          });
      }
    });
  };
  return (
    <div className=" w-[700px] ">
      <Helmet>
        <title>TOH | My Cart</title>
      </Helmet>
      <div className="flex justify-evenly items-center h-[60px]">
        <h2 className="text-2xl">Total Items: {cart.length}</h2>
        <h2 className="text-2xl">Sub-Total: $ {total}</h2>
        <button className="btn bg-[#d1a054] hover:bg-[#d7a354] btn-sm text-base-200 w-24">
          Pay
        </button>
      </div>

      {/* displaying items */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#d1a054] text-base-200">
            <tr>
              <td>#</td>

              <th>image</th>
              <th>Name</th>
              <th>price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((row, index) => (
              <tr key={row._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={row.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{row.name}</p>
                  <br />
                </td>
                <td>
                  <p>${row.price}</p>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(row)}
                    className="btn  btn-error btn-xs rounded-full w-8 h-8"
                  >
                    <FaRegTrashAlt className="text-white " />
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
