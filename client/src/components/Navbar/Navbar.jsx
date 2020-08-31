import React from 'react';

const Navbar = props => {

  return (
    <nav className='navbar'>
      {props.navElements}
    </nav>
  );
}

export default Navbar;