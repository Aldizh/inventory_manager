import React from "react"
import { withTranslation } from "react-i18next"
import useBeforeFirstRender from "../hooks/useBeforeFirstRender"
import "./styles.css"

const NavBar = ({ t, i18n }) => {
  useBeforeFirstRender(() => {
    const lang = localStorage.getItem("language")
    if (lang && lang.length) {
      i18n.changeLanguage(lang)
    }
  })

  return (
    <ul>
      <li>
        <a href="/create">{t("dataEntry")}</a>
      </li>
      <li>
        <a href="/pakice">{t("small")}</a>
      </li>
      <li>
        <a href="/shumice">{t("big")}</a>
      </li>
      <li style={{ float: "right" }}>
        <a href="/">{t("home")}</a>
      </li>
    </ul>
  )
}

export default withTranslation()(NavBar)
