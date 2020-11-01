import React from 'react'
import {
  Table
} from 'reactstrap';

const SalesComp = ({data}) => {
  let totalBuyPrice = 0.0;
  let totalSellPrice = 0.0;
  let totalProfit = 0.0;
  return (
    <Table>
    <thead>
      <tr>
        <th>Bar Kodi</th>
        <th>Emri i artikullit</th>
        <th>Cmimi i blerjes</th>
        <th>Cmimi i shitjes</th>
        <th>Fitimi (Leke te reja)</th>
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

export default SalesComp