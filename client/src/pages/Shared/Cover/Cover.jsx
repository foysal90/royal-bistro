import { Parallax } from "react-parallax";
const Cover = ({ img, title, subTitle }) => {
  return (
    <Parallax
    blur={{ min: -120, max: 120 }}
    bgImage={img}
    bgImageAlt="the menu"
    strength={-200}
    >
      <div className="hero min-h-[600px]">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md bg-black opacity-30 px-20 py-5 rounded-sm text-white">
            <h1 className="mb-5 text-3xl font-bold uppercase">{title}</h1>
            <p className="mb-5 uppercase">{subTitle}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
