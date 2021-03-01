import React from "react";

const Banner = () => {
  return (
    <div
      className="page-header header-filter"
      data-parallax="true"
      style={{ backgroundImage: "url('./assets/img/cyclist.jpg')" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="title"> Design Your Own Bicycle.</h1>
            <h4>
              We customize your bicycle the way you want. So that you ride a
              piece of art.
            </h4>
            <br />

            <a
              href="https://www.youtube.com/watch?v=VVAsbuLg_QQ&ab_channel=GeeMilner"
              target="_blank"
              className="btn btn-danger btn-raised btn-lg"
              rel="noreferrer"
            >
              <i className="fa fa-play"></i> Watch video
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
