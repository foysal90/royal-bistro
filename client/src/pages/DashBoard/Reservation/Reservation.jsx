import { FaUtensils } from "react-icons/fa6";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Reservation = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  // Watch the time input so we can manipulate or use its value elsewhere if needed
  //const timeValue = watch("time");

  // Function to convert 24-hour time format to 12-hour format
  const formatTimeTo12Hour = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hours12 = hours % 12 || 12; // Convert hours to 12-hour format
    const amPm = hours >= 12 ? "PM" : "AM";
    return `${hours12}:${minutes} ${amPm}`;
  };

  const onSubmit = async (data) => {
    // Modify the data object to include the formatted time
    const formattedData = {
      ...data,
      time: formatTimeTo12Hour(data.time),
      name: data.name,
      email: data.email,
      guest: data.guest,
      mobile: data.mobile,
      date: data.date,
      message: data.message,
    };
    console.log(formattedData);
    const bookingInfo = await axiosSecure.post("/reservation", formattedData);
    console.log(bookingInfo.data, "reservation ");
    if (bookingInfo.data.insertedId) {
        // show success popup
        // reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Dear ${data.name} Your Reservation has been made.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
  };
  return (
    <div className="w-full px-10 text-blue-700">
      <SectionTitle
        subHeading="Reservation"
        heading="Book A Table"
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex gap-2 sm:grid grid-cols-1">
          <div>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text text-green-500">
                  Date <span className="text-red-600">*</span>
                </span>
              </div>
              <input
                type="date"
                className="input input-bordered w-64 "
                {...register("date", { required: true })}
              />
              {errors.date && errors.date.type === "required" && (
                <span className="text-red-600">Please Select a date</span>
              )}
            </label>
          </div>
          <div>
            <label className="form-control w-full">
              <div className="label ">
                <span className="label-text text-green-500">
                  guest <span className="text-red-600">*</span>
                </span>
              </div>
              <select
                defaultValue="1 Person"
                {...register("guest", { required: true })}
                className="select select-bordered w-64"
              >
                <option disabled>1 Person</option>
                <option value="1 Person">1 Person</option>
                <option value="2 People">2 People</option>
                <option value="3 People">3 People</option>
                <option value="4 People<">4 People</option>
                <option value="5 People">5 People</option>
                <option value="6 People">6 People</option>
              </select>
            </label>
            {errors.guest && errors.guest.type === "required" && (
              <span className="text-red-600">
                Please select your party size
              </span>
            )}
          </div>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-green-500">
                Time <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="time"
              className="input input-bordered w-64 "
              {...register("time", { required: true })}
            />
            {errors.time && errors.time.type === "required" && (
              <span className="text-red-600">Please Select a time </span>
            )}
          </label>
        </div>

        <div className="md:flex gap-2 sm:grid grid-cols-1">
          <div>
            <label className="form-control w-full  ">
              <div className="label">
                <span className="label-text text-green-500 ">
                  Phone Number <span className="text-red-600">*</span>
                </span>
              </div>
              <input
                className="input input-bordered w-64 "
                type="tel"
                placeholder="Mobile number"
                {...register("mobile", { required: true })}
              />
              {errors.mobile && errors.mobile.type === "required" && (
                <span className="text-red-600">Mobile number is required</span>
              )}
            </label>
          </div>
          <div>
            <label className="form-control w-full  ">
              <div className="label">
                <span className="label-text text-green-500 ">
                  name <span className="text-red-600">*</span>
                </span>
              </div>
              <input
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered w-64 "
                {...register("name", { required: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="text-red-600">Name is required</span>
              )}
            </label>
          </div>
          <div>
            <label className="form-control w-full  ">
              <div className="label">
                <span className="label-text text-green-500 ">
                  Email <span className="text-red-600">*</span>
                </span>
              </div>
              <input
                type="email"
                defaultValue={user?.email}
                className="input input-bordered w-64 "
                {...register("email", { required: true })}
              />
              {errors.email && errors.email.type === "required" && (
                <span className="text-red-600">Email is required</span>
              )}
            </label>
          </div>
        </div>

        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-green-500">
                Special Instruction
              </span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Please type here"
              {...register("message")}
            ></textarea>
          </label>
        </div>

        <button className="flex items-center justify-center  gap-2 btn btn-success btn-sm mt-5 w-48 text-white  ">
          Book A Table <FaUtensils />
        </button>
      </form>
    </div>
  );
};

export default Reservation;
