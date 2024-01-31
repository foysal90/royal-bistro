import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({items, title, img,subTitle}) => {
    return (
        <div>
              { title &&  <Cover img={img} title={title} subTitle={subTitle} />}
              <div className="grid md: grid-cols-2 gap-10 m-10">
                {
                    items.map(item => <MenuItem key={item._id} item={item} />)
                }
              </div>
             <div className="mx-auto w-48 mb-10">
             <Link to={`/order/${title}`} >
              <button className="btn btn-outline   border-0 border-b-4 text-green-500 mt-2">Order your fav food</button></Link>
             </div>
        </div>
    );
};

export default MenuCategory;