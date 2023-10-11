import React, { useState, useEffect } from "react"
import axios from "axios"

import { withTranslation } from "react-i18next"
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse, Button } from 'reactstrap'
import useBeforeFirstRender from "../hooks/useBeforeFirstRender"
import "./styles.css"

const NavBar = ({ t, i18n, handleLogout, isLoggedIn, loginWithGoogle, history }) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleNavbar = () => setIsOpen(!isOpen)

  useEffect(() => {
    // check for google authentication here
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')

    if (!isLoggedIn() && code) {
      console.log('got code...', code)
      axios.get(`/api/auth_callback?code=${code}`).then(res => {
        const token = res.data?.data?.id_token
        console.log('git backend res...',  res.data)
        if (token) loginWithGoogle(token).then(() => {
          history.replace("/dashboard")
          // TO DO: Consider alternative to this reload
          window.location.reload()
        })
      })
    }
  }, [])

  useBeforeFirstRender(() => {
    const lang = localStorage.getItem("language")
    if (lang && lang.length) {
      i18n.changeLanguage(lang)
    }
  })

  return (
    <Navbar color="light" light expand="md">
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" fill pills navbar>
          <NavItem>
            <NavLink href="/dashboard">{t("home")}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/create">{t("dataEntry")}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/pakice">{t("small")}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/shumice">{t("big")}</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      <div>
        {isLoggedIn() ? <Button
          secondary="true"
          size="sm"
          block={false}
          onClick={(e) => handleLogout(e)}
          className="navButton"
        >Logout
        </Button> : <div />
        }
      </div>
    </Navbar>
  )
}

export default withTranslation()(NavBar)
