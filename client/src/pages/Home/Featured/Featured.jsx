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
    <div className="featured-item bg-fixed my-20">
      <SectionTitle subHeading={"check it out"} heading={"Featured Item"} />
      <div className="md:flex justify-center items-center py-20 px-36 gap-10">
        <div>
          <img className="" src={featureImg} alt="" />
        </div>
        <div className="text-violet-600">
          <h1>{dateString}</h1>
          <h1 className="uppercase ">Where can I get Some?</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda,
            culpa! Dolorum, quos blanditiis est aspernatur natus delectus omnis
            consequuntur enim magni laboriosam repellat eum ea ipsum eveniet
            officiis, incidunt in.
          </p>
          <button className="btn btn-outline border-0 border-b-4 text-fuchsia-500 mt-2">ORDER NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
