// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import { findIndex, propEq } from "ramda";
import escapeHTML from "../utils/string";
import "./styles.css";
class App extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      id: 0,
      data: [],
      name: null,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
    }
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb() {
    fetch("/api/datas")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB(name) {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    const newRecord = {
      id: idToBeAdded,
      name: name
    };
    axios.post("/api/datas", newRecord).then(response => {
      if (response.status === 200) {
        const newData = this.state.data;
        newData.push(newRecord);
        this.setState({ data: newData });
      }
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB(idTodelete) {
    const recordToDelete = { id: null };
    this.state.data.forEach(dat => {
      if (dat.id === parseInt(idTodelete)) {
        recordToDelete.id = dat.id;
      }
    });
    axios
      .delete(`/api/datas/${idTodelete}`, {
        data: recordToDelete
      })
      .then(response => {
        if (response.status === 200) {
          let newData = this.state.data;
          const deleteIndex = findIndex(propEq("id", recordToDelete.id))(newData);
          if (deleteIndex === -1) {
            alert("No such records exist in our database");
          } else {
            newData.splice(deleteIndex, 1);
            this.setState({ data: newData });
          }
        }
      });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  // TO DO: sanitize input
  updateDB(idToUpdate, name) {
    const recordToUpdate = { id: null };
    this.state.data.forEach(dat => {
      if (dat.id === parseInt(idToUpdate)) {
        recordToUpdate.id = dat.id;
        recordToUpdate.name = escapeHTML(name);
      }
    });

    axios.post(`/api/datas/${idToUpdate}`, recordToUpdate).then(response => {
      if (response.status === 200) {
        let newData = this.state.data;
        const updateIndex = findIndex(propEq("id", recordToUpdate.id))(newData);
        newData.splice(updateIndex, 1);
        newData.splice(updateIndex, 0, recordToUpdate);
        this.setState({ data: newData });
      }
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div>
        <div class="split left">
          <ul class="centered">
            {data.length <= 0
              ? "NO DB ENTRIES YET"
              : data.map(dat => (
                  <li style={{ padding: "10px" }} key={data.name}>
                    <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                    <span style={{ color: "gray" }}> data: </span>
                    {dat.name}
                  </li>
                ))}
          </ul>
        </div>

        <div class="split right">
          <a href={"/dashboard"} onClick={this.props.handleLogout}>
            Logout
          </a>
          <div class="centered">
            <h3>Database CRUD</h3>
            <div class="inputDiv">
              <input
                type="text"
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="add something in the database"
              />
              <button onClick={() => this.putDataToDB(this.state.name)}>ADD</button>
            </div>
            <div class="inputDiv">
              <input
                type="text"
                onChange={e => this.setState({ idToDelete: e.target.value })}
                placeholder="put id of item to delete here"
              />
              <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>DELETE</button>
            </div>
            <div class="inputDiv">
              <input
                type="text"
                onChange={e => this.setState({ idToUpdate: e.target.value })}
                placeholder="id of item to update here"
              />
              <input
                type="text"
                onChange={e => this.setState({ updateToApply: e.target.value })}
                placeholder="put new value of the item here"
              />
              <button onClick={() => this.updateDB(this.state.idToUpdate, this.state.updateToApply)}>UPDATE</button>
            </div>
            <div class="inputDiv">
              <a href={"/geo_data"}>Geo Location Lookup</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
