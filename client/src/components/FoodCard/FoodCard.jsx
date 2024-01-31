

const FoodCard = ({item}) => {
    const {price, name, recipe, image} = item;
    return (
      <div className="card w-96 bg-slate-50 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={image}
            alt="loading..."
            className="rounded-xl"
          />
        </figure>
        <p className="absolute right-0 mr-4 mt-6 px-5 py-1 bg-indigo-900 text-white ">${price}</p>
        <div className="card-body items-center text-center">
            
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions">
            <button className="btn bg-yellow-700 hover:bg-yellow-900 text-white">Add To Cart</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;