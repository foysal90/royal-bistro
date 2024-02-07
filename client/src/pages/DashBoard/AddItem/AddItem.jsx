import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
const imgHostingToken = import.meta.env.VITE_IMAGE_UPLOADER_KEY;
const AddItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const image_hosting_URL = `https://api.imgbb.com/1/upload?key=${imgHostingToken}`;

  const onSubmit = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(image_hosting_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          //distract
          const { name, price, category, recipe } = data;
          //converting price tofloat from string
          const newItem = {
            name,
            price: parseFloat(price),
            category,
            recipe,
            image: imgURL,
          };
          console.log(newItem);
        }
      });
  };

  return (
    <div className="w-full px-10 text-blue-700">
      <SectionTitle
        subHeading="What's new?"
        heading="Add an Item"
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-green-500">
                Recipe Name <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Recipe Name.."
              className="input input-bordered w-full "
              {...register("name", { required: true, maxLength: 80 })}
            />
            {errors.name && errors.name.type === "required" && (
              <span className="text-red-600">Recipe Name is required</span>
            )}
            {errors.name && errors.name.type === "maxLength" && (
              <span>Max length exceeded</span>
            )}
          </label>
        </div>

        <div className="flex gap-5">
          <div>
            <label className="form-control w-full">
              <div className="label ">
                <span className="label-text text-green-500">
                  Category <span className="text-red-600">*</span>
                </span>
              </div>
              <select
                defaultValue="Pick One"
                {...register("category", { required: true })}
                className="select select-bordered w-96"
              >
               
                <option disabled>Pick One</option>
                <option value="Pizza">Pizza</option>
                <option value="Soup">Soup</option>
                <option value="Salad">Salad</option>
                <option value="Dessert">Dessert</option>
                <option value="Offered">Offered</option>
                <option value="Drinks">Drinks</option>
              </select>
              
            </label>
            {errors.recipe && errors.recipe.type === "required" && (
                <span className="text-red-600">category Name is required</span>
              )}
          </div>
          <div>
            <label className="form-control w-full  ">
              <div className="label">
                <span className="label-text text-green-500 ">
                  Price <span className="text-red-600">*</span>
                </span>
              </div>
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered w-96 "
                {...register("price", { required: true })}
              />
              {errors.price && errors.price.type === "required" && (
                  <span className="text-red-600">price is required</span>
                )}
            </label>
          </div>
        </div>

        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-green-500">
                Recipe Details <span className="text-red-600">*</span>
              </span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
              {...register("recipe", { required: true })}
            ></textarea>
            {errors.recipe && errors.recipe.type === "required" && (
                <span className="text-red-600">Recipe details is required</span>
              )}
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-sm">
            <div className="label">
              <span className="label-text text-green-500">
                Item Image <span className="text-red-600">*</span>
              </span>
            </div>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-accent  w-full "
            />
            {errors.image && errors.image.type === "required" && (
                <span className="text-red-600">image is required</span>
              )}
          </label>
        </div>
        <div>
          <input
            className="btn btn-sm btn-success mt-5 w-48 text-white"
            type="submit"
            value="Add Item"
          />
        </div>
      </form>
    </div>
  );
};

export default AddItem;
