import React from "react";
import { Link } from "react-router-dom";
import AddBicycle from "./AddBicycle";
import AddOption from "./AddOption";
import AddProperty from "./AddProperty";
const AdminHome = () => {
  return (
    <div className="main main-raised">
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 ml-auto mr-auto">
              <h2 className="text-center title">Admin Section</h2>
              <Link to="/">
                <i class="fa fa-globe website_icon" aria-hidden="true">
                  {" "}
                  web
                </i>
              </Link>
              <div className="row">
                <div className="col-lg-12">
                  <ul
                    className="nav nav-pills nav-pills-icons"
                    role="tablist"
                    style={{ justifyContent: "center" }}
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#dashboard-1"
                        role="tab"
                        data-toggle="tab"
                      >
                        <i className="material-icons">pedal_bike</i>
                        Add Model
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#schedule-1"
                        role="tab"
                        data-toggle="tab"
                      >
                        <i className="material-icons">settings</i>
                        Properties
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#options-1"
                        role="tab"
                        data-toggle="tab"
                      >
                        <i className="material-icons">auto_awesome_motion</i>
                        Options
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#tasks-1"
                        role="tab"
                        data-toggle="tab"
                      >
                        <i className="material-icons">list</i>
                        Orders
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content tab-space">
                    <div className="tab-pane active" id="dashboard-1">
                      <AddBicycle />
                    </div>
                    <div className="tab-pane" id="schedule-1">
                      <AddProperty />
                    </div>
                    <div className="tab-pane" id="options-1">
                      <AddOption />
                    </div>
                    <div className="tab-pane" id="tasks-1">
                      test3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
