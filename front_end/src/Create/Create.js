import React, { Component } from 'react'
import axios from "axios"
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

export default class CreateItem extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeBuyPrice = this.onChangeBuyPrice.bind(this)
    this.onChangeSellPrice = this.onChangeSellPrice.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      data: [],
      name: '',
      buyPrice: '',
      sellPrice: '',
      category: '',
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


  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB(name, buyPrice, sellPrice, category) {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    const newRecord = {
      id: idToBeAdded,
      name: name,
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

    const { name, buyPrice, sellPrice, category } = this.state
    this.putDataToDB(name, buyPrice, sellPrice, category)

    // go back to home after insertion
    window.location = '/'
  }

  render() {
    return (
      <div class="inputDivForm">
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Dropdown
              isOpen={this.state.dropdownOpen}
              toggle={() => this.setState({dropdownOpen: !this.state.dropdownOpen})}
            >
              <DropdownToggle caret>
                {this.state.category}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.setState({category: 'shumice'})}>Shumice</DropdownItem>
                <DropdownItem onClick={() => this.setState({category: 'pakice'})}>Pakice</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label for="name">Emri i artikullit</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Oriz"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="buy_price">Cmimi i blerjes</Label>
            <Input
              id="buy_price"
              type="number"
              name="buy_price"
              placeholder="120.5"
              value={this.state.buyPrice}
              onChange={this.onChangeBuyPrice}
            />
          </FormGroup>
          <FormGroup>
            <Label for="sell_price">Cmimi i shitjes</Label>
            <Input
              id="sell_price"
              type="number"
              name="sell_price"
              placeholder="122"
              value={this.state.sellPrice}
              onChange={this.onChangeSellPrice}
            />
          </FormGroup>
          <Input type="submit" value="Krijo shitje te re" className="btn btn-primary"/>
        </Form>
      </div>
    )
  }
}