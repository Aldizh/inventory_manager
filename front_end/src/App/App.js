// /client/App.js
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next'
import {
  Container,
  Row,
  Col,
  Input,
} from 'reactstrap';
import axios from 'axios';
import { findIndex, propEq } from 'ramda';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../i18n';
import Inventory from '../Components/Inventory';
import escapeHTML from '../utils/string';
import { inventoryData } from '../mock_data';
import './styles.scss';

class App extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    let defaultLang = 'en';
    const lang = localStorage.getItem('language');
    if (lang && lang.length) defaultLang = lang;

    // Set the state directly. Use props if necessary.
    this.state = {
      data: [],
      idToDelete: null,
      idToUpdate: null,
      language: defaultLang
    }
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb()
    const lang = localStorage.getItem('language');
    if (lang && lang.length) {
      this.props.i18n.changeLanguage(lang, (err) => {
        if (err) return console.log('something went wrong loading', err)
      })
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb() {
    fetch('/api/datas')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  }

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB(idTodelete) {
    const recordToDelete = { id: null };
    this.state.data.forEach((dat) => {
      if (dat.id === parseInt(idTodelete)) {
        recordToDelete.id = dat.id;
      }
    });
    axios
      .delete(`/api/datas/${idTodelete}`, {
        data: recordToDelete,
      })
      .then((response) => {
        if (response.status === 200) {
          const { data } = this.state;
          const deleteIndex = findIndex(propEq('id', recordToDelete.id))(data);
          if (deleteIndex === -1) {
            alert('No such records exist in our database');
          } else {
            data.splice(deleteIndex, 1);
            const updated = data(idTodelete, data.length);
            // TO DO: Bulk update to increment id for deleted records
            this.setState({ data });
          }
        }
      });
  }

  // our update method that uses our backend api
  // to overwrite existing data base information
  // TO DO: sanitize input
  updateDB(idToUpdate, name = '', qunatity, buyPrice) {
    let recordToUpdate = {};
    this.state.data.forEach((dat) => {
      if (dat.id === parseInt(idToUpdate)) {
        recordToUpdate = {
          id: dat.id,
          name: escapeHTML(name) || dat.name,
          quantity: qunatity || dat.quantity,
          buyPrice: buyPrice || dat.buyPrice,
        };
      }
    });

    axios.patch(`/api/datas/${idToUpdate}`, recordToUpdate).then((response) => {
      if (response.status === 200) {
        const newData = this.state.data;
        const updateIndex = findIndex(propEq('id', recordToUpdate.id))(newData);
        newData.splice(updateIndex, 1);
        newData.splice(updateIndex, 0, recordToUpdate);
        this.setState({ data: newData });
      }
    });
  }

  onLanguageHandle = (event) => {
    const newLang = event.target.value;
    this.setState({ language: newLang });
    localStorage.setItem('language', newLang);
    this.props.i18n.changeLanguage(newLang, (err) => {
      if (err) return console.log('something went wrong loading', err);
    });
  }

  renderRadioButtons = () => (
    <div style={{ marginLeft: 15 }}>
      <input
        checked={this.state.language === 'en'}
        name="language"
        onChange={(e) => this.onLanguageHandle(e)}
        value="en"
        type="radio"
      />
      English &nbsp;
      <input
        name="language"
        value="al"
        checked={this.state.language === 'al'}
        type="radio"
        onChange={(e) => this.onLanguageHandle(e)}
      />
      Albanian
    </div>
  )

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB(name, quantity, buyPrice, category) {
    const currentIds = this.state.data.map((data) => data.id);
    const id = currentIds.length;
    const newRecord = {
      id,
      name,
      quantity,
      buyPrice,
      category,
    };
    axios.post('/api/datas', newRecord).then((response) => {
      if (response.status === 200) {
        const newData = this.state.data;
        newData.push(newRecord);
        this.setState({ data: newData });
      }
    });
  }

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { t } = this.props;
    const { data } = this.state;
    const {
      name, quantity, buyPrice
    } = this.state;

    return (
      <div>
        <div style={{ textAlign: 'center', margin: 'auto', width: '50%' }}>
          {this.renderRadioButtons()}
        </div>
        <Container>
          <Row>
            <Col lg="12">
              <div className="centeredRight">
                <Inventory syncData={() => this.getDataFromDb()} data={this.state.data} />
                <hr />
                <h3>{t('dataCorrection')}</h3>
                <Input
                  id="fshi"
                  type="number"
                  name="fshi"
                  placeholder={t('barCode')}
                  value={this.state.idToDelete || ''}
                  onChange={(e) => this.setState({ idToDelete: e.target.value })}
                />
                <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>{t('delete')}</button>
                <div className="inputDiv">
                  <Input
                    type="text"
                    placeholder={t('barCode')}
                    value={this.state.idToUpdate || ''}
                    onChange={(e) => this.setState({ idToUpdate: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder={t('nameNew')}
                    value={name || ''}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder={t('quantityNew')}
                    value={quantity || ''}
                    onChange={(e) => this.setState({ quantity: parseFloat(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder={t('buyPriceNew')}
                    value={buyPrice || ''}
                    onChange={(e) => this.setState({ buyPrice: parseFloat(e.target.value) })}
                  />
                </div>
                <button onClick={() => this.updateDB(this.state.idToUpdate, this.state.name, this.state.quantity, this.state.buyPrice)}>
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
    );
  }
}

export default withTranslation()(App);
