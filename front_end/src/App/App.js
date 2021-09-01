// /client/App.js
import React, { Component } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"
import { Container, Row, Col, Input } from "reactstrap"
import axios from "axios"
import { findIndex, isNil, propEq } from "ramda"
import "bootstrap/dist/css/bootstrap.min.css"
import "../i18n"
import Inventory from "../Components/Inventory/"
import ButtonGroup from "../Components/ButtonGroup"
import { escapeHTML } from "../utils/string"
import "./styles.scss"

class App extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props)

    let defaultLang = "en"
    const lang = localStorage.getItem("language")
    if (lang && lang.length) defaultLang = lang

    // Set the state directly. Use props if necessary.
    this.state = {
      data: [],
      item: {},
      id: 0,
      editMode: false,
      language: defaultLang,
    }
    this.updateDB = this.updateDB.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.deleteFromDB = this.deleteFromDB.bind(this)
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    const lang = localStorage.getItem("language")
    if (lang && lang.length) {
      this.props.i18n.changeLanguage(lang, err => {
        if (err) return console.log("something went wrong loading", err)
      })
    }
    this.refreshData()
  }

  // our first get method that uses our backend api to
  // fetch data from our data base
  refreshData() {
    fetch(`/api/articles`)
      .then(data => data.json())
      .then(res => {
        this.props.updatePageData(res.data)
        this.props.updateTotalCount(res.totalCount)
        this.setState({ data: res.data })
      })
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our delete method that uses our backend api
  // to remove existing database information
  async deleteFromDB() {
    const idToDelete = this.state.item.id
    const { data: record } = await axios.get(`/api/articles/${idToDelete}`)
    const { data: allArticles } = await axios.get(`/api/articles/all`)
    const deleteRes = await axios.delete(`/api/articles/${idToDelete}`, {
      data: record.data,
    })
    if (deleteRes.status === 200) {
      const deleteIndex = findIndex(propEq("id", record.data.id))(
        allArticles.data,
      )
      if (deleteIndex === -1) {
        alert("No such records exist in our database")
      } else {
        this.refreshData()
      }
    }
  }

  // our update method that uses our backend api
  // to overwrite existing data base information
  // TO DO: sanitize input
  async updateDB() {
    let recordToUpdate = {}
    const { item, editMode } = this.state
    const { id: idToUpdate, name = "", quantity, buyPrice } = item
    const { data } = await axios.get(`/api/articles/${idToUpdate}`)
    const existingDat = data.data

    if (editMode) {
      recordToUpdate = {
        ...existingDat,
        name: escapeHTML(name) || existingDat.name,
        quantity: quantity || existingDat.quantity,
        buyPrice: buyPrice || existingDat.buyPrice,
      }

      console.log("recordToUpdate", recordToUpdate)

      axios
        .put(`/api/articles/${idToUpdate}`, recordToUpdate)
        .then(response => {
          if (response.status === 200) this.refreshData()
        })
    } else this.putDataToDB() // create new item
  }

  onIdUpdate = e => {
    let id = e.target.value
    this.setState({ id: e.target.value, editMode: false })

    if (isNil(id) || id === "") {
      this.setState({ item: {} })
      return
    }
    fetch(`/api/articles/${id}`)
      .then(data => data.json())
      .then(res => {
        if (res.data) this.setState({ item: res.data, editMode: true })
        else this.setState({ item: {}, editMode: false })
      })
  }

  onLanguageHandle = event => {
    const newLang = event.target.value
    this.setState({ language: newLang })
    localStorage.setItem("language", newLang)
    this.props.i18n.changeLanguage(newLang, err => {
      if (err) return console.log("something went wrong loading", err)
    })
  }

  renderRadioButtons = () => (
    <div
      style={{
        textAlign: "center",
        margin: "auto",
        width: "50%",
        marginBottom: "5px",
      }}>
      <input
        checked={this.state.language === "en"}
        name="language"
        onChange={e => this.onLanguageHandle(e)}
        value="en"
        type="radio"
      />
      English &nbsp;
      <input
        name="language"
        value="al"
        checked={this.state.language === "al"}
        type="radio"
        onChange={e => this.onLanguageHandle(e)}
      />
      Albanian
    </div>
  )

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB() {
    const { name, quantity, buyPrice, category } = this.state.item
    const currentIds = this.state.data.map(data => data.id)
    const id = currentIds.length
    const newRecord = {
      id,
      name,
      quantity,
      buyPrice,
      category,
    }
    axios.post("/api/articles", newRecord).then(response => {
      if (response.status === 200) {
        const newData = this.state.data
        newData.push(newRecord)
        this.setState({ data: newData })
      }
    })
  }

  // This is our main UI (dashboard) entry point
  render() {
    const { t } = this.props
    const { data } = this.state
    const { item } = this.state

    return (
      <div>
        {this.renderRadioButtons()}
        <Container>
          <Row>
            <Col xs="6">
              <div className="centeredRight">
                <Inventory initialData={data} refreshData={this.refreshData} />
              </div>
            </Col>
            <Col xs="6">
              <h3>{t("dataCorrection")}</h3>
              <div className="editDiv">
                <Input
                  type="text"
                  placeholder={t("barCode")}
                  value={this.state.id || ""}
                  onChange={this.onIdUpdate}
                />
                <Input
                  type="text"
                  placeholder={t("nameNew")}
                  value={item.name || ""}
                  onChange={e =>
                    this.setState({ item: { ...item, name: e.target.value } })
                  }
                />
                <Input
                  type="number"
                  placeholder={t("quantityNew")}
                  value={item.quantity || ""}
                  onChange={e =>
                    this.setState({
                      item: { ...item, quantity: parseFloat(e.target.value) },
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder={t("buyPriceNew")}
                  value={item.buyPrice || ""}
                  onChange={e =>
                    this.setState({
                      item: { ...item, buyPrice: parseFloat(e.target.value) },
                    })
                  }
                />
                <ButtonGroup
                  updateHandler={this.updateDB}
                  deleteHandler={this.deleteFromDB}
                  updateText={
                    this.state.editMode ? t("correct") : t("inventoryEntry")
                  }
                  deleteText={t("delete")}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

// useful info from redux state
const mapStateToProps = state => {
  const { pageData } = state
  return { pageData }
}

const mapDispatchToProps = dispatch => ({
  updatePageData: data => dispatch({ type: "UPDATE_INVENTORY", data }),
  updateTotalCount: data => dispatch({ type: "UPDATE_TOTAL_COUNT", data }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(App))
