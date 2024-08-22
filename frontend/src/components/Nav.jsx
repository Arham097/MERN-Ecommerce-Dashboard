import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/add"> Add Product</Link>
          </li>
          <li>
            <Link to="/update/:id"> Update</Link>
          </li>
          <li>
            <Link to="/profile"> Profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/login"> Login</Link>
          </li>
          <li>
            <Link to="/signup"> Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
