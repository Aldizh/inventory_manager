import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const NavBar = ({t}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">{t('title')}</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/create">{t('dataEntry')}</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {t('sales')}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink href="/pakice">{t('small')}</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/shumice">{t('big')}</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText>
          <NavLink href="/dashboard">{t('home')}</NavLink>
        </NavbarText>
      </Collapse>
    </Navbar>
  );
}

export default withTranslation()(NavBar);