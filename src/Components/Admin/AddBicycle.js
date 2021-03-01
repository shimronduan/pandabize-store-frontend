import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { baseUrl } from "../../Config";
import BicycleContext from "../../Context/BicycleContext";
const axios = require("axios");

const AddBicycle = () => {
  const context = useContext(BicycleContext);
  const [modelName, setName] = useState("");

  const createBicycleHandler = (e) => {
    e.preventDefault();
    if (modelName.trim().length > 0) {
      axios
        .post(baseUrl + "/bicycle", {
          name: modelName,
        })
        .then(function (response) {
          setName("");
          const { id, name } = response.data.data;
          const newBike = { id, name, items: [] };
          context.addBicycleHandler(newBike);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const updateBicycleHandler = (e) => {
    e.preventDefault();
    if (modelName.trim().length > 0) {
      axios
        .post(baseUrl + "/bicycle", {
          name: modelName,
        })
        .then(function (response) {
          setName("");
          const { id, name } = response.data.data;
          const newBike = { id, name, items: [] };
          context.editBicycleHandler(newBike);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const deleteBicycleHandler = (id) => {
    if (id !== undefined) {
      axios
        .delete(baseUrl + "/bicycle/" + id)
        .then(function (response) {
          context.deleteBicycleHandler(id);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={createBicycleHandler}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="bmd-label-floating">Model Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={modelName || ""}
              ></input>
            </div>
          </div>
          <div className="col-md-1">
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-raised"
                disabled={!modelName}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-md-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {context.bicycleList.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>
                    <button className="btn btn-primary btn-fab btn-sm btn-round">
                      <i className="material-icons">mode</i>
                      <div className="ripple-container"></div>
                    </button>
                    <button
                      className="btn btn-primary btn-fab btn-sm btn-round"
                      onClick={() => deleteBicycleHandler(b.id)}
                    >
                      <i className="material-icons">delete</i>
                      <div className="ripple-container"></div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* {showEditSection && (
          <div className="col-md-5">
            <h4>Edit</h4>
            <form onSubmit={updateBicycleHandler}>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="bmd-label-floating">Model Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      value={modelName || ""}
                    ></input>
                  </div>
                </div>
                <div className="col-md-1">
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-success btn-fab btn-sm btn-round btn-raised"
                    >
                      <i className="material-icons">save</i>
                      <div className="ripple-container"></div>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-default btn-fab btn-sm btn-round btn-raised"
                    >
                      <i className="material-icons">cancel</i>
                      <div className="ripple-container"></div>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AddBicycle;
