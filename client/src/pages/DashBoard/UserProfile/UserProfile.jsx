import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";


const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const { displayName, photoURL, email,uid,metadata} = user;
    return (
      <div className="text-center uppercase py-24 ">
        {user && (
          <div className="card mx-auto p-10   text-center  glass">
            <figure>
              <img className="w-48 "
                src={photoURL}
                alt="user!"
              />
            </figure>
            <div className="card-body">
              <h2 className="text-3xl font-extrabold text-cyan-500">Name : {displayName}</h2>
              <p className="text-2xl text-cyan-600">Email : {email}</p>
              <p className="text-2xl text-cyan-600">UID: {uid}</p>
              <p>CreatedAt : {metadata.createdAt}</p>
              <p>creationTime : {metadata.creationTime}</p>
              <p>lastLoginAt : {metadata.lastLoginAt}</p>
              <p>lastSignInTime : {metadata.lastSignInTime}</p>
              
              <div className=" ">
                <Link to='/' className="btn btn-primary" >Go Home</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default UserProfile;