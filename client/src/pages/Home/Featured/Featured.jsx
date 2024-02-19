import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featureImg from "../../../assets/home/featured.jpg";
import './Featured.css'
const Featured = () => {
  const date = new Date();

  // Format the date as a string (e.g., "January 27, 2024")
  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="featured-item my-20 bg-fixed">
    <SectionTitle subHeading={"Check it out"} heading={"Featured Item"} />
    <div className="flex flex-col md:flex-row justify-center items-center py-10 px-4 md:py-20 md:px-36 gap-10">
      <div>
        <img src={featureImg} alt="Featured" className="max-w-full h-auto" />
      </div>
      <div className="text-violet-600 text-center md:text-left">
        <h1 className="text-lg md:text-xl">{dateString}</h1>
        <h1 className="text-xl md:text-2xl uppercase mt-2">Where can I get Some?</h1>
        <p className="mt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda,
          culpa! Dolorum, quos blanditiis est aspernatur natus delectus omnis
          consequuntur enim magni laboriosam repellat eum ea ipsum eveniet
          officiis, incidunt in.
        </p>
        <button className="btn btn-outline border-0 border-b-4 text-fuchsia-500 mt-4">ORDER NOW</button>
      </div>
    </div>
  </div>
  );
};

export default Featured;
