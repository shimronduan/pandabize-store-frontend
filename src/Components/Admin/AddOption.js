import React, { useState, useEffect, useContext } from "react";
import { baseUrl } from "../../Config";
import BicycleContext from "../../Context/BicycleContext";
import { CustomDialog, useDialog } from "react-st-modal";
const axios = require("axios");

const AddOption = () => {
  const context = useContext(BicycleContext);

  const [itemOption, setItemOption] = useState({});
  const [propertyList, setPropertyList] = useState([]);

  const createOptionHandler = (e) => {
    e.preventDefault();
    console.log(itemOption);
    if (
      itemOption.Name !== "" &&
      itemOption.bicycle_id !== "" &&
      itemOption.item_id !== ""
    ) {
      debugger;
      axios
        .post(baseUrl + "/option", {
          Name: itemOption.Name,
          item_id: itemOption.item_id,
        })
        .then(function (response) {
          const { id, Name } = response.data.data;
          const newOption = {
            id,
            Name,
            bicycle_id: itemOption.bicycle_id,
            item_id: itemOption.item_id,
          };
          context.addOptionHandler(newOption);
          setItemOption({});
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const deleteOptionHandler = (id) => {
    if (id !== undefined) {
      axios
        .delete(baseUrl + "/option/" + id)
        .then(function (response) {
          context.deleteOptionHandler(id);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const bicycleChangeHandler = (e) => {
    const id = e.target.value;
    if (id !== "") {
      setItemOption({ ...itemOption, bicycle_id: id });
      const selectBicycle = context.bicycleList.find((i) => i.id == id);
      setPropertyList(selectBicycle.items);
    } else {
      setItemOption({ ...itemOption, bicycle_id: "" });
    }
  };
  const updateOptionHandler = (obj) => {
    if (obj) {
      axios
        .put(baseUrl + "/option/" + obj.id, {
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
      <form onSubmit={createOptionHandler}>
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <select
                className="form-control custom_select"
                onChange={bicycleChangeHandler}
                value={itemOption.bicycle_id || ""}
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
          {itemOption.bicycle_id !== "" && itemOption.bicycle_id !== undefined && (
            <div className="col-md-3">
              <div className="form-group">
                <select
                  className="form-control custom_select"
                  onChange={(e) =>
                    setItemOption({ ...itemOption, item_id: e.target.value })
                  }
                  value={itemOption.item_id || ""}
                  disabled={
                    itemOption.bicycle_id === "" ||
                    itemOption.bicycle_id === undefined
                  }
                >
                  <option value="">Choose your Property</option>
                  {propertyList.map((i) => (
                    <option value={i.id} key={i.id}>
                      {i.Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="col-md-4">
            <div className="form-group">
              <label className="bmd-label-floating">Option Name</label>
              <input
                className="form-control"
                onChange={(e) =>
                  setItemOption({ ...itemOption, Name: e.target.value })
                }
                value={itemOption.Name || ""}
              ></input>
            </div>
          </div>
          <div className="col-md-1">
            <div className="form-group">
              <button
                className="btn btn-primary btn-raised"
                disabled={
                  !itemOption.bicycle_id ||
                  !itemOption.item_id ||
                  !itemOption.Name
                }
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
                  <th scope="col">Model Names</th>
                  <th scope="col">Property</th>
                  <th scope="col">Option</th>
                  <th scope="col">Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {context.bicycleList.map((b) =>
                  b.items.map((i) =>
                    i.options.map((o) => (
                      <tr key={o.id}>
                        <td>{b.name}</td>
                        <td>{i.Name}</td>
                        <td>{o.Name}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-fab btn-sm btn-round"
                            onClick={async () => {
                              const result = await CustomDialog(
                                <CustomDialogContent name={o.Name} id={o.id} />,
                                {
                                  title: "Update Property",
                                  showCloseIcon: true,
                                }
                              );
                              updateOptionHandler(result);
                            }}
                          >
                            <i className="material-icons">mode</i>
                            <div className="ripple-container"></div>
                          </button>
                          <button
                            className="btn btn-primary btn-fab btn-sm btn-round"
                            onClick={() => deleteOptionHandler(o.id)}
                          >
                            <i className="material-icons">delete</i>
                            <div className="ripple-container"></div>
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOption;
