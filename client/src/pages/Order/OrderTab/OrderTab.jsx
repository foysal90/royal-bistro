

import FoodCard from '../../../components/FoodCard/FoodCard';


const OrderTab = ({items}) => {
 
 
  // const qtyCount = () => {
    
  //   const qty = parseInt(qty, 10);
  //   return qty
    

  // };
    return (
        <div className="grid md:grid-cols-3 gap-5 m-10">
            {
            items.map((item) => (
              <FoodCard key={item._id} item={item}   />
            ))
            }
          </div>
    );
};

export default OrderTab;