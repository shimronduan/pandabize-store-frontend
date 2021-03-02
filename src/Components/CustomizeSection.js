import React, { useState, useContext } from "react";
import { baseUrl } from "../Config";
import BicycleContext from "../Context/BicycleContext";
import { Alert } from "react-st-modal";
const axios = require("axios");
let options = [];

const CustomizeSection = () => {
  const context = useContext(BicycleContext);
  const [order, setOrder] = useState({});

  // const [options, setOptions] = useState([]);

  const [propertySection, setPropertySection] = useState([]);
  const optionChangeHandler = (option_id, item_id) => {
    const tempOptions = options.filter((o) => o.item_id != item_id);
    tempOptions.push({ option_id, item_id });
    options = tempOptions;
    debugger;
  };

  const bicycleChangeHandler = (e) => {
    // setOptions([]);
    options = [];
    const id = e.target.value;
    if (id !== "") {
      setOrder({ ...order, bicycle_id: id });
      const selectBicycle = context.bicycleList.find((i) => i.id == id);
      // debugger;
      let propertySectionTemp = selectBicycle.items.map((i) => (
        <div className="col-md-4" key={i.id}>
          <div className="form-group">
            <select
              className="form-control custom_select"
              onChange={(e) => optionChangeHandler(e.target.value, i.id)}
            >
              <option>Default {i.Name}</option>
              {i.options.map((o) => (
                <option value={o.id} key={o.id}>
                  {i.Name + " - " + o.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
      ));
      setPropertySection(propertySectionTemp);
    } else {
      setPropertySection([]);
      setOrder({ ...order, bicycle_id: "" });
    }
  };

  const placeOrder = (e) => {
    e.preventDefault();

    let tempOption = [];
    options.forEach((o) => {
      tempOption.push(o.option_id);
    });
    debugger;
    axios
      .post(baseUrl + "/order", {
        customer: order.customer,
        options: tempOption,
        bicycle_id: order.bicycle_id,
      })
      .then(async function (response) {
        debugger;
        options = [];
        setPropertySection([]);
        setOrder({});
        await Alert("Order placed successfully.", "Congratz..");
      })
      .catch(function (error) {
        debugger;
        console.log(error);
      });
    console.log(options);
  };

  return (
    <div className="main main-raised">
      <div className="container">
        <div className="section section-contacts">
          <div className="row">
            <div className="col-md-8 ml-auto mr-auto">
              <h2 className="text-center title">Let's start Customizing</h2>
              <h4 className="text-center description">
                Customize your bicycle. The price will depend on the
                Customization. Not all models of bicycle have similar options
                for customization
              </h4>
              <form className="contact-form" onSubmit={placeOrder}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Your Name</label>
                      <input
                        className="form-control"
                        onChange={(e) =>
                          setOrder({ ...order, customer: e.target.value })
                        }
                        value={order.customer || ""}
                      ></input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        className="form-control custom_select"
                        onChange={bicycleChangeHandler}
                        value={order.bicycle_id || ""}
                      >
                        <option value="">Choose your Bicycle</option>
                        {context.bicycleList.map((i) => (
                          <option value={i.id} key={i.id}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {propertySection}
                </div>
                <div className="row">
                  <div className="col-md-4 ml-auto mr-auto text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-raised"
                      disabled={!order.customer || !order.bicycle_id}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeSection;
