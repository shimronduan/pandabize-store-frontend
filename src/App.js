import { Route, Switch } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";
import AdminHome from "./Components/Admin/AdminHome";
import Website from "./Components/Website";
import BicycleContext from "./Context/BicycleContext";
import { baseUrl } from "./Config";

const axios = require("axios");

function App() {
  const [bicycleList, setBicycleList] = useState([]);
  const refeshBicycleContext = () => {
    axios
      .get(baseUrl + "/bicycle")
      .then(function (response) {
        setBicycleList(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    refeshBicycleContext();
  }, []);

  const addBicycleHandler = (obj) => {
    const tempList = [...bicycleList, obj];
    setBicycleList(tempList);
  };
  const editBicycleHandler = (obj) => {
    const tempList = [...bicycleList, obj];
    setBicycleList(tempList);
  };
  const deleteBicycleHandler = (id) => {
    const filteredList = bicycleList.filter((i) => i.id !== id);
    setBicycleList(filteredList);
  };
  const addPropertyHandler = (obj) => {
    const bicycle = bicycleList.find((i) => i.id === obj.bicycle.id);
    const { id, Name } = obj;
    const items = [...bicycle.items, { id, Name, options: [] }];
    bicycle.items = items;
    let tempList = bicycleList.map((el) =>
      el.id === obj.bicycle.id ? bicycle : el
    );
    setBicycleList(tempList);
  };
  const editPropertyHandler = (obj) => {};
  const deletePropertyHandler = (obj) => {
    debugger;
    let tempList = [...bicycleList];
    tempList.forEach(function (b) {
      b.items = b.items.filter((s) => s.id !== obj);
    });
    setBicycleList(tempList);
  };
  const addOptionHandler = (obj) => {
    refeshBicycleContext();
  };
  const editOptionHandler = (obj) => {};
  const deleteOptionHandler = (obj) => {
    refeshBicycleContext();
  };

  return (
    <BicycleContext.Provider
      value={{
        bicycleList,
        addBicycleHandler,
        editBicycleHandler,
        deleteBicycleHandler,
        addPropertyHandler,
        editPropertyHandler,
        deletePropertyHandler,
        addOptionHandler,
        editOptionHandler,
        deleteOptionHandler,
      }}
    >
      <div className="App">
        <Switch>
          <Route path="/admin" component={AdminHome} />
          <Route path="/" component={Website} />
        </Switch>
      </div>
    </BicycleContext.Provider>
  );
}

export default App;
