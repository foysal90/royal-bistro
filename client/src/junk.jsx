// import { Link, useNavigate } from "react-router-dom";
// import gif from "../../assets/others/authentication.gif";
// import "animate.css";
// import { useForm } from "react-hook-form";
// import { Helmet } from "react-helmet-async";
// import { useContext } from "react";
// import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
// import Swal from "sweetalert2";
// import SocialLogin from "../Shared/SocialLogin/SocialLogin";

// const imgHostingToken = import.meta.env.VITE_IMAGE_UPLOADER_KEY;
// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const image_hosting_URL = `https://api.imgbb.com/1/upload?key=${imgHostingToken}`;
//   const { createUser, updateUserprofile, logOut } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     const { email, password, name } = data;
//     const image = watch("image");

//     if (image && image.length > 0) {
//       const formData = new FormData();
//       formData.append("image", image[0]);

//       try {
//         const imgResponse = await fetch(image_hosting_URL, {
//           method: "POST",
//           body: formData,
//         }).then((res) => res.json());

//         if (imgResponse.success) {
//           const imgUrl = imgResponse.data.display_url;
//           await createUser(email, password);
//           await updateUserprofile(name, imgUrl); // Assuming this function exists and works correctly

//           // Assuming you have a working API endpoint and fetch setup for saving user data
//           const saveUserResponse = await fetch(
//             "https://royal-bistro-server.vercel.app/users",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 name,
//                 email,
//                 photo: imgUrl,
//               }),
//             }
//           ).then((res) => res.json());

//           if (saveUserResponse) {
//             await logOut();
//             Swal.fire({
//               position: "top-end",
//               icon: "success",
//               title: "User created successfully",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//             navigate("/login");
//           }
//         }
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: error.message,
//         });
//       }
//     } else {
//       Swal.fire({
//         icon: "warning",
//         title: "Oops...",
//         text: "Please select an image.",
//       });
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>TOH | Register</title>
//       </Helmet>
//       <div className="hero w-full bg-white text-indigo-500">
//         <div className="hero-content flex-col lg:flex-row-reverse">
//           <div className="text-center lg:text-right">
//             <img src={gif} alt="" />
//           </div>
//           <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
//             <div className="text-center">
//               <h1 className="text-3xl font-bold">Please Register!</h1>
//             </div>
//             <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//               {/* Name Input */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   {...register("name", { required: true })}
//                   placeholder="Name"
//                   className="input input-bordered"
//                 />
//                 {errors.name && (
//                   <span className="text-red-600">Name is required</span>
//                 )}
//               </div>

//               {/* Image Input */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Photo</span>
//                 </label>
//                 <input
//                   type="file"
//                   {...register("image", { required: true })}
//                   className="input input-bordered"
//                 />
//                 {errors.image && (
//                   <span className="text-red-600">Photo is required</span>
//                 )}
//               </div>

//               {/* Email Input */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   {...register("email", { required: true })}
//                   placeholder="Email"
//                   className="input input-bordered"
//                 />
//                 {errors.email && (
//                   <span className="text-red-600">Email is required</span>
//                 )}
//               </div>

//               {/* Password Input */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   {...register("password", {
//                     required: true,
//                     minLength: 6,
//                     pattern:
//                       /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}/,
//                   })}
//                   placeholder="Password"
//                   className="input input-bordered"
//                 />
//                 {errors.password && (
//                   <span className="text-red-600">
//                     Password is required and must meet complexity requirements.
//                   </span>
//                 )}
//               </div>

