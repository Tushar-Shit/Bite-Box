import image from "../assets/image_18fcf3e6.png";
const NoData = ({text1, text2}) => {
  return (
    <div className="w-full h-10/12 flex items-center justify-center relative">
      <div className="flex flex-col items-center relative">
        <p className="text-4xl font-bold absolute top-8 text-red-700">{text1}</p>
        <img src={image} alt="" className="" />
        <p className="text-xl font-bold absolute bottom-7 text-red-500">{text2}</p>
      </div>
    </div>
  );
};

export default NoData;
