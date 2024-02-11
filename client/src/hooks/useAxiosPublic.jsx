import axios from "axios";

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: "https://royal-bistro-server.vercel.app",
  });

  return axiosPublic;
};

export default useAxiosPublic;
