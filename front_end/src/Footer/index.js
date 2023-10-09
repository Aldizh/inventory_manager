import React from "react"
import { withTranslation } from "react-i18next"
import { CardFooter, CardText } from "reactstrap"
import "./styles.scss"

const Footer = (props) => (
  <CardFooter className="footer">
    <CardText>&copy; {new Date().getFullYear()} {props.t("title")}.</CardText>
    <CardText>All Rights Reserved.</CardText>
  </CardFooter>
)

export default withTranslation()(Footer)
