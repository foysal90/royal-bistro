import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import useActions from "../../../hooks/useActions";
import { Link } from "react-router-dom";
//import Swal from "sweetalert2";
//import useAxiosSecure from "../../../hooks/useAxiosSecure";
const ManageItems = () => {
  const [menu] = useMenu();
  const [handleDelete] = useActions();
  //const [axiosSecure] = useAxiosSecure()

  //   const handleDelete = (item) => {
  //     Swal.fire({
  //         title: `Do You Want to delete ${item.name} ?`,
  //         imageUrl: `${item.image}`,
  //         imageWidth: 400,
  //         imageHeight: 200,
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: `Yes, delete it !!`,
  //       })
  //       .then(result => {
  //         if (result.isConfirmed) {
  //             axiosSecure.delete(`/menu/${item._id}`)
  //             .then(res => {
  //                 console.log('deleted item', res.data)
  //                 if (res.data.deletedCount >0) {
  //                     refetch();
  //                     //alert(`${item.name} has been deleted`)
  //                     let timerInterval;
  //               Swal.fire({
  //                 position: "top-center",
  //                 title: `${item.name} will delete in <b></b> milliseconds.`,

  //                 timer: 2000,
  //                 timerProgressBar: true,
  //                 didOpen: () => {
  //                     Swal.showLoading();
  //                     const timer = Swal.getPopup().querySelector("b");
  //                     timerInterval = setInterval(() => {
  //                       timer.textContent = `${Swal.getTimerLeft()}`;
  //                     }, 100);
  //                   },
  //                   willClose: () => {
  //                     clearInterval(timerInterval);
  //                   },
  //                   showClass: {
  //                     popup: `
  //                       animate__animated
  //                       animate__fadeInUp
  //                       animate__faster
  //                     `,
  //                   },
  //                   hideClass: {
  //                     popup: `
  //                       animate__animated
  //                       animate__fadeOutDown
  //                       animate__faster
  //                     `,
  //                   },
  //                 })
  //                 }

  //             })
  //         }
  //       })

  //   }

  return (
    <div className="w-full md:pl-10  ">
      <Helmet>
        <title>Dashboard | Manage Item</title>
      </Helmet>

      <SectionTitle
        subHeading="Hurry up"
        heading="Manage all items"
      ></SectionTitle>
      <h1 className="text-center my-5 font-semibold">
        Total items : {menu.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            
              
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle lg:w-24 lg:h-24 sm:w-8 sm:h-8">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                   
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <div className="dropdown dropdown-hover  ">
                  <div tabIndex={0} role="button" className="btn mt-8">
                    Action
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content   z-[1] menu shadow bg-base-100  "
                  >
                   <div className="flex lg:gap-5">
                   <li>
                   
                    <Link to={`/dashboard/update/${item._id}`} className="btn btn-circle bg-yellow-600 btn-sm"><FaRegEdit className="text-white absolute left-2 " /></Link>
                    
                    </li>
                    <li>
                    <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-circle bg-red-600 btn-sm"
                  >
                    <FaTrashAlt className="text-white absolute left-2 "></FaTrashAlt>
                  </button>
                    </li>
                   </div>
                  </ul>
                </div>
                {/* <td>
                  <button className="btn btn-ghost btn-xs">edit</button>
                </td>
                <td>
                <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-circle bg-red-600 btn-sm"
                  >
                    <FaTrashAlt className="text-white"></FaTrashAlt>
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
