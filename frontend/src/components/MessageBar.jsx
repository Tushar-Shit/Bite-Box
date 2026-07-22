import { useState } from "react";
const MessageBar = ({ message }) => {
  const [show, setShow] = useState(false);
  function handleShow() {
    setShow(!show);
  }
  return (
    <div
      className={`h-15 w-screen bg-zinc-600 p-2 pr-10 fixed bottom-20 z-10 text-white text-lg flex justify-between items-center
    ${show && "hidden"}`}
    >
      <p>{message}</p>
      <p className="text-3xl" onClick={handleShow}>
        &times;
      </p>
    </div>
  );
};

const ShortMsg = ({ message }) => {
  // console.log(message)
  const [show, setShow] = useState(false);
  function handleShow() {
    setShow(!show);
  }
  return (
    <div
      className={`h-fit w-full z-100 fixed bottom-22 text-lg font-bold flex justify-center items-center
    ${show && "hidden"}`}
    >
      <span className="rounded-xl p-2 bg-zinc-700 text-white">{message}</span>
      
    </div>
  );
};

export default MessageBar;
export {ShortMsg};