import React, { useEffect, useState } from "react";
import { baseUrl } from "../../Config";
const axios = require("axios");
const Orders = () => {
  const [list, setList] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + "/order")
      .then(function (response) {
        debugger;
        setList(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(baseUrl + "/option")
      .then(function (response) {
        debugger;
        setOptions(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getOptionById = (id) => options.find((o) => o.id == id);

  return (
    <div className="row">
      <div className="col-md-10">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Customer</th>
              <th scope="col">Model</th>
              <th scope="col">Customzations</th>
            </tr>
          </thead>
          <tbody>
            {list.map((o) => (
              <tr key={o.id}>
                <td>{o.customer}</td>
                <td>{o.customer}</td>
                <td>
                  {o.customizations.map((custom) => {
                    const selectOpt = getOptionById(custom.option_id);
                    return (
                      selectOpt &&
                      selectOpt.item && (
                        <div>
                          <b>{selectOpt.item.Name}: &nbsp;</b>
                          <label>{selectOpt.Name}</label>
                          <br />
                        </div>
                      )
                    );
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
