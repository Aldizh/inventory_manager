import React, { useState } from "react"
import { withTranslation } from "react-i18next"
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse, Button } from 'reactstrap';
import useBeforeFirstRender from "../hooks/useBeforeFirstRender"
import "./styles.css"

const NavBar = ({ t, i18n, handleLogout, isLoggedIn }) => {

  const [isOpen, setIsOpen] = useState(true)

  const toggleNavbar = () => setIsOpen(!isOpen)

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
        {isLoggedIn() && <Button
          secondary="true"
          size="sm"
          block={false}
          onClick={(e) => handleLogout(e)}
          className="navButton"
        >Logout
        </Button>}
      </div>
    </Navbar>
  )
}

export default withTranslation()(NavBar)
