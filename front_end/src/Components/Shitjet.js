import React from 'react'
import { withTranslation } from 'react-i18next';
import {
  Table
} from 'reactstrap';

const SalesComp = ({data, t}) => {
  let totalBuys = 0.0;
  let totalSales = 0.0;
  let totalProfit = 0.0;
  return (
    <div>
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
        {data.length <= 0
          ? <tr/>
          : data.map((dat, index) => {
              totalBuys += dat.quantity * (dat.buyPrice)
              totalSales += dat.quantity * (dat.sellPrice)
              totalProfit += dat.quantity * (dat.sellPrice - dat.buyPrice)
              return (
                <tr key={`${index} - ${dat.id}`}>
                  <th scope="row">{dat.id}</th>
                  <td>{dat.name}</td>
                  <td>{dat.quantity}</td>
                  <td>{dat.buyPrice}</td>
                  <td>{dat.sellPrice}</td>
                  <td>{dat.quantity * (dat.sellPrice - dat.buyPrice).toFixed(2)}</td>
                </tr>
              )
            })
        }
      </tbody>
    </Table>
    <hr />
    <h3>{t('totals')}</h3>
    <div className="inputDiv">
      <span>{t('totalBuys')}: {totalBuys.toFixed(2)}</span>
      <span>{t('totalSales')}: {totalSales.toFixed(2)}</span>
      <span>{t('totalProfit')}: {totalProfit.toFixed(2)}</span>
    </div>
  </div>
  )
}

export default withTranslation()(SalesComp)
