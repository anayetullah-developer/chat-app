import { Outlet, useNavigate } from "react-router-dom";
import HeaderTop from "../HeaderTop/HeaderTop";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Chat from "../Chat/Chat";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
    useTitle("Home")
  if (!user) {
    navigate("/login");
  }

  if (room) {
    return (
      <div>
        <HeaderTop room={room}/>
        <Chat room={room}/>
        <Outlet />
      </div>
    );
  } else {
    return (
      <div className="bg-secondary w-50 w-sm-75 mx-auto mt-5 p-md-5 p-3 rounded">
        <div className="text-center">
          <h5 className="mb-4">Write chat Room Name</h5>
          <input
            className="p-2 rounded mb-3 mb-md-0 me-2 border-1 text-center text-md-start w-sm-75"
            type="text"
            placeholder="Write room name"
            ref={roomInputRef}
          />
          <button
            className="rounded p-2 border-1"
            type="submit"
            onClick={() => setRoom(roomInputRef.current.value)}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
};

export default Home;
