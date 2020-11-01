import React, { Component } from 'react'
import axios from "axios"
import Shitjet from "../Components/Shitjet"

export default class CreateItem extends Component {
  constructor(props) {
    super(props);


    this.state = {
      data: [],
      name: '',
      buyPrice: '',
      sellPrice: ''
    }
  }


  componentDidMount() {
    // fetch data from our data base
    axios.get("/api/datas")
      .then(res => {
        const filtered = res.data.data.filter((sale) => sale.category === 'shumice')
        this.setState({ data: filtered })
      })
 }

  render() {
    return (
      <div>
        <h3 id="shitjetShumice">Shitjet (Shumice)</h3>
        <Shitjet data={this.state.data} />
      </div>
    )
  }
}