import React from 'react';
import s from './Navbar.module.css';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import NavLinkContainer from './NavLinkContainer';

function getNavElements(state) {

  let currentLang = state.navigation.currentLang;
  let navElements = state.navigation.navBar.map((nav, idx) => {
    let ex;
    nav.link === "/" ? ex = true : ex = false;
    return (
      <div className={s.item} key={idx}>
        <NavLinkContainer
          exact={ex}
          to={nav.link}
          activeClassName={s.active}>
          {nav.title[currentLang]}
        </NavLinkContainer>
      </div>
    );
  });
  return navElements;
}

const mapState = state => {
  return {
    navElements: getNavElements(state)
  }
}

const NavbarContainer = connect(mapState)(Navbar);

export default NavbarContainer;