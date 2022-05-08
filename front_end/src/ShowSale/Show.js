import React, { Component } from "react"
import axios from "axios"
import { withTranslation } from "react-i18next"

import Form from "../Components/Form"

class Create extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      sale: {},
      editMode: true,
    }
  }

  // This is to ensure we get current sales data
  async componentDidMount() {
    const id = this.props.location.pathname.split("/")[2]

    const { data } = await axios
      .get(`/api/sales/${id}`)
      .catch((err) => console.log("err", err))

    this.setState({ sale: data.data })
  }

  // edit mode toggle
  toggleEdit() {
    this.setState({ editMode: !this.state.editMode })
  }

  updateRecord(updated) {
    axios
      .put(`/api/sales/${updated.id}`, updated)
      .then((response) => {
        if (response.status === 200) {
          console.log("successfully updated")
        }
      })
      .catch((err) => console.log("error", err))
  }

  onSubmit(updated) {
    this.updateRecord(updated)
    const parentLocation =
      this.state.sale.category === "big" ? "/shumice" : "/pakice"

    // go back to parent page and reload to refelect the update
    window.location.reload()
    window.location = parentLocation
  }

  render() {
    const { t } = this.props
    return this.state.sale.name ? (
      <Form
        t={t}
        onSubmit={this.onSubmit}
        showEdit={true}
        editMode={this.state.editMode}
        toggleEdit={this.toggleEdit}
        sale={this.state.sale}
      />
    ) : (
      <div>Loading...</div>
    )
  }
}

export default withTranslation()(Create)
