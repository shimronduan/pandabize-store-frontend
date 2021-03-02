import React from "react";

const CustomFooter = () => {
  return (
    <footer className="footer footer-default">
      <div className="container">
        <nav className="float-left">
          <ul>
            <li>
              <a href="/">Careers</a>
            </li>
            <li>
              <a href="/">About Us</a>
            </li>
            <li>
              <a href="/">Blog</a>
            </li>
          </ul>
        </nav>
        <div className="copyright float-right">
          <i className="material-icons">favorite</i>{" "}
          <span href="https://www.creative-tim.com/" target="_blank">
            Shimron Duan
          </span>{" "}
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
