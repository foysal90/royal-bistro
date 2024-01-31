
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto md:w-4/12 text-center my-5 ">
            <p className="text-yellow-600">---{subHeading}---</p>
            <h3 className="text-4xl text-indigo-600 uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;