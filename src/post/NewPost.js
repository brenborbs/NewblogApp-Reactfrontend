import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
// import CKEditor from 'react-ckeditor-component';
import { create } from "./apiPost";
import { getCategories } from "../admin/category/apiAdmin";
// import { Redirect } from "react-router-dom";

// editor
import ReactQuill from "react-quill";
import { QuillModules, QuillFormats } from "../helpers/quill";
import "../../node_modules/react-quill/dist/quill.snow.css";

const NewPost = () => {
  // grab blog body from local storage
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("post")) {
      return JSON.parse(localStorage.getItem("post"));
    } else {
      return false;
    }
  };

  // const [categories, setCategories] = useState([]);
  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    title: "",
    body: "",
    photo: "",
    error: "",
    fileSize: 0,
    loading: false,
    redirectToProfile: false,
    categories: [],
    formData: "",
    success: ""
  });

  // const { token } = isAuthenticated();

  const { title, error, formData, success, categories } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          formData: new FormData(),
          categories: data
          // formData: new FormData()
        });
      }
    });
  };

  const isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
      setValues({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      setValues({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    if (isValid()) {
      const token = isAuthenticated().token;
      create(token, formData).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            loading: false,
            title: "",
            body: "",
            error: "",
            redirectToProfile: true,
            success: `A new blog titled "${data.title}" is created`
          });
          setBody("");
        }
      });
    }
  };

  const handleBody = e => {
    // console.log(e);
    setValues("body", e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const newPostForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post Photo</label>
        <input
          onChange={handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          onChange={handleChange("title")}
          type="text"
          className="form-control"
          value={title}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Body</label>
        {/* <textarea
        onChange={this.handleChange("body")}
        type="text"
        className="form-control"
        value={body}
        rows="20"
      /> */}
        <ReactQuill
          modules={QuillModules}
          formats={QuillFormats}
          value={body}
          placeholder="Write something amazing..."
          onChange={handleBody}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <button onClick={clickSubmit} className="btn btn-raised btn-primary">
        Create Post
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Create a new post</h2>
      <div className="col-md-8">
        {newPostForm()}
        <div className="pt-3">
          {showError()}
          {showSuccess()}
        </div>
      </div>
    </div>
  );
};

export default NewPost;

// class NewPost extends Component {
//   state = {
//     title: "",
//     body: "",
//     photo: "",
//     error: "",
//     user: {},
//     fileSize: 0,
//     loading: false,
//     redirectToProfile: false,
//     categories: []
//   };

//   // grab blog body from local storage
//   blogFromLS = () => {
//     if (typeof window === "undefined") {
//       return false;
//     }

//     if (localStorage.getItem("post")) {
//       return JSON.parse(localStorage.getItem("post"));
//     } else {
//       return false;
//     }
//   };

//   componentDidMount = () => {
//     this.postData = new FormData();
//     this.setState({ user: isAuthenticated().user });
//   };

//   isValid = () => {
//     const { title, body, fileSize } = this.state;
//     if (fileSize > 100000) {
//       this.setState({
//         error: "File size should be less than 100kb",
//         loading: false
//       });
//       return false;
//     }
//     if (title.length === 0 || body.length === 0) {
//       this.setState({ error: "All fields are required", loading: false });
//       return false;
//     }
//     return true;
//   };

//   // handleEditorChange = event => {
//   //     const newBody = event.editor.getData();
//   //     this.setState({ body: newBody });
//   //   };

//   handleChange = name => event => {
//     this.setState({ error: "" });
//     const value = name === "photo" ? event.target.files[0] : event.target.value;

//     const fileSize = name === "photo" ? event.target.files[0].size : 0;
//     this.postData.set(name, value);
//     this.setState({ [name]: value, fileSize });
//   };

//   clickSubmit = event => {
//     event.preventDefault();
//     this.setState({ loading: true });

//     if (this.isValid()) {
//       const userId = isAuthenticated().user._id;
//       const token = isAuthenticated().token;

//       create(userId, token, this.postData).then(data => {
//         if (data.error) this.setState({ error: data.error });
//         else {
//           this.setState({
//             loading: false,
//             title: "",
//             body: "",
//             redirectToProfile: true
//           });
//         }
//       });
//     }
//   };

//   handleBody = e => {
//     // console.log(e);
//     this.setState({ body: e });
//     this.postData.set("body", e);
//     if (typeof window !== "undefined") {
//       localStorage.setItem("blog", JSON.stringify(e));
//     }
//   };

//   newPostForm = (title, body) => (
//     <form>
//       <div className="form-group">
//         <label className="text-muted">Post Photo</label>
//         <input
//           onChange={this.handleChange("photo")}
//           type="file"
//           accept="image/*"
//           className="form-control"
//         />
//       </div>
//       <div className="form-group">
//         <label className="text-muted">Title</label>
//         <input
//           onChange={this.handleChange("title")}
//           type="text"
//           className="form-control"
//           value={title}
//         />
//       </div>

//       <div className="form-group">
//         <label className="text-muted">Body</label>
//         {/* <textarea
//           onChange={this.handleChange("body")}
//           type="text"
//           className="form-control"
//           value={body}
//           rows="20"
//         /> */}
//         <ReactQuill
//           modules={QuillModules}
//           formats={QuillFormats}
//           value={body}
//           placeholder="Write something amazing..."
//           onChange={this.handleBody}
//         />
//       </div>

//       <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
//         Create Post
//       </button>
//     </form>
//   );

//   render() {
//     const {
//       title,
//       body,
//       // photo,
//       user,
//       error,
//       loading,
//       redirectToProfile
//     } = this.state;

//     if (redirectToProfile) {
//       return <Redirect to={`/user/${user._id}`} />;
//     }

//     return (
//       <div className="container">
//         <h2 className="mt-5 mb-5">Create a new post</h2>
//         <div
//           className="alert alert-danger"
//           style={{ display: error ? "" : "none" }}
//         >
//           {error}
//         </div>

//         {loading ? (
//           <div className="jumbotron text-center">
//             <h2>Loading...</h2>
//           </div>
//         ) : (
//           ""
//         )}

//         {this.newPostForm(title, body)}
//       </div>
//     );
//   }
// }

// export default NewPost;
