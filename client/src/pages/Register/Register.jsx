import { Link } from 'react-router-dom';
import gif from '../../assets/others/authentication.gif'

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
  }
    return (
        <div className="hero min-h-screen bg-white text-indigo-500">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-right">
            
            <img src={gif} alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="text-center">
             <h1 className="text-3xl font-bold">Please Register!</h1>
         </div>
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" required />
                
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input type="password" placeholder="confirm password" className="input input-bordered" required />
                
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <Link to='/login'>
              <input type="submit" value="Login" /></Link>
            </form>
          </div>
        </div>
      </div>
    )
};

export default Register;