import React from 'react';
import Banner from './HomeBanner';
import Posts from "../post/Posts";

const Home = () => (
  <>
    <div>
    <Banner />
    </div>
      <div className="container">
        <Posts />
      </div>
  </>
);

export default Home;