import React from "react";

const CustomFooter = () => {
  return (
    <footer className="footer footer-default">
      <div className="container">
        <nav className="float-left">
          <ul>
            <li>
              <a href="https://www.creative-tim.com/">Creative Tim</a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/presentation">About Us</a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/blog">Blog</a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/license">Licenses</a>
            </li>
          </ul>
        </nav>
        <div className="copyright float-right">
          &copy;
          <script>document.write(new Date().getFullYear())</script>, made with{" "}
          <i className="material-icons">favorite</i> by
          <span href="https://www.creative-tim.com/" target="_blank">
            Creative Tim
          </span>{" "}
          for a better web.
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
