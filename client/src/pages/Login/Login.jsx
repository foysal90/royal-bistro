import { Link, useLocation, useNavigate } from "react-router-dom";
import gif from "../../assets/others/authentication-unscreen.gif";
//import cover from '../../assets/others/authentication.gif'
import Swal from "sweetalert2";
import "./Login.css";
import {loadCaptchaEnginge,LoadCanvasTemplate,validateCaptcha,} from "react-simple-captcha";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
 const location = useLocation()
 const from = location.state?.from?.pathname || '/';
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  //validating captcha
  const handleValidateCaptcha = (e) => {
    const captchaValue = e.target.value;
    if (validateCaptcha(captchaValue) == true) {
      setDisabled(false);
    } else {
      Swal.fire("Captcha did not match!");
      setDisabled(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // const user = { email, password };
    // console.log(user);
    login(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        Swal.fire({
          title: "User logged in successfully",

          showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
         
          `,
          },
          hideClass: {
            popup: `
            animate__animated
            animate__fadeOutDown
           
          `,
          },
        });
        navigate(from, {replace: true});
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <>
      <Helmet>
        <title>TOH | Login</title>
      </Helmet>
      <div className="container">
        <div
          className=" hero  min-h-screen bg-white text-indigo-500 login-bg "
          id=""
        >
          <div className="hero-content flex-col lg:flex-row">
            {/* <div className="text-center lg:text-right h-full w-full">
            
            <img src={cover} alt="" className='opacity-55' />
          </div> */}
            <div
              className="card shrink-0 w-full md:max-w-md md:mx-20   shadow-2xl bg-base-100  "
              id="login"
            >
              <div className="text-center ">
                <h1 className="text-3xl font-bold">Login now!</h1>
                <img className="h-40 w-48 mx-auto" src={gif} alt="" />
              </div>
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input
                    onBlur={handleValidateCaptcha}
                    type="text"
                    placeholder="Type captcha here"
                    name="captcha"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <button disabled={disabled} className="btn btn-success ">
                    Login
                  </button>
                </div>
                <Link to="/register">
                  <span className="text-yellow-600">
                    Don't Have an account?
                  </span>
                  <input
                    className=" text-indigo-400 btn hover:btn-link "
                    type="submit"
                    value="Register"
                  />
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
