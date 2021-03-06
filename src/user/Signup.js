import React, { useState } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    open: false,
    recaptcha: false
  });

  const { name, email, password, error, open, recaptcha } = values;

  const recaptchaHandler = e => {
    setValues({ error: "" });
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
      setValues({ recaptcha: true });
      return true;
    } else {
      setValues({
        recaptcha: false
      });
      return false;
    }
  };

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values });
    const user = {
      name,
      email,
      password
    };
    // console.log(user);
    if (recaptcha) {
      signup(user).then(data => {
        if (data.error) {
          setValues({ error: data.error });
        } else {
          setValues({
            error: "",
            name: "",
            email: "",
            password: "",
            open: true
          });
        }
      });
    } else {
      setValues({
        error: "What day is today? Please write a correct answer!"
      });
    }
  };

  const signupForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
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
            onChange={recaptchaHandler}
            type="text"
            className="form-control"
          />
        </div>

        <button className="btn btn-raised btn-secondary">Submit</button>
      </form>
    );
  };

  return (
    <>
      <div className="sidenav">
        <div className="login-main-text">
          <h2>
            User
            <br /> Signup
          </h2>
          <p>Register here to access the app.</p>
        </div>
      </div>

      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            <SocialLogin />

            <hr />
            <br />

            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>

            <div
              className="alert alert-info"
              style={{ display: open ? "" : "none" }}
            >
              New account is successfully created. Please{" "}
              <Link to="/signin">Sign In</Link>
            </div>

            {signupForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

// class Signup extends Component {
//   state = {
//     name: "",
//     email: "",
//     password: "",
//     error: "",
//     open: false,
//     recaptcha: false
//   };

//   handleChange = name => event => {
//     this.setState({ error: "" });
//     this.setState({ [name]: event.target.value });
//   };

//   recaptchaHandler = e => {
//     this.setState({ error: "" });
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
//       this.setState({ recaptcha: true });
//       return true;
//     } else {
//       this.setState({
//         recaptcha: false
//       });
//       return false;
//     }
//   };

//   clickSubmit = event => {
//     event.preventDefault();
//     const { name, email, password } = this.state;
//     const user = {
//       name,
//       email,
//       password
//     };
//     // console.log(user);
//     if (this.state.recaptcha) {
//       signup(user).then(data => {
//         if (data.error) this.setState({ error: data.error });
//         else
//           this.setState({
//             error: "",
//             name: "",
//             email: "",
//             password: "",
//             open: true
//           });
//       });
//     } else {
//       this.setState({
//         error: "What day is today? Please write a correct answer!"
//       });
//     }
//   };

//   signupForm = (name, email, password, recaptcha) => (
//     <form>
//       <div className="form-group">
//         <label className="text-muted">Name</label>
//         <input
//           onChange={this.handleChange("name")}
//           type="text"
//           className="form-control"
//           value={name}
//         />
//       </div>
//       <div className="form-group">
//         <label className="text-muted">Email</label>
//         <input
//           onChange={this.handleChange("email")}
//           type="email"
//           className="form-control"
//           value={email}
//         />
//       </div>
//       <div className="form-group">
//         <label className="text-muted">Password</label>
//         <input
//           onChange={this.handleChange("password")}
//           type="password"
//           className="form-control"
//           value={password}
//         />
//       </div>

//       <div className="form-group">
//         <label className="text-muted">
//           {recaptcha ? "Thanks. You got it!" : "What day is today?"}
//         </label>

//         <input
//           onChange={this.recaptchaHandler}
//           type="text"
//           className="form-control"
//         />
//       </div>

//       <button
//         onClick={this.clickSubmit}
//         className="btn btn-raised btn-secondary"
//       >
//         Submit
//       </button>
//     </form>
//   );

//   render() {
//     const { name, email, password, error, open, recaptcha } = this.state;
//     return (
//       <>
//         <div className="sidenav">
//           <div className="login-main-text">
//             <h2>
//               User
//               <br /> Signup
//             </h2>
//             <p>Register here to access the app.</p>
//           </div>
//         </div>

//         <div className="main">
//           <div className="col-md-6 col-sm-12">
//             <div className="login-form">
//               <SocialLogin />

//               <hr />
//               <br />

//               <div
//                 className="alert alert-danger"
//                 style={{ display: error ? "" : "none" }}
//               >
//                 {error}
//               </div>

//               <div
//                 className="alert alert-info"
//                 style={{ display: open ? "" : "none" }}
//               >
//                 New account is successfully created. Please{" "}
//                 <Link to="/signin">Sign In</Link>
//               </div>

//               {this.signupForm(name, email, password, recaptcha)}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default Signup;
