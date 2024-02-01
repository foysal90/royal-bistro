import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const FoodCard = ({ item }) => {
  const { price, name, recipe, image, _id } = item;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (item) => {
    console.log(item);
    if (user && user.email) {
      const cartItem = {menuItem: _id, price, name, image, email:user.email}
      fetch('http://localhost:5000/carts', {
        method: 'POST',
        headers : {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(cartItem)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.insertedId) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: `${name} has been added to cart`,
            showConfirmButton: false,
            timer: 1500
          });
          
        }
       
      })
      
    }
    else {
      Swal.fire({
        title: "Please Login to order the food!!",
        
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state:{from:location}})
        }
      });
    }
   
  }

  return (
    <div className="card  bg-slate-50 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="loading..." className="rounded-xl" />
      </figure>
      <p className="absolute right-0 mr-4 mt-6 px-5 py-1 bg-indigo-900 text-white ">
        ${price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn bg-yellow-700 hover:bg-yellow-900 text-white"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
