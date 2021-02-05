import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Table,
} from 'reactstrap';
import axios from 'axios';

import ButtonGroup from '../ButtonGroup'
import { generateId, formatPrice } from '../../utils/numbers';
import { inventoryData } from '../../mock_data';
import './styles.scss'

class SalesComp extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: false,
      currentPage: 1,
      recordsPerPage: 10
    }

    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleCreateUpdate = this.handleCreateUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handlePageClick(event){
    this.setState({ currentPage: Number(event.target.id) })
  }

  handleCreateUpdate(){
    axios.post('/api/datas', inventoryData.map((item, idx) => ({
      ...item,
      id: generateId(this.props.data) + idx,
    }))).then((res) => {
      console.log('successfully created', res)
      this.props.getData()
    }).catch((err) => console.log('bulk insert failed', err));
  }

  handleDelete(){
    axios.delete('/api/datas', inventoryData).then((res) => {
      console.log('successfully deleted', res)
      this.props.getData()
      this.setState({currentPage: 1})
    }).catch((err) => console.log('bulk delete failed', err));
  }

  render() {
    const { t, data } = this.props

    const { currentPage, recordsPerPage } = this.state

    // Logic for displaying current todos
    const lastRecordIndex = currentPage * recordsPerPage;
    const indexOfFirstTodo = lastRecordIndex - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstTodo, lastRecordIndex);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / recordsPerPage); i++) {
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
            {currentRecords.map((dat, index) => {
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
          {pageNumbers.map(number => (
            <li
              key={number}
              id={number}
              onClick={this.handlePageClick}
            >
              {number}
            </li>
          ))}
        </ul>
        <hr />
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
