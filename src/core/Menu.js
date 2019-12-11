import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
};

// nav nav-tabs bg-primary

const Menu = ({ history }) => (
  <div>
    <ul className="navbar navbar-expand-md fixed-top">
      <Link className="navbar-brand" to="/">
        Marine Hacks
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/")} to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/users")}
              to="/users"
            >
              Users
            </Link>
          </li>

          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}

          {isAuthenticated() && isAuthenticated().user.role === "admin" && (
            <>
              <li className="nav-item">
                <Link
                  to={`/admin`}
                  style={isActive(history, `/admin`)}
                  className="nav-link"
                >
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/admin/create-category`}
                  style={isActive(history, `/admin/create-category`)}
                  className="nav-link"
                >
                  Create Category
                </Link>
              </li>
            </>
          )}

          {isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  to={`/findpeople`}
                  style={isActive(history, `/findpeople`)}
                  className="nav-link"
                >
                  Find People
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/post/create`}
                  style={isActive(history, `/post/create`)}
                  className="nav-link"
                >
                  Create Post
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={`/user/${isAuthenticated().user._id}`}
                  style={isActive(
                    history,
                    `/user/${isAuthenticated().user._id}`
                  )}
                  className="nav-link"
                >
                  {`${isAuthenticated().user.name}'s profile`}
                </Link>
              </li>

              <li className="nav-item">
                <span
                  className="nav-link"
                  style={
                    (isActive(history, "/signout"),
                    { cursor: "pointer", color: "#fff" })
                  }
                  onClick={() => signout(() => history.push("/"))}
                >
                  Sign Out
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </ul>
  </div>
);

export default withRouter(Menu);
