import image from "../assets/image_18fcf3e6.png";
const NoData = ({ text1, text2 }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh]">
      <p className="text-4xl font-bold text-red-700 relative top-20">{text1}</p>
      <img src={image} alt="" className="max-w-100 h-auto" />
      <p className="text-xl font-bold text-red-500 relative bottom-17">{text2}</p>
    </div>
  );
};

export default NoData;
