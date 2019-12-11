import React, { Component } from "react";
import { singlePost, remove, like, unlike } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import renderHTML from "react-render-html";
import Comment from "./Comment";
import Spinner from "../helpers/spinner";

class SinglePost extends Component {
  state = {
    post: "",
    redirectToHome: false,
    redirectToSignin: false,
    like: false,
    likes: 0,
    comments: []
  };

  checkLike = likes => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
          comments: data.comments
        });
      }
    });
  };

  updateComments = comments => {
    this.setState({ comments });
  };

  likeToggle = () => {
    if (!isAuthenticated()) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;

    callApi(userId, token, postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length
        });
      }
    });
  };

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your post?");
    if (answer) {
      this.deletePost();
    }
  };

  renderPost = post => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";

    const { like, likes } = this.state;

    return (
      <div className="">
        <h1 className="mt-4">{post.title}</h1>
        <hr />
        <p className="lead">
          Posted by <Link to={`${posterId}`}>{posterName} </Link>
          on {new Date(post.created).toDateString()}
        </p>
        <hr />
        <img
          src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
          alt={post.title}
          onError={i => (i.target.src = `${DefaultPost}`)}
          className="img-fluid rounded"
        />
        <hr />
        {like ? (
          <h3 onClick={this.likeToggle}>
            <i
              className="fa fa-heart-o text-success bg-light"
              style={{ padding: "10px", borderRadius: "50%" }}
            />{" "}
            {likes} Like
          </h3>
        ) : (
          <h3 onClick={this.likeToggle}>
            <i
              className="fa fa-heart-o text-warning bg-light"
              style={{ padding: "10px", borderRadius: "50%" }}
            />{" "}
            {likes} Like
          </h3>
        )}
        <hr />
        <div>{renderHTML(post.body)}</div>

        <div className="d-inline-block">
          <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-5">
            Back to posts
          </Link>

          {isAuthenticated().user &&
            isAuthenticated().user._id === post.postedBy._id && (
              <>
                <Link
                  to={`/post/edit/${post._id}`}
                  className="btn btn-raised btn-warning btn-sm mr-5"
                >
                  Update Post
                </Link>
                <button
                  onClick={this.deleteConfirmed}
                  className="btn btn-raised btn-danger"
                >
                  Delete Post
                </button>
              </>
            )}

          <div>
            {isAuthenticated().user && isAuthenticated().user.role === "admin" && (
              <div className="card mt-5">
                <div className="card-body">
                  <h5 className="card-title">Admin</h5>
                  <p className="mb-2 text-danger">Edit/Delete as an Admin</p>
                  <Link
                    to={`/post/edit/${post._id}`}
                    className="btn btn-raised btn-warning btn-sm mr-5"
                  >
                    Update Post
                  </Link>
                  <button
                    onClick={this.deleteConfirmed}
                    className="btn btn-raised btn-danger"
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { post, redirectToHome, redirectToSignin, comments } = this.state;

    if (redirectToHome) {
      return <Redirect to={`/`} />;
    } else if (redirectToSignin) {
      return <Redirect to={`/signin`} />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {!post ? (
              // <div className="jumbotron text-center">
              //   <h2>Loading...</h2>
              // </div>
              <div style={{ margin: "0 auto", width: "100%" }}>
                <Spinner />
              </div>
            ) : (
              this.renderPost(post)
            )}

            <Comment
              postId={post._id}
              comments={comments.reverse()}
              updateComments={this.updateComments}
            />
          </div>
          <div className="col-md-4">
            <div className="card my-4">
              <h5 className="card-header">Search</h5>
              <div className="card-body">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for..."
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-secondary" type="button">
                      Go!
                    </button>
                  </span>
                </div>
              </div>
            </div>
            {/* Widgets 1 */}
            <div className="card my-4">
              <h5 className="card-header">Categories</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <ul className="list-unstyled mb-0">
                      <li>
                        <a href="/">Web Design</a>
                      </li>
                      <li>
                        <a href="/">HTML</a>
                      </li>
                      <li>
                        <a href="/">Freebies</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="list-unstyled mb-0">
                      <li>
                        <a href="/">JavaScript</a>
                      </li>
                      <li>
                        <a href="/">CSS</a>
                      </li>
                      <li>
                        <a href="/">Tutorials</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* right column ends here */}
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePost;
