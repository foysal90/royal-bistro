import useAuth from "../../../hooks/useAuth";
import UserProfile from "../UserProfile/UserProfile";


const UserHome = () => {
    const {user} = useAuth()
    return (
        <div className="w-full m-5">
            <h1 className="text-2xl "> Welcome Back, {user.displayName}</h1>
            <UserProfile/>
        </div>
    );
};

export default UserHome;