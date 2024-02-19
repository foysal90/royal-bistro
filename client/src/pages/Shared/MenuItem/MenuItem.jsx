
const MenuItem = ({item}) => {
    const {image, name,recipe, price} = item;
    return (
       <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-5 text-purple-500 my-4">
<img
  className="w-96 md:w-[110px] h-auto rounded-none md:rounded-tl-full"
  src={image}
  alt={name}
/>
<div className="flex-grow text-center md:text-left">
  <h3 className="uppercase font-bold">{name}</h3>
  <p>{recipe}</p>
</div>
<p className="text-yellow-600 font-semibold mt-2 md:mt-0">${price}</p>
</div> 
    );
};

export default MenuItem;



{/* <div className='text-purple-500 md:flex space-x-5 sm:text-red-500'>
<img style={{borderRadius:'0 200px 200px 200px'}}  className='md:w-[110px] ' src={image} alt="" />
<div>
    <h3 className='uppercase'>{name}</h3>
    <p>{recipe}</p>
</div>
<p className='text-yellow-600'>${price}</p>
</div> */}