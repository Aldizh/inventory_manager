import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Table,
} from 'reactstrap';
import axios from 'axios';

import ButtonGroup from '../ButtonGroup'
import { formatPrice } from '../../utils/numbers';
import { inventoryData } from '../../mock_data';
import './styles.scss'

class SalesComp extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      totalCount: 0,
      isLoading: false,
      recordsPerPage: 10,
      currentPage: 1
    }

    this.handlePageClick = this.handlePageClick.bind(this)
    this.updateCurrentPage = this.updateCurrentPage.bind(this)
    this.handleCreateUpdate = this.handleCreateUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.getDataFromDb = this.getDataFromDb.bind(this)
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb(0)
  }
  
  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb(pageNumber = 0) {
    fetch(`/api/datas?pageNumber=${pageNumber}`)
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data, totalCount: res.totalCount }))
  }

  // Also refresh the data when updating page number
  updateCurrentPage(newPage){
    this.getDataFromDb(newPage - 1)
    this.setState({currentPage: newPage})
  }

  handlePageClick(event){
    const pageIndex = Number(event.target.id) - 1
    this.updateCurrentPage(pageIndex + 1)
  }

  handleCreateUpdate(){
    axios.post('/api/datas', inventoryData.map((item, idx) => ({
      ...item,
      id: this.state.totalCount + idx,
    }))).then((res) => {
      console.log('successfully created', res)
      this.getDataFromDb(0)
    }).catch((err) => console.log('bulk insert failed', err));
  }

  handleDelete(){
    axios.delete('/api/datas', inventoryData).then((res) => {
      console.log('successfully deleted', res)
      this.getDataFromDb(0)
    }).catch((err) => console.log('bulk delete failed', err));
  }

  render() {
    const { data, currentPage, totalCount, recordsPerPage } = this.state
    const { t } = this.props

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCount / recordsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="inventory">
        <h3 id="shitjetShumice">Current Inventory</h3>
        <Table dark>
          <thead>
            <tr>
              <th>{t('barCode')}</th>
              <th>{t('item')}</th>
              <th>{t('quantity')}</th>
              <th>{t('buyPrice')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dat, index) => {
              return (
                <tr key={`${index} - ${dat.id}`}>
                  <th>{dat.id}</th>
                  <td>{dat.name}</td>
                  <td>{dat.quantity}</td>
                  <td>{formatPrice(dat.buyPrice)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <ul id="page-numbers">
          {pageNumbers.map((number, i) => (
            <li
              key={number}
              id={number}
              onClick={this.handlePageClick}
              className={i + 1 === currentPage ? "highlight" : ""}
            >
              {number}
            </li>
          ))}
        </ul>
        <ButtonGroup
          updateHandler={this.handleCreateUpdate}
          deleteHandler={this.handleDelete}
          updateText={t('loadAll')}
          deleteText={t('deleteAll')}
        />
      </div>
    )
  }
}

export default withTranslation()(SalesComp)
