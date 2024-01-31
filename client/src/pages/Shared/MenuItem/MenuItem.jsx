
const MenuItem = ({item}) => {
    const {image, name,recipe, price} = item;
    return (
        <div className='text-purple-500 flex space-x-5 '>
            <img style={{borderRadius:'0 200px 200px 200px'}}  className='w-[110px] ' src={image} alt="" />
            <div>
                <h3 className='uppercase'>{name}-----------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-600'>${price}</p>
        </div>
    );
};

export default MenuItem;