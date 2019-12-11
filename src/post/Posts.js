import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";

class Posts extends Component {
  state = {
    posts: [],
    page: 1
  };

  // load posts function for lifecycle
  loadPosts = page => {
    list(page).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };
  // load posts lifecycle
  componentDidMount = () => {
    this.loadPosts(this.state.page);
  };

  loadMore = number => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
  };

  loadLess = number => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
  };

  renderPosts = posts => {
    return (
      <div className="card-deck">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          return (
            <div className="card mb-4" key={i}>
              <div className="view overlay">
                <img
                  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                  alt={post.title}
                  onError={i => (i.target.src = `${DefaultPost}`)}
                  className="card-img-top"
                  style={{ height: "200px" }}
                />
                <div className="mask rgba-white-slight" />
              </div>
              <div className="card-body">
                <h4 className="card-title">{post.title}</h4>
                <div className="card-text">
                  {renderHTML(post.body.substring(0, 100))}...
                </div>
                <p className="card-text">
                  Posted by <Link to={`${posterId}`}>{posterName} </Link>
                  on {new Date(post.created).toDateString()}
                </p>
                <Link to={`/post/${post._id}`} className="btn btn-outline-dark">
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts, page } = this.state;
    return (
      <div className="home_container">
        <h2>{!posts.length ? "No more posts!" : "Latest Posts"}</h2>

        <div className="row">{this.renderPosts(posts)}</div>

        {page > 1 ? (
          <button
            className="btn btn-raised btn-info mr-5 mt-5 mb-5"
            onClick={() => this.loadLess(1)}
          >
            Previous ({this.state.page - 1})
          </button>
        ) : (
          ""
        )}

        {posts.length ? (
          <button
            className="btn btn-raised btn-dark mt-5 mb-5"
            onClick={() => this.loadMore(1)}
          >
            Next ({page + 1})
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Posts;