//               <div className="form-control mt-6">
//                 <button className="btn btn-primary">Register</button>
//               </div>
//               <SocialLogin />
//               <Link to="/login">
//                 <span>Already have an Account? </span>
//                 <input type="submit" value="Login" className="text-primary" />
//               </Link>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;


 // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // const { createUser, updateUserprofile, logOut } = useContext(AuthContext);
  // const navigate = useNavigate();
  // const onSubmit = (data) => {
  //   const email = data.email;
  //   const password = data.password;
  //   createUser(email, password)
  //     .then((result) => {
  //       const newUser = result.user;
  //       console.log(newUser);
  //       updateUserprofile(data.name, data.photoURL)
  //         .then(() => {
  //           const saveUser = {
  //             name: data.name,
  //             email: data.email,
  //             photo: data.photoURL,
  //           };
  //           fetch("https://royal-bistro-server.vercel.app/users", {
  //             method: "POST",
  //             headers: {
  //               "content-type": "application/json",
  //             },
  //             body: JSON.stringify(saveUser),
  //           })
  //             .then((res) => res.json())
  //             .then((data) => {
  //               console.log(data);

  //               Swal.fire({
  //                 position: "top-end",
  //                 icon: "success",
  //                 title: "user created successfully",
  //                 showConfirmButton: false,
  //                 timer: 1500,
  //               });
  //               logOut().then(() => {
  //                 navigate("/login");
  //               });
  //             });
  //         })
  //         .catch((error) => {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Oops...",
  //             text: error.message,
  //           });
  //         });
  //     })
  //     .catch((error) => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: error.message,
  //       });
  //     });
  // };

  // <div className="hero w-full bg-white text-indigo-500">
//         <div className="hero-content flex-col lg:flex-row-reverse">
//           <div className="text-center lg:text-right">
//             <img src={gif} alt="" />
//           </div>
//           <div className="card shrink-0 w-full max-w-lg  shadow-2xl shadow-purple-100 bg-base-100">
//             <div className="text-center">
//               <h1 className="text-3xl font-bold ">Please Register!</h1>
//             </div>
//             <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Name</span>
//                 </label>
//                 <input
//                   type="text"
//                   {...register("name", { required: true })}
//                   placeholder="Name"
//                   className="input input-bordered"
//                 />
//                 {errors.name && (
//                   <span className="text-red-600">Name is required</span>
//                 )}
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Photo URL</span>
//                 </label>
//                 <input
//                   type="text"
//                   {...register("photoURL", { required: true })}
//                   placeholder="photo url"
//                   className="input input-bordered"
//                 />
//                 {errors.photoURL && (
//                   <span className="text-red-600">photo URL is required</span>
//                 )}
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="email"
//                   {...register("email", { required: true })}
//                   className="input input-bordered"
//                 />
//                 {errors.email && (
//                   <span className="text-red-600">Email is required</span>
//                 )}
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="password"
//                   {...register("password", {
//                     required: true,
//                     minLength: 6,
//                     maxLength: 15,
//                     pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
//                   })}
//                   className="input input-bordered"
//                 />
//                 {errors.password?.type === "required" && (
//                   <span className="text-red-600">Password is required</span>
//                 )}
//                 {errors.password?.type === "minLength" && (
//                   <span className="text-red-600">
//                     Password must be at least 6 characters{" "}
//                   </span>
//                 )}
//                 {errors.password?.type === "maxLength" && (
//                   <span className="text-red-600">
//                     Password must be less then 20 characters{" "}
//                   </span>
//                 )}
//                 {errors.password?.type === "pattern" && (
//                   <span className="text-red-600">
//                     Password must have at least one digit, one uppercase, one
//                     lowercase and a special characters
//                   </span>
//                 )}
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Confirm Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="confirm password"
//                   {...register("confirm", { required: true })}
//                   className="input input-bordered"
//                 />
//                 {errors.confirm && (
//                   <span className="text-red-600">
//                     Confirm password is required
//                   </span>
//                 )}
//               </div>

//               {/* <select {...register("gender")}>
//                 <option>Select Gender</option>
//                 <option value="female">female</option>
//                 <option value="male">male</option>
//                 <option value="other">other</option>
//               </select> */}
//               <div className="form-control mt-6">
//                 <button className="btn btn-primary">Register</button>
//               </div>
//               <SocialLogin />
//               <Link to="/login">
//                 <span>Alredy have an Account? </span>
//                 <input type="submit" value="Login" />
//               </Link>
//             </form>
//           </div>
//         </div>
//       </div>
