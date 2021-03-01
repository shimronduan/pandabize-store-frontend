import React, { Component } from "react";
import CustomFooter from "./CustomFooter";
import Navbar from "./Navbar";
import Banner from "./Banner";
import CustomizeSection from "./CustomizeSection";

class Website extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Banner />
        <CustomizeSection />
        <CustomFooter />
      </div>
    );
  }
}

export default Website;
