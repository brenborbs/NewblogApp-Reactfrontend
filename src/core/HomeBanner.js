import React from 'react';

const HomeBanner = () => {
  return (
    <section className="py-5" id="banner">
      <div className="container">
        <div className="row align-items-center viewport-80">
          <div className="col-10 mx-auto text-center">
            <h1 className="display-2 text-uppercase text-white banner-title">Marine Hacks</h1>
            <h2 className="text-muted text-capitalized">Life at sea, simplified and explained</h2>
             {/* <a href="#" class="btn banner-link m-3">Start Now</a>
            <a href="#" class="btn banner-link m-3">Learn More</a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;