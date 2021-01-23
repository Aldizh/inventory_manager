import React, { Component } from 'react'
import axios from 'axios'
import { withTranslation } from 'react-i18next'
import './styles.css'

class Create extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeBuyPrice = this.onChangeBuyPrice.bind(this)
    this.onChangeQuantity = this.onChangeQuantity.bind(this)
    this.onChangeSellPrice = this.onChangeSellPrice.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      data: [],
      name: '',
      quantity: '',
      buyPrice: '',
      sellPrice: '',
      category: 'big'
    }
  }

  // fetch data from our data base so that we can properly append
  // TO DO: See if we can refactor later
  componentDidMount() {
    fetch("/api/datas")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }))
  }

  onChangeName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeBuyPrice(e) {
    this.setState({ buyPrice: parseFloat(e.target.value)})
  }

  onChangeSellPrice(e) {
    this.setState({ sellPrice: parseFloat(e.target.value)})
  }

  onChangeQuantity(e) {
    this.setState({ quantity: parseFloat(e.target.value)})
  }


  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB(name, quantity, buyPrice, sellPrice, category) {
    let currentIds = this.state.data.map(data => data.id);
    const id = currentIds.length
    const newRecord = {
      id: id,
      name: name,
      quantity: quantity,
      buyPrice: buyPrice,
      sellPrice: sellPrice,
      category: category,
    };
    axios.post("/api/datas", newRecord).then(response => {
      if (response.status === 200) {
        const newData = this.state.data;
        newData.push(newRecord);
        this.setState({ data: newData });
      }
    });
  }


  onSubmit(e) {
    e.preventDefault()

    const { name, quantity, buyPrice, sellPrice, category } = this.state
    this.putDataToDB(name, quantity, buyPrice, sellPrice, category)

    // go back to home after insertion
    window.location = '/'
  }

  render() {
    const { t } = this.props
    return (
      <div className="createFormContainer">
        <form className='add-form' onSubmit={this.onSubmit}>
          <div className='form-control'>
            <label>{t('category')}</label>
            <select name="cars" id="categorySelect" onChange={(e) => this.setState({ category: e.target.value })}>
              <option value="big">{t('big')}</option>
              <option value="small">{t('small')}</option>
            </select>
          </div>
         <div className='form-control'>
           <label>{t('item')}</label>
           <input
             id="name"
             type="text"
             name="name"
             placeholder=""
             value={this.state.name}
             onChange={this.onChangeName}
           />
         </div>
         <div className='form-control'>
           <label>{t('quantity')}</label>
           <input
             id="quantity"
             type="number"
             name="quantity"
             placeholder=""
             value={this.state.quantity}
             onChange={this.onChangeQuantity}
           />
         </div>
         <div className='form-control'>
           <label>{t('buyPrice')}</label>
           <input
             id="buy_price"
             type="number"
             name="buy_price"
             placeholder=""
             value={this.state.buyPrice}
             onChange={this.onChangeBuyPrice}
           />
         </div>
         <div className='form-control'>
           <label>{t('sellPrice')}</label>
           <input
             id="sell_price"
             type="number"
             name="sell_price"
             placeholder=""
             value={this.state.sellPrice}
             onChange={this.onChangeSellPrice}
           />
         </div>
         <input type="submit" value={this.props.t('newSale')} className="btn btn-block"/>
       </form>
      </div>
    )
  }
}

export default withTranslation()(Create)
