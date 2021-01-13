import React, { Component } from 'react'
import axios from "axios"
import { withTranslation } from 'react-i18next';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

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
      category: 'big',
      dropdownOpen: false
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
      <div class="inputDivForm">
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Dropdown
              isOpen={this.state.dropdownOpen}
              toggle={() => this.setState({dropdownOpen: !this.state.dropdownOpen})}
            >
              <DropdownToggle caret>
                {t(this.state.category)}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.setState({category: 'big'})}>{t('big')}</DropdownItem>
                <DropdownItem onClick={() => this.setState({category: 'small'})}>{t('small')}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label for="name">{t('item')}</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder=""
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="quantity">{t('quantity')}</Label>
            <Input
              id="quantity"
              type="number"
              name="quantity"
              placeholder=""
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
            />
          </FormGroup>
          <FormGroup>
            <Label for="buy_price">{t('buyPrice')}</Label>
            <Input
              id="buy_price"
              type="number"
              name="buy_price"
              placeholder=""
              value={this.state.buyPrice}
              onChange={this.onChangeBuyPrice}
            />
          </FormGroup>
          <FormGroup>
            <Label for="sell_price">{t('sellPrice')}</Label>
            <Input
              id="sell_price"
              type="number"
              name="sell_price"
              placeholder=""
              value={this.state.sellPrice}
              onChange={this.onChangeSellPrice}
            />
          </FormGroup>
          <Input type="submit" value={this.props.t('newSale')} className="btn btn-primary"/>
        </Form>
      </div>
    )
  }
}

export default withTranslation()(Create)
