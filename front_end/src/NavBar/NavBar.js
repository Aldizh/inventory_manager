import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import useBeforeFirstRender from '../hooks/useBeforeFirstRender';
import './styles.css';

const NavBar = ({ t, i18n }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useBeforeFirstRender(() => {
    const lang = localStorage.getItem('language');
    if (lang && lang.length) {
      i18n.changeLanguage(lang);
    }
  });

  return (
    <nav className="navbar navbar-dark bg-dark">
      <NavbarBrand href="/">{t('title')}</NavbarBrand>
      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink href="/dashboard">{t('home')}</NavLink>
          </NavItem>
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
      </Collapse>
    </nav>
  );
};

export default withTranslation()(NavBar);
