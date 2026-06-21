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

export default MessageBar;
