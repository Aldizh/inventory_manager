// /client/App.js
import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
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
      name: '',
      buyPrice: 0.0,
      sellPrice: 0.0,
      profit: 0.0,
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
  putDataToDB(name, buyPrice, sellPrice) {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    const newRecord = {
      id: idToBeAdded,
      name: name,
      buyPrice: buyPrice,
      sellPrice: sellPrice,
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
    let totalBuyPrice = 0.0;
    let totalSellPrice = 0.0;
    let totalProfit = 0.0;
    return (
      <div>
        <div class="split left">
          <div class="centered">
            <h3>Shkruaj te dhenat e artikullit dhe shto ne table</h3>
            <div class="inputDivForm">
              <Form>
                <FormGroup>
                  <Label for="name">Emri i artikullit</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Oriz"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="buy_price">Cmimi i blerjes</Label>
                  <Input
                    id="buy_price"
                    type="number"
                    name="buy_price"
                    placeholder="120.5"
                    onChange={e => this.setState({ buyPrice: parseFloat(e.target.value) })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="sell_price">Cmimi i shitjes</Label>
                  <Input
                    type="number"
                    name="sell_price"
                    id="sell_price"
                    placeholder="122"
                    onChange={e => this.setState({ sellPrice: parseFloat(e.target.value) })}
                  />
                </FormGroup>
                <Button onClick={() => this.putDataToDB(this.state.name, this.state.buyPrice, this.state.sellPrice)}>SHTO NE TABELE</Button>
              </Form>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Emri i artikullit</th>
                  <th>Cmimi i blerjes</th>
                  <th>Cmimi i shitjes</th>
                  <th>Fitimi (Leke te reja)</th>
                </tr>
              </thead>
              <tbody>
                {data.length <= 0
                  ? <tr/>
                  : data.map(dat => {
                      totalBuyPrice += dat.buyPrice;
                      totalSellPrice += dat.sellPrice;
                      totalProfit += dat.sellPrice - dat.buyPrice
                      return (
                        <tr>
                          <th scope="row">{dat.id}</th>
                          <td>{dat.name}</td>
                          <td>{dat.buyPrice}</td>
                          <td>{dat.sellPrice}</td>
                          <td>{(dat.sellPrice - dat.buyPrice).toFixed(2)}</td>
                        </tr>
                      )
                    })
                }
              </tbody>
            </Table>
            <div class="inputDiv">
              <span>Blerja: {totalBuyPrice.toFixed(2)} leke te reja</span>
              <span>Shitja: {totalSellPrice.toFixed(2)} leke te reja</span>
              <span>Fitimi: {totalProfit.toFixed(2)} leke te reja</span>
            </div>
          </div>
        </div>

        <div class="split right">
          <a href={"/dashboard"} onClick={this.props.handleLogout}>
            Dil
          </a>
          <div class="centered">
            <h3>Fshirje/Korrigjim te dhenash</h3>
            <input
              type="number"
              onChange={e => this.setState({ idToDelete: e.target.value })}
              placeholder="Fut numrin ID"
            />
            <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>Fshi nga tabela</button>
            {/* <div class="inputDiv">
              <input
                type="text"
                onChange={e => this.setState({ idToUpdate: e.target.value })}
                placeholder="Fut numrin ID"
              />
              <input
                type="text"
                onChange={e => this.setState({ updateToApply: e.target.value })}
                placeholder="Fut vleren e re"
              />
              <button onClick={() => this.updateDB(this.state.idToUpdate, this.state.updateToApply)}>UPDATE</button>
            </div>
            <div class="inputDiv">
              <a href={"/geo_data"}>Geo Location Lookup</a>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
