import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Table,
} from 'reactstrap';
import axios from 'axios';

import { salesData } from '../mock_data'
import Totals from './Totals'

class SalesComp extends Component {
  state = { data: salesData, isLoading: false }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const result = await axios.get('/api/sales').catch(err => {
      console.log('err', err)
      this.setState({ isLoading: false })
    })
    console.log('results', result.data)
    this.setState({ isLoading: false, data: result.data.data.filter((sale) => sale.category === this.props.category )})
  }

  render() {
    const { t, category } = this.props
    const text = category === 'large' ? t('big') : t('small')
    const data = this.state.data.filter((sale) => sale.category === this.props.category )

    let totalBuys = 0.0;
    let totalSales = 0.0;
    let totalProfit = 0.0;

    return this.state.isLoading ? <div>Loading...</div> :
      <div>
        <h3 id="shitjetShumice">{text}</h3>
        <Table>
          <thead>
            <tr>
              <th>{t('barCode')}</th>
              <th>{t('item')}</th>
              <th>{t('quantity')}</th>
              <th>{t('buyPrice')}</th>
              <th>{t('sellPrice')}</th>
              <th>{t('profit')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dat, index) => {
              totalBuys += dat.quantity * (dat.buyPrice);
              totalSales += dat.quantity * (dat.sellPrice);
              totalProfit += dat.quantity * (dat.sellPrice - dat.buyPrice);
              return (
                <tr key={`${index} - ${dat.saleId}`}>
                  <th scope="row">{dat.saleId}</th>
                  <td>{dat.name}</td>
                  <td>{dat.quantity}</td>
                  <td>{dat.buyPrice}</td>
                  <td>{dat.sellPrice}</td>
                  <td>{(dat.quantity * (dat.sellPrice - dat.buyPrice)).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <hr />
        <Totals
          totalBuys={totalBuys}
          totalSales={totalSales}
          totalProfit={totalProfit}
          t={t}
        />
      </div>
  }
}

export default withTranslation()(SalesComp)
