import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        
        <title>TOH | Home</title>
      </Helmet>

      <div className="mt-20">
      <Banner />
      </div>

      <Category />
      <PopularMenu />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default Home;
