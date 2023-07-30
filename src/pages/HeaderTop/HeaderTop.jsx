import { useContext } from "react";
import { Button, Image } from "react-bootstrap";
import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const HeaderTop = ({ room }) => {
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        // Sign-out successful.
      })
      .catch(() => {
        // An error happened.
      });
  };

  return (
    <>
      <div className="d-flex justify-content-start justify-content-md-between flex-md-row flex-column align-items-center gap-md-5 gap-3 py-3 bg-secondary w-75 w-sm-100 mx-auto p-md-5">
        <h2 className="m-0">
          <span className="text-white">Chat'sApp</span>
        </h2>
        <div>
          <h5 className="m-0 text-primary">
            Room Name: <span className="text-white text-uppercase">{room}</span>
          </h5>
        </div>
        <div>
          {user ? (
            <>
              {!user.photoURL ? (
                <FaUserTie className="user me-3" />
              ) : (
                <Image
                  src={user?.photoURL}
                  className="profile-picture mx-md-3"
                  roundedCircle
                  title={user?.displayName}
                />
              )}

              <Link to="/login">
                <Button
                  className="btn btn-outline-primary py-md-2 px-4 d-md-inline-block mt-2 mt-md-0 shadow-lg"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <Button className="btn btn-outline-primary py-md-2 px-4 d-md-inline-block mt-2 mt-md-0 shadow-lg">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
