import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="navbar fixed z-10 opacity-30 max-w-screen-xl bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
            >
              <li>
                <Link to="/menu">Our Menu</Link>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>{" "}
            </li>
            <li>
              <Link to="/menu">Our Menu</Link>{" "}
            </li>
            <li>
              <Link to="/order/salad">Order Food</Link>{" "}
            </li>
            {user && isAdmin && (
              <li>
                <Link to="/dashboard/adminHome">Dashboard</Link>{" "}
              </li>
            )}
            {user && !isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/userHome">Dashboard</Link>{" "}
                </li>
                <li>
                  <Link to="/dashboard/cart">
                    <button className="btn">
                      <FaShoppingCart className="mr-4"></FaShoppingCart>
                      <div className="badge badge-secondary">
                        +{cart?.length}
                      </div>
                    </button>
                  </Link>{" "}
                </li>
              </>
            )}
            {user ? (
              <>
                <span>{user?.displayName}</span>
                <li onClick={handleLogOut} className="btn btn-ghost">
                  Logout
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link to="/login">Login</Link>{" "}
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Get Started</a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
