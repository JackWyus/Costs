import React from 'react';

import { Link } from 'react-router-dom'
import Container from './Container';
import { Nav } from './Navbar';

import Logo from '../../img/costs_logo.png'

function Navbar() {
  return (
    <Nav>
      <Container>
          <Link to="/Costs">
            <img src={Logo} alt='CostsLogo' />
          </Link>
          <ul className="list">
            <li className="item"><Link to="/" > Home </Link></li>
            <li className="item"><Link to="/projects" > Projetos </Link></li>            
            <li className="item"><Link to="/company" > Empresa </Link></li>
            <li className="item"><Link to="/contact" > Contato </Link></li>
          </ul>
      </Container>
    </Nav>
  )
};

export default Navbar;