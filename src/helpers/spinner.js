import React from 'react';
import Spinner from "../images/spinner.gif";

const SpinnerGiff = () => {
  return (
    <div>
      <img
        src={Spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};

export default SpinnerGiff;