import React, { Component } from "react"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"
import { Table } from "reactstrap"
import axios from "axios"

import ButtonGroup from "../ButtonGroup"
import { formatPrice } from "../../utils/numbers"
import { inventoryData } from "../../mock_data"
import "./styles.scss"

class SalesComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      recordsPerPage: 10,
      currentPage: 1,
    }

    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleCreateUpdate = this.handleCreateUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.getCurrentPageData = this.getCurrentPageData.bind(this)
    this.updateCurrentPage = this.updateCurrentPage.bind(this)
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getCurrentPageData(0)
  }

  // our first get method that uses our backend api to
  // fetch data from our data base
  getCurrentPageData(pageNumber = 0) {
    axios.get(`/api/articles?pageNumber=${pageNumber}`)
      .then(({ data }) => {
        this.props.updatePageData(data.data)
      })
  }

  // Also refresh the data when updating page number
  updateCurrentPage(newPage) {
    this.getCurrentPageData(newPage - 1)
    this.setState({ currentPage: newPage })
  }

  handlePageClick(event) {
    const pageIndex = Number(event.target.id) - 1
    this.updateCurrentPage(pageIndex + 1)
  }

  handleCreateUpdate() {
    axios
      .post("/api/articles", inventoryData)
      .then((res) => {
        console.log("successfully inserted these records: ", res.data.data)
        this.props.refreshArticles() // ensures redux state is updated properly
        const totalCount = this.props.totalCount
        let pageNum = Math.ceil(totalCount / this.state.recordsPerPage)
        this.updateCurrentPage(pageNum || 1)
      })
      .catch((err) => console.log("bulk insert failed", err))
  }

  handleDelete() {
    axios
      .delete("/api/articles", {
        data: inventoryData,
      })
      .then((res) => {
        if (res.status === 200) console.log("successfully deleted test data")
        this.props.refreshArticles()
      })
      .catch((err) => console.log("bulk delete failed", err))
  }

  render() {
    const { currentPage, recordsPerPage } = this.state
    const { t, totalCount, pageData  } = this.props

    // Logic for displaying page numbers
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalCount / recordsPerPage); i++) {
      pageNumbers.push(i)
    }

    return (
      <div className="inventory">
        <h3 id="shitjetShumice">Current Inventory</h3>
        <Table dark responsive size="sm">
          <thead>
            <tr>
              <th>{t("barCode")}</th>
              <th>{t("item")}</th>
              <th>{t("quantity")}</th>
              <th>{t("buyPrice")}</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((dat, index) => {
              return (
                <tr key={`${index} - ${dat._id}`}>
                  <th>{dat._id}</th>
                  <td>{dat.name}</td>
                  <td>{dat.quantity}</td>
                  <td>{formatPrice(dat.buyPrice)}</td>
                </tr>
              )
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
          updateText={t("loadAll")}
          deleteText={t("deleteAll")}
        />
      </div>
    )
  }
}

// useful info from redux state
const mapStateToProps = (state) => {
  const { totalCount, pageData } = state
  return { totalCount, pageData }
}

const mapDispatchToProps = (dispatch) => ({
  updatePageData: (data) => dispatch({ type: "UPDATE_INVENTORY", data }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(SalesComp))
