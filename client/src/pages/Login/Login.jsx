import { Link } from 'react-router-dom';
import gif from '../../assets/others/authentication.gif'
import './Login.css'
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

import { useEffect, useRef, useState } from 'react';
const Login = () => {
 const [disabled,setDisabled] = useState(true)

 
const captchaRef = useRef(null)


  useEffect(() => {
    loadCaptchaEnginge(6); 
  },[])

  //validating captcha
  const handleValidateCaptcha = () => {
    const captchaValue = captchaRef.current.value;
    if (validateCaptcha(captchaValue)==true) {
      //alert('Captcha Matched');
      setDisabled(false)
      

  }

  else {
      //alert('Captcha Does Not Match');
      setDisabled(true)
  }
    

  }

  const handleLogin = (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = {email, password}
    console.log(user)
  }
    return (
        <div className="hero min-h-screen bg-white text-indigo-500">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-right">
            
            <img src={gif} alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100" id='login'>
          <div className="text-center my-5">
             <h1 className="text-5xl font-bold">Login now!</h1>
         </div>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                <LoadCanvasTemplate />
                </label>
                <input type="text" placeholder="Type captcha here" ref={captchaRef} name='captcha' className="input input-bordered" required />
               
              </div>
              <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs bg-blue-950 text-white'>Validate</button>
              <div className="form-control mt-6">
                <button disabled={disabled} className="btn btn-success ">Login</button>
              </div>
             <Link to='/register'> <span className='text-yellow-600'>  Don't Have an account?</span>
             <input className=' text-indigo-400 btn hover:btn-link ' type="submit" value='Register' />
            </Link>
            </form>
          </div>
         
        </div>
      </div>
    )
};

export default Login;