import { Link, useNavigate } from "react-router-dom";
import gif from "../../assets/others/authentication.gif";
import "animate.css";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
const imgHostingToken = import.meta.env.VITE_IMAGE_UPLOADER_KEY;
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { createUser, updateUserprofile, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageUploading, setImageUploading] = useState(false);

  const onSubmit = async (data) => {
    if (!data.photoURL) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image upload is required!",
      });
      return;
    }

    // Proceed with the rest of the registration process
    const { email, password, name, photoURL } = data;
    createUser(email, password)
      .then((result) => {
        const newUser = result.user;
        console.log(newUser);
        updateUserprofile(name, photoURL)
          .then(() => {
            // Submit user data to your server
            const saveUser = { name, email, photo: photoURL };
            // Example server POST request
            fetch("https://royal-bistro-server.vercel.app/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then(() => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                logOut().then(() => {
                  navigate("/login");
                });
              });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  const uploadImage = (file) => {
    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    fetch(`https://api.imgbb.com/1/upload?key=${imgHostingToken}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data && result.data.url) {
          setValue("photoURL", result.data.url); // Automatically set the value of photoURL in the form
          setImageUploading(false);
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setImageUploading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Royal | Register</title>
      </Helmet>
      <div className="hero w-full bg-white text-indigo-500">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={gif} alt="" className="text-center lg:text-right" />
          <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <div className="card-body">
              <h1 className="text-3xl font-bold text-center">
                Please Register!
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500">Name is required</span>
                  )}
                </div>

                {/* Image Upload field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Upload Image</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => uploadImage(e.target.files[0])}
                    disabled={imageUploading}
                    className="input input-bordered"
                  />
                  {imageUploading && <span>Uploading...</span>}
                </div>

                {/* Email field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500">Email is required</span>
                  )}
                </div>

                {/* Password field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-red-500">Password is required</span>
                  )}
                </div>

                {/* Submit button */}
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
              </form>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
