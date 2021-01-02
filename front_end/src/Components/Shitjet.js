import React from 'react'
import { withTranslation } from 'react-i18next';
import {
  Table
} from 'reactstrap';

const SalesComp = ({data, t}) => {
  let totalBuyPrice = 0.0;
  let totalSellPrice = 0.0;
  let totalProfit = 0.0;
  return (
    <Table>
    <thead>
      <tr>
        <th>{t('barCode')}</th>
        <th>{t('item')}</th>
        <th>{t('buyPrice')}</th>
        <th>{t('sellPrice')}</th>
        <th>{t('profit')}</th>
      </tr>
    </thead>
    <tbody>
      {data.length <= 0
        ? <tr/>
        : data.map((dat, index) => {
            totalBuyPrice += dat.buyPrice;
            totalSellPrice += dat.sellPrice;
            totalProfit += dat.sellPrice - dat.buyPrice
            return (
              <tr key={`${index} - ${dat.id}`}>
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
  )
}

export default withTranslation()(SalesComp)
