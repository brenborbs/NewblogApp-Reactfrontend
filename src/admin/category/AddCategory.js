import React, { useState } from "react";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryFom()}
          {goBack()}
        </div>
      </div>
    </div>
  );
};

export default AddCategory;

// export default class AddCategory extends Component {
//   state = {
//     name: "",
//     error: false,
//     success: false
//   };

//   componentDidMount = () => {
//     // this.categoryData = new FormData();
//     this.setState({ user: isAuthenticated().user });
//   };

//   isValid = () => {
//     const { name } = this.state;

//     if (name.length === 0) {
//       this.setState({
//         error: "Category is required",
//         // loading: false,
//         success: false
//       });
//       return false;
//     }
//     return true;
//   };

//   handleChange = e => {
//     this.setState({ error: "" });
//     // this.categoryData.set(e);
//     this.setState({ name: e.target.value });
//   };

//   clickSubmit = e => {
//     e.preventDefault();
//     this.setState({ success: true });

//     if (this.isValid()) {
//       const userId = isAuthenticated().user._id;
//       const token = isAuthenticated().token;

//       createCategory(userId, token).then(data => {
//         if (data.error) this.setState({ error: data.error });
//         else {
//           this.setState({
//             success: false,
//             name: "",
//             error: ""
//           });
//         }
//       });
//     }
//   };

//   newCategoryForm = name => (
//     <form onSubmit={this.clickSubmit}>
//       <div className="form-group">
//         <label className="text-muted">Name</label>
//         <input
//           type="text"
//           className="form-control"
//           onChange={this.handleChange}
//           value={name}
//           autoFocus
//           required
//         />
//       </div>
//       <button className="btn btn-outline-primary">Create Category</button>
//     </form>
//   );

//   goBack = () => (
//     <div className="mt-5">
//       <Link to="/admin/dashboard" className="text-warning">
//         Back to Dashboard
//       </Link>
//     </div>
//   );

//   showSuccess = success => {
//     if (success) {
//       return <div className="">Category has been added</div>;
//     }
//   };

//   render() {
//     const { name, error, success } = this.state;
//     return (
//       <div className="container">
//         <h2 className="mt-5 mb-5">Add New Category</h2>
//         <div
//           className="alert alert-danger"
//           style={{ display: error ? "" : "none" }}
//         >
//           {this.showSuccess(success)}
//           {error}
//         </div>

//         {this.newCategoryForm(name)}
//       </div>
//     );
//   }
// }
