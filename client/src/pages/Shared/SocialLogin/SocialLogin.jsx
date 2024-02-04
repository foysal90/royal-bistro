import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const SocialLogin = () => {
  const { googleLogIn } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';
  const handleGoogleLogin = () => {
    googleLogIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log("loggeduse in google", loggedUser)
        const saveUser = {name:loggedUser.displayName, email: loggedUser.email, photo: loggedUser.photoURL}
        fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
          },
          body : JSON.stringify(saveUser)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          
          Swal.fire({
            icon: "success",
            title: "user logged in successfully ",
            
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
          navigate(from, {replace: true});
        })
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="divider gap-2"></div>
    <div className="flex items-center gap-3 justify-center">
    <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
      <FcGoogle className="w-6 h-6" />
      </button>
      <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
      <FaGithub className="text-[#4078c0] w-6 h-6 " />
      </button>
      <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
      <FaTwitter className="text-[#00ACEE] w-6 h-6 " />
      </button>
    </div>
    </div>
  );
};

export default SocialLogin;
