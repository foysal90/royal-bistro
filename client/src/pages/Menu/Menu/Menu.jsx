import { Helmet } from "react-helmet-async";
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import menuImg from "../../../assets/menu/banner3.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import Cover from "../../Shared/Cover/Cover";


const Menu = () => {
  const [menu] = useMenu();
  const offered = menu.filter((item) => item.category === "offered");
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter (item => item.category === 'salad')
  const soup = menu.filter(item => item.category === 'soup')

  return (
    <div>
      <Helmet>
        <title> TOH | menu </title>
      </Helmet>
      <Cover img={menuImg} title='our menu' subTitle="Welcome To Taste of Home exiting Home Made Authentic Food"/>
      <SectionTitle subHeading="Don't miss" heading="Today's offer" />
      <MenuCategory items={offered} />
      <MenuCategory items={dessert} img={dessertImg} title={"dessert"}/>
      <MenuCategory items={pizza} img={pizzaImg} title={"pizza"}/>
      <MenuCategory items={salad} title={"salad"} subTitle={"Healthy Salads"} img={saladImg}/>
      <MenuCategory items={soup} title={"soup"} subTitle={"Hot and delicious soup"} img={soupImg}/>
        
      </div>
      
    
  );
};

export default Menu;
