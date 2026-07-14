import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";

import { toast } from "react-toastify"; //

import Search from "./Search";
import "../../App.css";


const Header = () => {
  const dispatch = useDispatch();

  // Updated slice
  const { user, loading } = useSelector((state) => state.user);
  const {cartItems} = useSelector((state => state.cart))

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [user]);

  const logoutHandler = () => {
    dispatch(logout());
    setMenuOpen(false);
    toast.success("Logged out successfully");
  };

  return (
    <>
      <nav className="navbar row sticky-top">
        {/* logo */}
        <div className="col-12 col-md-3 nav-logo-col">
          <Link to="/">
            <img src="/images/logo.webp" alt="logo" className="logo" />
          </Link>
        </div>

        {/* search */}
        <div className="col-12 col-md-6 mt-2 mt-md-0 nav-search-col">
          <Search />
        </div>

        {/* right side */}
        <div className="col-12 col-md-3 mt-4 mt-md-0 nav-actions-col">
          <Link to="/recipe-generator" className="nav-link-item">
            Recipe AI
          </Link>

          <Link to="/cart" className="nav-link-item">
            Cart
            <span id="cart_count">{cartItems.length}</span>
          </Link>

          {user ? (
            <div className="dropdown d-inline-block" ref={menuRef}>
              <button
                type="button"
                className="btn user-menu-toggle dropdown-toggle text-white"
                id="dropDownMenuButton"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user?.avatar?.url || "/images/images.png"}
                    alt={user?.name}
                    className="rounded-circle"
                  />
                </figure>

                <span>{user?.name}</span>
              </button>

              <div className={`dropdown-menu${menuOpen ? " show" : ""}`}>
                <Link
                  className="dropdown-item"
                  to="/eats/orders/me/myOrders"
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </Link>

                <Link
                  className="dropdown-item"
                  to="/users/me"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/users/login" className="nav-link-item nav-login-btn" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;