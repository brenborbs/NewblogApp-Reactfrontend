import React from "react";

const HomeBanner = () => {
  return (
    <div className="container">
      <div className="jumbotron p-3 p-md-5 text-gray rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic text-white">Marine Hacks</h1>
          <p className="lead my-3 text-white">
            Multiple lines of text that form the lede, informing new readers
            quickly and efficiently about what's most interesting in this post's
            contents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
