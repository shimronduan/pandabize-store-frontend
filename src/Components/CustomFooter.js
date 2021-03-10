import React from "react";

const CustomFooter = () => {
  return (
    <footer className="footer footer-default">
      <div className="container">
        <nav className="float-left">
          <ul>
            <li>
              <a
                href="https://github.com/shimronduan/pandabize-store-api"
                target="_blank"
                rel="noreferrer"
              >
                Backend
              </a>
            </li>
            <li>
              <a
                href="https://github.com/shimronduan/pandabize-store-frontend"
                target="_blank"
                rel="noreferrer"
              >
                Frontend
              </a>
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
