import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 footer-title py-5">
          <h1 className="text-capitalize text-center">
            <strong className="footer-title">Marine Hack</strong>
          </h1>
          <div className="footer-icons mt-3 d-flex justify-content-around flex-wrap">
            <Link to="#" className="footer-icon">
              <i className="fa fa-facebook-official" aria-hidden="true"></i>
            </Link>
            <Link to="#" className="footer-icon">
              <i className="fa fa-twitter"></i>
            </Link>
            <Link to="#" className="footer-icon">
              <i className="fa fa-instagram"></i>
            </Link>
            <Link to="#" className="footer-icon">
              <i className="fa fa-google-plus"></i>
            </Link>

          </div>
        </div>
        <div className="col-md-6 footer-contact text-center text-capitalize p-5">
          <h3 className="mb-5">contact</h3>
          <p className="d-flex flew-wrap">
            <span className="mr-4 footer-icon">
              <i className="fa fa-map"></i>
            </span>
            <span>
              123 main street, san diego CA 90101
            </span>
          </p>
          <p className="d-flex flew-wrap">
            <span className="mr-4 footer-icon">
              <i className="fa fa-phone"></i>
            </span>
            <span>
              123-456-789
            </span>
          </p>
          <p className="d-flex flew-wrap">
            <span className="mr-4 footer-icon">
              <i className="fa fa-envelope"></i>
            </span>
            <span>
              email@email.com
            </span>
          </p>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;