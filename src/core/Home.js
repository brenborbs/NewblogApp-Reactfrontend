import React from 'react';
import Banner from './HomeBanner';
import Posts from "../post/Posts";

const Home = () => (
  <div>
      <Banner />
      <div className="container">
        <Posts />
      </div>
  </div>
);

export default Home;