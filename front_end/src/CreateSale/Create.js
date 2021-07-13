import React, { Component } from 'react'
import axios from 'axios'
import { withTranslation } from 'react-i18next'

import Form from '../Components/Form'
import './styles.scss'

class Create extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = { data: [] }
  }


  // This is to ensure we get current sales data
  componentDidMount() {
    fetch('/api/sales')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }))
  }

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB(name, quantity, buyPrice, sellPrice, category) {
    const currentIds = this.state.data.map((data) => data.id)
    const saleId = currentIds.length
    const newRecord = {
      saleId,
      name,
      quantity,
      buyPrice,
      sellPrice,
      category,
    }
    axios.post('/api/sales', newRecord).then((response) => {
      if (response.status === 200) {
        const newData = this.state.data
        newData.push(newRecord)
        this.setState({ data: newData })
      }
    }).catch(err => console.log('error', err))
  }

  onSubmit(updated) {
    this.putDataToDB(updated)

    // go back to home after insertion
    window.location = '/'
  }

  render() {
    const { t } = this.props
    return (
      <Form
        t={t}
        onSubmit={this.onSubmit}
        showEdit={false}
        sale={{
          name: '',
          quantity: '',
          buyPrice:'',
          sellPrice: '',
          category:'big'
        }}
      />
    )
  }
}

export default withTranslation()(Create)
