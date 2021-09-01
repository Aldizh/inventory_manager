import React, { Component } from "react"
import { withTranslation } from "react-i18next"
import { Table } from "reactstrap"
import axios from "axios"

import { langToCurrMap } from "../utils/string"
import { salesData } from "../mock_data"
import Totals from "./Totals"
class SalesComp extends Component {
  state = { data: salesData, isLoading: false, conversionRate: 1 }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const salesPromise = axios.get("/api/sales")
    const currencyPromise = axios(
      `https://api.exchangerate.host/latest/?base=USD&amount=1&symbols=USD,ALL`,
    )
    return Promise.all([salesPromise, currencyPromise])
      .then(res => {
        const [{ data: salesData }, { data: currencyData }] = res
        this.setState({
          isLoading: false,
          conversionRate: currencyData.rates[langToCurrMap()],
          data: salesData.data.filter(
            sale => sale.category === this.props.category,
          ),
        })
      })
      .catch(err => {
        console.log("err", err)
        this.setState({ isLoading: false })
      })
  }

  handleClick(id) {
    window.location = `/sales/${id}`
  }

  render() {
    const { conversionRate, isLoading } = this.state
    const { t, category } = this.props
    const data = this.state.data.filter(sale => sale.category === category)

    let totalBuys = 0.0
    let totalSales = 0.0
    let totalProfit = 0.0

    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <Table dark>
          <thead>
            <tr>
              <th>{t("barCode")}</th>
              <th>{t("item")}</th>
              <th>{t("quantity")}</th>
              <th>{t("buyPrice")}</th>
              <th>{t("sellPrice")}</th>
              <th>{t("profit")}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((dat, index) => {
              totalBuys += dat.quantity * dat.buyPrice
              totalSales += dat.quantity * dat.sellPrice
              totalProfit += dat.quantity * (dat.sellPrice - dat.buyPrice)
              return (
                <tr key={`${index} - ${dat.saleId}`}>
                  <th scope="row">{dat.saleId}</th>
                  <td>{dat.name}</td>
                  <td>{dat.quantity}</td>
                  <td>{(dat.buyPrice * conversionRate).toFixed(2)}</td>
                  <td>{(dat.sellPrice * conversionRate).toFixed(2)}</td>
                  <td>
                    {(
                      dat.quantity *
                      conversionRate *
                      (dat.sellPrice - dat.buyPrice)
                    ).toFixed(2)}
                  </td>
                  <td>
                    <button onClick={() => this.handleClick(dat.saleId)}>
                      {t("edit")}
                    </button>
                  </td>
                </tr>
              )
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
    )
  }
}

export default withTranslation()(SalesComp)
