import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaRegTrashAlt } from "react-icons/fa";

const MyCart = () => {
  const [cart] = useCart();

  const total = cart.reduce((sum, item) => item.price + sum, 0);
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
                <th>{index +1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={row.image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                   
                  </div>
                </td>
                <td>
                <p>{row.name}</p>
                  <br />
                  
                </td>
                <td><p>${row.price}</p></td>
                <td>
                  <button className="btn  btn-error btn-xs rounded-full w-8 h-8"><FaRegTrashAlt className="text-white " /></button>
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
