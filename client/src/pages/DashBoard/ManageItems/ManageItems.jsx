import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
const ManageItems = () => {
  const [menu] = useMenu();

  return (
    <div className="w-full pl-10 ">
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
                      <div className="mask mask-squircle w-24 h-24">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                    {/* <div>
                      <div className="font-bold">Hart Hagerty</div>
                    </div> */}
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">edit</button>
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
