// /client/App.js
import React, { Component } from "react"
import { withTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Input,
} from 'reactstrap'
import axios from "axios"
import { findIndex, propEq } from "ramda"
import '../i18n';
import Shitjet from "../Components/Shitjet"
import escapeHTML from "../utils/string"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css"
class App extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      id: 0,
      data: [],
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
      language: 'en'
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
  }

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
  }

  // our update method that uses our backend api
  // to overwrite existing data base information
  // TO DO: sanitize input
  updateDB(idToUpdate, name = '', qunatity, buyPrice, sellPrice) {
    let recordToUpdate = {};
    this.state.data.forEach(dat => {
      if (dat.id === parseInt(idToUpdate)) {
        recordToUpdate = {
          id: dat.id,
          name: escapeHTML(name) || dat.name,
          quantity: qunatity || dat.quantity,
          buyPrice: buyPrice || dat.buyPrice,
          sellPrice: sellPrice || dat.sellPrice
        }
      }
    });

    axios.patch(`/api/datas/${idToUpdate}`, recordToUpdate).then(response => {
      if (response.status === 200) {
        let newData = this.state.data;
        const updateIndex = findIndex(propEq("id", recordToUpdate.id))(newData);
        newData.splice(updateIndex, 1);
        newData.splice(updateIndex, 0, recordToUpdate);
        this.setState({ data: newData });
      }
    });
  }

  onLanguageHandle = (event) => {
    let newLang = event.target.value;
    this.setState({ language: newLang })
    this.props.i18n.changeLanguage(newLang)
  }

  renderRadioButtons = () => {
    return (
      <div style={{ marginLeft: 15 }}>
        <input
          checked={this.state.language === 'en'}
          name="language"
          onChange={(e) => this.onLanguageHandle(e)}
          value="en"
          type="radio" />English &nbsp;
        <input
          name="language"
          value="al"
          checked={this.state.language === 'al'}
          type="radio"
          onChange={(e) => this.onLanguageHandle(e)}
      />Albanian
      </div>
    )
  }

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { t } = this.props
    const { data } = this.state;

    return (
      <div>
        {this.renderRadioButtons()}
        <Container>
          <Row>
            <Col lg="12">
              <div className="centeredRight">
                <h3>{t('sales')}</h3>
                <Shitjet data={this.state.data} />
                <hr />
                <h3>{t('dataCorrection')}</h3>
                <Input
                  id="fshi"
                  type="number"
                  name="fshi"
                  placeholder={t('barCode')}
                  value={this.state.idToDelete || ''}
                  onChange={e => this.setState({ idToDelete: e.target.value })}
                />
                <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>{t('delete')}</button>
                <div className="inputDiv">
                  <Input
                    type="text"
                    placeholder={t('barCode')}
                    value={this.state.idToUpdate || ''}
                    onChange={e => this.setState({ idToUpdate: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder={t('nameNew')}
                    value={this.state.name || ''}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder={t('quantityNew')}
                    value={this.state.quantity || ''}
                    onChange={e => this.setState({ quantity: parseFloat(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder={t('buyPriceNew')}
                    value={this.state.buyPrice || ''}
                    onChange={e => this.setState({ buyPrice: parseFloat(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder={t('sellPriceNew')}
                    value={this.state.sellPrice || ''}
                    onChange={e => this.setState({ sellPrice: parseFloat(e.target.value) })}
                  />
                </div>
                <button onClick={() => this.updateDB(this.state.idToUpdate, this.state.name, this.state.quantity, this.state.buyPrice, this.state.sellPrice)}>
                  {t('correct')}
                </button>
                {/* <div className="inputDiv">
                  <a href={"/geo_data"}>Geo Location Lookup</a>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withTranslation()(App);
