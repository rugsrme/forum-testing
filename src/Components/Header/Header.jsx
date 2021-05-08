import React from 'react';

const Header = (props) => {
    return ( 
    <div className="nav fixed-top">
     <ul className="nav justify-content-center">
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="/">Active</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/">Link</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/">Link</a>
  </li>
  <li className="nav-item">
    <a className="nav-link disabled" href="/" tabIndex="-1" aria-disabled="true">Disabled</a>
  </li>
</ul>
</div>
           )
};

export default Header;
