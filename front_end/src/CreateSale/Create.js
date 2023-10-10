import React, { useState, useEffect } from "react"
import { Redirect } from "react-router"
import axios from "axios"
import { withTranslation } from "react-i18next"

import { isLoggedIn  } from "../Realm"
import Form from "../Components/Form"
import "./styles.scss"

const Create = (props) => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("/api/sales")
      .then((data) => data.json())
      .then((res) => setData(res.data))
  }, [])

  // our put method that uses our backend api
  // to create new query into our data base
  const putDataToDB = (newRecord) => {
    axios
      .post("/api/sales", newRecord)
      .then((response) => {
        if (response.status === 200) {
          const newData = data
          newData.push(newRecord)
          this.setState({ data: newData })
        }
      })
      .catch((err) => console.log("error", err))
  }

  const onSubmit = async (updated) => {
    putDataToDB(updated)

    // go back to home after insertion
    // TO DO: Show success notification then redirect
    window.location = "/"
  }

  if (!isLoggedIn()) {
    return <Redirect to='/login'/>
  }

  return (
    <Form
      t={props.t}
      onSubmit={onSubmit}
      showEdit={false}
      sale={{}}
    />
  )
}

export default withTranslation()(Create)
