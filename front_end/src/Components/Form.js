import React, { Component } from "react"
import { Form, Label, FormGroup, Input, Button } from "reactstrap"

class NewSale extends Component {
  constructor(props) {
    super(props)

    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeBuyPrice = this.onChangeBuyPrice.bind(this)
    this.onChangeQuantity = this.onChangeQuantity.bind(this)
    this.onChangeSellPrice = this.onChangeSellPrice.bind(this)
    this.submitHandler = this.submitHandler.bind(this)

    const {
      _id = "",
      name = "",
      quantity = "",
      buyPrice = "",
      sellPrice = "",
      category = "",
    } = this.props.sale

    this.state = {
      id: _id,
      name,
      quantity,
      buyPrice,
      sellPrice,
      category,
    }
  }

  onChangeName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeBuyPrice(e) {
    this.setState({ buyPrice: parseFloat(e.target.value) })
  }

  onChangeSellPrice(e) {
    this.setState({ sellPrice: parseFloat(e.target.value) })
  }

  onChangeQuantity(e) {
    this.setState({ quantity: parseFloat(e.target.value) })
  }

  submitHandler(e) {
    e.stopPropagation()
    e.preventDefault()

    const { onSubmit } = this.props
    const { id, name, quantity, buyPrice, sellPrice, category } = this.state

    let updated = {
      name,
      quantity,
      buyPrice,
      sellPrice,
      category,
    }

    if (id) updated.id = id

    onSubmit(updated)
  }

  render() {
    const { t, editMode } = this.props
    const { name, quantity, buyPrice, sellPrice, category } = this.state

    return (
      <div className="createFormContainer">
        <Form onSubmit={this.submitHandler}>
          <FormGroup>
            <Label for="categorySelect">
              {t("category")}
            </Label>
            <Input
              type="select"
              id="categorySelect"
              name="category"
              placeholder="Select category"
              value={category}
              onChange={(e) => this.setState({ category: e.target.value })}
            >
              <option value="big">{t("big")}</option>
              <option value="small">{t("small")}</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="name">
              {t("item")}
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Kiwis"
              value={name}
              onChange={this.onChangeName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="quantity">
              {t("quantity")}
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="10"
              value={quantity}
              onChange={this.onChangeQuantity}
            />
          </FormGroup>
          <FormGroup>
            <Label for="buy_price">
              {t("buyPrice")}
            </Label>
            <Input
              id="buy_price"
              type="number"
              step="0.1"
              placeholder="$0.4"
              value={buyPrice}
              onChange={this.onChangeBuyPrice}
            />
          </FormGroup>
          <FormGroup>
            <Label for="sell_price">
              {t("sellPrice")}
            </Label>
            <Input
              id="sell_price"
              type="number"
              step="0.1"
              placeholder="$0.6"
              value={sellPrice}
              onChange={this.onChangeSellPrice}
            />
          </FormGroup>
          <Button
            className="formBtn"
            color="success"
          >{editMode ? t("updateSale") : t("newSale")}</Button>
        </Form>
      </div>
    )
  }
}

export default NewSale
