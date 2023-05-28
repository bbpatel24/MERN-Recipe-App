import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
    <figure className="navbar-logo-wrapper">
    <img className="navbar-logo" src="https://static.captcha-delivery.com/captcha/assets/set/707d12480d2fbb600f0f8e0c919978016abf803c/logo.png?update_cache=-1688440303173032789" alt="" />
    </figure>
      <div className="navbar-links">
      <Link className="navbar-link" to="/home">Home</Link>
      <Link className="navbar-link" to="/create-recipe">Create Recipe</Link>
      <Link className="navbar-link" to="/saved-recipes">Saved Recipes</Link>
      </div>
      {!cookies.access_token ? (
        <Link to="/register">SignUp</Link>
      ) : (
        <button className="navbar-logout-button" onClick={logout}> Logout </button>
      )}
    </div>
  );
};
