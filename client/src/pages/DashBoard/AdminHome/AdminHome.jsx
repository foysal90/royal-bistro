import useAuth from "../../../hooks/useAuth";


const AdminHome = () => {
    const {user} = useAuth()
    return (
        <div className="w-full m-5">
            <h1 className="text-2xl "> Welcome Back, {user.displayName}</h1>
        </div>
    );
};

export default AdminHome;