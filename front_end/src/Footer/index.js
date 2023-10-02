import React from "react"
import { withTranslation } from "react-i18next"
import { CardFooter } from "reactstrap"
import "./styles.css"

const Footer = (props) => (
  <CardFooter className="footer">
    &copy;
    {new Date().getFullYear()} {props.t("title")}. All Rights Reserved.
  </CardFooter>
)

export default withTranslation()(Footer)
