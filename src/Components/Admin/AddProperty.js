import React, { useState, useContext, useEffect } from "react";
import { baseUrl } from "../../Config";
import BicycleContext from "../../Context/BicycleContext";
import { CustomDialog, useDialog } from "react-st-modal";
const axios = require("axios");

const AddProperty = () => {
  const context = useContext(BicycleContext);

  const [property, setProperty] = useState({});

  const createPropertyHandler = (e) => {
    e.preventDefault();
    console.log(property);
    if (property.Name !== "" && property.bicycle_id !== "") {
      axios
        .post(baseUrl + "/item", {
          Name: property.Name,
          bicycle_id: property.bicycle_id,
        })
        .then(function (response) {
          setProperty({});
          const { id, Name, bicycle } = response.data.data;
          const newProperty = { id, Name, bicycle, options: [] };
          context.addPropertyHandler(newProperty);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const deleteBicycleHandler = (id) => {
    if (id !== undefined) {
      axios
        .delete(baseUrl + "/item/" + id)
        .then(function (response) {
          debugger;
          context.deletePropertyHandler(id);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const updatePropertyHandler = (obj) => {
    if (obj) {
      axios
        .put(baseUrl + "/item/" + obj.id, {
          Name: obj.name,
        })
        .then(function (response) {
          context.editBicycleHandler();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  function CustomDialogContent(props) {
    const dialog = useDialog();

    const [name, setName] = useState();
    const [id, setId] = useState();

    useEffect(() => {
      setName(props.name);
      setId(props.id);
    }, [props.name]);

    return (
      <div style={{ margin: "10px", overflowX: "hidden" }}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label className="bmd-label-floating">Propery Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name || ""}
              />
              <button
                className="btn btn-primary btn-raised"
                onClick={() => {
                  // Сlose the dialog and return the value
                  dialog.close({ name, id });
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={createPropertyHandler}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <select
                className="form-control custom_select"
                onChange={(e) =>
                  setProperty({ ...property, bicycle_id: e.target.value })
                }
                value={property.bicycle_id || ""}
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
          <div className="col-md-4">
            <div className="form-group">
              <label className="bmd-label-floating">Property Name</label>
              <input
                className="form-control"
                onChange={(e) =>
                  setProperty({ ...property, Name: e.target.value })
                }
                value={property.Name || ""}
              ></input>
            </div>
          </div>
          <div className="col-md-1">
            <div className="form-group">
              <button
                className="btn btn-primary btn-raised"
                disabled={!property.Name || !property.bicycle_id}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Property</th>
                  <th scope="col">Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  context.bicycleList.map((b) =>
                    b.items.map((i) => (
                      <tr key={i.id}>
                        <td>{b.name}</td>
                        <td>{i.Name}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-fab btn-sm btn-round"
                            type="button"
                            onClick={async () => {
                              const result = await CustomDialog(
                                <CustomDialogContent name={i.Name} id={i.id} />,
                                {
                                  title: "Update Property",
                                  showCloseIcon: true,
                                }
                              );
                              updatePropertyHandler(result);
                            }}
                          >
                            <i className="material-icons">mode</i>
                            <div className="ripple-container"></div>
                          </button>
                          <button
                            className="btn btn-primary btn-fab btn-sm btn-round"
                            onClick={() => deleteBicycleHandler(i.id)}
                          >
                            <i className="material-icons">delete</i>
                            <div className="ripple-container"></div>
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                  // propertyList.map((b) => (

                  // ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
