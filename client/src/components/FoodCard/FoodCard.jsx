import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

import { useForm } from "react-hook-form";

const FoodCard = ({ item }) => {
  const { price, name, recipe, image, _id } = item;
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const qty = parseInt(data.qty, 10);
    if (user && user.email) {
      const cartItem = {
        menuItem: _id,
        price,
        name,
        image,
        email: user.email,
        qty, // Use the 'qty' field from the form
      };
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} has been added to cart with quantity ${data.qty}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login to order the food!!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card  bg-slate-50 text-indigo-500 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt={name} className="rounded-xl" />
      </figure>
      <p className="absolute right-0 mr-4 mt-6 px-5 py-1 bg-indigo-900 text-white ">
        ${price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions flex justify-between items-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <select
              {...register("qty", { required: true })}
              className="select select-bordered select-xs w-20 max-w-xs"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              {/* Add more options as needed */}
            </select>
            {errors.qty && (
              <p className="text-red-500">Please select a quantity</p>
            )}
            <button className="btn bg-yellow-700 hover:bg-yellow-900 text-white">
              Add To Cart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
