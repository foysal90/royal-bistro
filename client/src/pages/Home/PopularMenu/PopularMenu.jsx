
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu([]);
  const popular = menu.filter(item => item.category === 'popular')

  
  return (
    <section>
      <SectionTitle subHeading={"Popular Items"} heading={"from our menu"} />
      <div className="grid md:grid-cols-2 gap-5 my-5">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
      <div className="w-48 mx-auto my-10">
      <button className="btn btn-outline border-0 border-b-4 ">
        View Full Menu
      </button>
      </div>
    </section>
  );
};

export default PopularMenu;
