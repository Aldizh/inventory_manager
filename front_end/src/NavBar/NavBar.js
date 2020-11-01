import React, { useState } from 'react';
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

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Market Zhupani</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/create">Hedhje te dhenash</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Shitjet
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink href="/pakice">Pakice</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/shumice">Shumice</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText>
          <NavLink href="/dashboard">Kreu</NavLink>
        </NavbarText>
      </Collapse>
    </Navbar>
  );
}

export default Example;