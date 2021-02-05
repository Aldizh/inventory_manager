import React, { Component } from 'react'
import axios from 'axios'
import { withTranslation } from 'react-i18next'

import Form from '../Components/Form'

class Create extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      sale: {},
      editMode: true
    }
  }


  // This is to ensure we get current sales data
  async componentDidMount() {
    const saleId = this.props.location.pathname.split('/')[2]

    const { data } = await axios.get(`/api/sales/${saleId}`).catch(err => console.log('err', err))
    this.setState({ sale: data.data[0]})
  }

  // edit mode toggle
  toggleEdit(){
    this.setState({ editMode: !this.state.editMode })
  }

  updateRecord(updated) {
    axios.put(`/api/sales/${updated.saleId}`, updated).then((response) => {
      if (response.status === 200) {
        console.log('successfully updated')
      }
    }).catch(err => console.log('error', err))
  }

  onSubmit(updated) {
    this.updateRecord(updated);

    console.log(this.state.sale.category )

    const parentLocation = this.state.sale.category === 'big' ? '/shumice' : '/pakice'
    console.log('parent', parentLocation)

    // go back to home after update
    window.location = parentLocation
  }

  render() {
    const { t } =  this.props;
    return this.state.sale.name ? (
      <Form
        t={t}
        onSubmit={this.onSubmit}
        showEdit={true}
        editMode={this.state.editMode}
        toggleEdit={this.toggleEdit}
        sale={this.state.sale}
      /> ) : <div>Loading...</div>
  }
}

export default withTranslation()(Create);
