import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";
import Spinner from "../helpers/spinner";

// const Signin = () => {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//     error: "",
//     redirectToReferer: false,
//     loading: false,
//     recaptcha: false
//   });

//   const {
//     email,
//     password,
//     error,
//     redirectToReferer,
//     recaptcha,
//     loading
//   } = values;

//   const handleChange = name => event => {
//     setValues({ ...values, error: false, [name]: event.target.value });
//   };

//   const recaptchaHandler = e => {
//     setValues({ error: "" });
//     let userDay = e.target.value.toLowerCase();
//     let dayCount;

//     if (userDay === "sunday") {
//       dayCount = 0;
//     } else if (userDay === "monday") {
//       dayCount = 1;
//     } else if (userDay === "tuesday") {
//       dayCount = 2;
//     } else if (userDay === "wednesday") {
//       dayCount = 3;
//     } else if (userDay === "thursday") {
//       dayCount = 4;
//     } else if (userDay === "friday") {
//       dayCount = 5;
//     } else if (userDay === "saturday") {
//       dayCount = 6;
//     }

//     if (dayCount === new Date().getDay()) {
//       setValues({ recaptcha: true });
//       return true;
//     } else {
//       setValues({
//         recaptcha: false
//       });
//       return false;
//     }
//   };

//   const clickSubmit = event => {
//     event.preventDefault();
//     setValues({ ...values, loading: true });
//     const user = {
//       email,
//       password
//     };

//     if (recaptcha) {
//       signin(user).then(data => {
//         if (data.error) {
//           setValues({ ...values, error: data.error, loading: false });
//         } else {
//           // authenticate
//           authenticate(data, () => {
//             setValues({ redirectToReferer: true });
//           });
//         }
//       });
//     } else {
//       setValues({
//         loading: false,
//         error: "What day is today? Please write a correct answer!"
//       });
//     }
//   };

//   const signinForm = () => {
//     return (
//       <form onSubmit={clickSubmit}>
//         <div className="form-group">
//           <label className="text-muted">Email</label>
//           <input
//             onChange={handleChange("email")}
//             type="email"
//             className="form-control"
//             value={email}
//           />
//         </div>
//         <div className="form-group">
//           <label className="text-muted">Password</label>
//           <input
//             onChange={handleChange("password")}
//             type="password"
//             className="form-control"
//             value={password}
//           />
//         </div>

//         <div className="form-group">
//           <label className="text-muted">
//             {recaptcha ? "Thanks. You got it!" : "What day is today?"}
//           </label>

//           <input
//             onChange={recaptchaHandler}
//             type="text"
//             className="form-control"
//           />
//         </div>

//         <button className="btn btn-raised btn-secondary">Submit</button>
//       </form>
//     );
//   };

//   if (redirectToReferer) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <>
//       <div className="sidenav">
//         <div className="login-main-text">
//           <h2>
//             User <br /> Signin
//           </h2>
//           <p>Login here to access the app</p>
//         </div>
//       </div>

//       <div className="main">
//         <div className="col-md-6 col-sm-12">
//           <div className="login-form">
//             {/* <hr /> */}
//             <SocialLogin />
//             <hr />
//             <br />

//             <div
//               className="alert alert-danger"
//               style={{ display: error ? "" : "none" }}
//             >
//               {error}
//             </div>

//             {loading ? (
//               // <div className="jumbotron text-center">
//               // <h2>Please wait while app is loading...</h2>
//               // </div>
//               <div style={{ margin: "0 auto", width: "100%" }}>
//                 <Spinner />
//               </div>
//             ) : (
//               ""
//             )}

//             {signinForm()}

//             <p>
//               <Link to="/forgot-password" className="btn btn-raised btn-danger">
//                 {" "}
//                 Forgot Password
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signin;

class Signin extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    redirectToReferer: false,
    loading: false,
    recaptcha: false
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  recaptchaHandler = e => {
    this.setState({ error: "" });
    let userDay = e.target.value.toLowerCase();
    let dayCount;

    if (userDay === "sunday") {
      dayCount = 0;
    } else if (userDay === "monday") {
      dayCount = 1;
    } else if (userDay === "tuesday") {
      dayCount = 2;
    } else if (userDay === "wednesday") {
      dayCount = 3;
    } else if (userDay === "thursday") {
      dayCount = 4;
    } else if (userDay === "friday") {
      dayCount = 5;
    } else if (userDay === "saturday") {
      dayCount = 6;
    }

    if (dayCount === new Date().getDay()) {
      this.setState({ recaptcha: true });
      return true;
    } else {
      this.setState({
        recaptcha: false
      });
      return false;
    }
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    // console.log(user);
    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
    if (this.state.recaptcha) {
      signin(user).then(data => {
        if (data.error) {
          this.setState({ error: data.error, loading: false });
        } else {
          // authenticate
          authenticate(data, () => {
            this.setState({ redirectToReferer: true });
          });
        }
      });
    } else {
      this.setState({
        loading: false,
        error: "What day is today? Please write a correct answer!"
      });
    }
  };

  signinForm = (email, password, recaptcha) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          {recaptcha ? "Thanks. You got it!" : "What day is today?"}
        </label>

        <input
          onChange={this.recaptchaHandler}
          type="text"
          className="form-control"
        />
      </div>

      <button
        onClick={this.clickSubmit}
        className="btn btn-raised btn-secondary"
      >
        Submit
      </button>
    </form>
  );

  render() {
    const {
      email,
      password,
      error,
      redirectToReferer,
      loading,
      recaptcha
    } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>
              User <br /> Signin
            </h2>
            <p>Login here to access the app</p>
          </div>
        </div>

        <div className="main">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              {/* <hr /> */}
              <SocialLogin />
              <hr />
              <br />

              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>

              {loading ? (
                // <div className="jumbotron text-center">
                // <h2>Please wait while app is loading...</h2>
                // </div>
                <div style={{ margin: "0 auto", width: "100%" }}>
                  <Spinner />
                </div>
              ) : (
                ""
              )}

              {this.signinForm(email, password, recaptcha)}

              <p>
                <Link
                  to="/forgot-password"
                  className="btn btn-raised btn-danger"
                >
                  {" "}
                  Forgot Password
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Signin;
